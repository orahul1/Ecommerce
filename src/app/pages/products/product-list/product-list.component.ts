import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { APIService } from '../../../service/api.service';
import { SharedService } from '../../../service/shared.service';
import { AppConfig } from '../../../settings/app.config';

import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component';
import { UpperCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
  pic: string;
  nopic: string;
  option: string;
  isLoading: Boolean = true;
  imgURL: string;
  errorData: any;
  productObsv: Subscription;
  selectedSubcat: string;
  subCat = '';

  @Output() productDetailsEvent = new EventEmitter<any>();

  titleCaseWord(word: string) {
    if (!word) {
      return word;
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }

  constructor(
    private titleService: Title,
    private apiService: APIService,
    private sharedService: SharedService,
    private appConfig: AppConfig,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(this.titleCaseWord(event['snapshot'].params['cat']) + ' ' + event['snapshot'].data['title']);
      });
      this.imgURL = appConfig.protocol + appConfig.pageEndpoint + appConfig.IMAGE_PATH;
  }

  ngOnInit() {
    this.errorMsg();
    this.getProductLists(this.subCat);
    this.option = 'Newest First';
    this.sortbyMessage(this.option);
  }

  getProductLists(subCat: string): void {
    try {
        this.route.params.subscribe(params => {
          const cat = params['cat'];
          console.log(cat);
          this.productObsv = this.apiService.getProducts(cat).
            subscribe(
              data => {
                this.products = [];
                console.log(data.products);
                data.products.forEach(element => {
                  this.products.push(element);
                });
                /* Make a clone of products array in filteredProducts array */
                this.filteredProducts = this.products;

                /* Check if subcategory is all then all products will be listed otherwise filter by subcategory */
                if (subCat === 'all') {
                  this.filteredProducts = this.products;
                } else {
                  this.filterBySubcat(this.selectedSubcat);
                }

                if (this.products.length === 0) {
                  this.nopic = 'empty_product.svg';
                }
                this.isLoading = false;
                console.log('products => ', this.filteredProducts);
              },
              err => {
                this.errorData = this.sharedService.getErrorKeys(err.statusText);
                this.isLoading = false;
                console.log('errorData => ', this.errorData);
              }
            );
        });
      } catch (error) {
        console.log(error);
      }
  }

  errorMsg() {
    this.apiService.getErrorMessage().then(
      (res) => {
        if (this.sharedService.errorObj.length === 0) {
          this.sharedService.errorObj = res['srverrors'][0]['errorslist'];
          console.log('erroJson => ', this.sharedService.errorObj);
        }
      }, (error) => {
      });
  }

  checkPath(imgsrc): string {
    if (imgsrc === undefined || imgsrc === '') {
      this.pic = 'empty_product.svg';
    } else {
      this.pic = imgsrc;
    }
    return this.pic;
  }

  productDetails(id): void {
    this.router.navigate(['product/details/' + id]);
  }

  sortbyMessage(event): void {
    this.option = event;
    const SortBy = (x, y) => {
      if (this.option === 'Price -- Low to High') {
        return ((x.Price === y.Price) ? 0 : ((x.Price > y.Price[this.option]) ? 1 : -1));
      } else if (this.option === 'Price -- High to Low') {
        return ((x.Price === y.Price) ? 0 : ((x.Price > y.Price) ? -1 : 1));
      } else if (this.option === 'Newest First') {
        return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
      } else {
        return ((x.DateOfEntry === y.DateOfEntry) ? 0 : ((x.DateOfEntry > y.DateOfEntry) ? 1 : -1));
      }
    };
    this.filteredProducts.sort(SortBy);
  }

  changePrice(evt) {
    console.log('Price Change', evt);
  }

  checkSubcat(evt) {
    console.log(evt);
    this.selectedSubcat = evt;
    this.getProductLists(this.selectedSubcat);
  }

  filterBySubcat(subcat) {
    console.log('Choose Subcat => ', subcat);
    if (subcat !== undefined) {
      const productsByCat = this.filteredProducts.filter((elemt) => elemt.SubCategory === subcat);
      this.filteredProducts = productsByCat;
      console.log(this.filteredProducts);
    }
  }

  ngOnDestroy() {
    this.productObsv.unsubscribe();
  }

}

import {
  Component, OnInit, OnChanges, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy,
  AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2, ViewEncapsulation, Input
} from '@angular/core';
import { APIService } from '../../../service/api.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  userName: string;
  content: {};
  lenMenu: number;

  @Input() custStatus;
  @Input() custName;
  @ViewChildren('menuitem') private menuitems: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private productsData: APIService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.siteContent();
  }

  ngOnChanges() {
    console.log('On changes', this.custStatus, this.custName);
    this.siteContent();
  }

  ngAfterViewInit() {

  }

  async siteContent() {
    try {
      // "await" will wait for the promise to resolve or reject
      // if it rejects, an error will be thrown, which you can
      // catch with a regular try/catch block
      await this.productsData.getContent().
        then(
          (res) => {
            console.log(this.custStatus);
            if (this.custStatus === false) {
              const pageHeader = 'logout';
              this.content = res['content'][0]['sitePage'].filter((elemt) => elemt.pageHeader !== pageHeader);
            } else {
              const pageHeader = 'login';
              this.content = res['content'][0]['sitePage'].filter((elemt) => elemt.pageHeader !== pageHeader);
              this.checkIndexLogout();
            }
            console.log('Header Menu => ', this.content);
            this.cdr.markForCheck();
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  /*
    check the index of logout menu
  */
  checkIndexLogout() {
    for (const k in this.content) {
      if (this.content.hasOwnProperty(k)) {
        // console.log(this.content[k]);
        if (this.content[k].pageHeader === 'logout') {
          this.menuitems.changes.subscribe(() => {
            this.modifyLogoutLink(k, this.content[k]);
          });
        }
      }
    }
  }


  modifyLogoutLink(i, ct) {
    const link = this.menuitems.toArray()[i].nativeElement;
    console.log(ct);
    // this.renderer.setAttribute(link, 'href', 'javascript:void(0)');
    // this.renderer.removeAttribute(link, 'ng-reflect-router-link');
    this.renderer.setProperty(link, 'innerHTML', '<a href="javascript:void(0)" class="nav-link">' + ct.pageName  + '</a>');
    this.renderer.listen(link, 'click', () => {
      this.custLogout();
    });
  }

  custLogout() {
    this.authService.logout();
  }


}

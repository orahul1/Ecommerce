import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ElementRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ILogin } from '../../modules/login';
import { AuthService } from '../../auth/auth.service';
import { APIService } from '../../service/api.service';
import { SharedService } from '../../service/shared.service';
import { MessageService } from '../../service/message.service';
import { ValidationMessageService } from '../../service/validation-msg.service';
import { pipe, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit, OnDestroy {
  user: {};
  isLoading: Boolean = true;
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted = false;
  errorData: any;
  token: string;
  custEmail: string;
  custName: string;
  authLoggedInStatus: Subscription;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private apiService: APIService,
    private sharedService: SharedService,
    private msgService: MessageService,
    private validErrorMsgService: ValidationMessageService,
    private el: ElementRef
  ) {
      this.router.events.pipe(
        filter(event => event instanceof ActivationEnd)
      ).subscribe(event => {
        this.titleService.setTitle(event['snapshot'].data['title']);
      });
  }

  ngOnInit() {
    this.validationErrorMsg();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  verifyLogin() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    } else {
      console.log('Login details => ', this.loginForm.value);
      this.login({value: this.loginForm.value, valid: true});
    }
  }

  login({ value, valid }: { value: ILogin, valid: boolean }) {
    this.submitted = true;
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    console.log(invalidElements, invalidElements.length);
    if (invalidElements.length > 0) {
      console.log(invalidElements[0]);
      invalidElements[0].focus();
    } else {
        this.authService.loginCustomer(this.loginForm.get('emailId').value, this.loginForm.get('password').value)
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              const token = data.token;
              this.token = token;
              if (token) {
                const expiresInDuration = data.expiresIn;
                this.custEmail = data.email;
                this.custName = data.custname;
                this.authService.isAuthenticated = true;
                const now = new Date();
                const expirationDate = new Date(
                  now.getTime() + expiresInDuration * 1000
                );
                this.authService.saveAuthData(token, expirationDate, this.custEmail, this.custName);
                this.router.navigate(['/home']);
              }
            },
            error => {
              this.msgService.error(error.error.message, true);
            });
    }
  }

/*
*** Get API response as validation error json and load response in validationErrorObj of validErrorMsgService
*/
validationErrorMsg() {
  this.apiService.getValidationErrorMessage().then(
    (res) => {
      if (this.validErrorMsgService.validationErrorObj.length === 0) {
        this.validErrorMsgService.validationErrorObj = res['vlderrors'][0]['validationErrors'];
        console.log('Validation Error => ', this.validErrorMsgService.validationErrorObj);
        this.isLoading = false;
      }
    }, (error) => {
      this.errorData = this.sharedService.getErrorKeys(error.statusText);
      this.isLoading = false;
    });
}

ngOnDestroy() {

}


}

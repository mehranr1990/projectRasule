import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormErrorHandlerDirective } from '../../../core/directives/form-error-handler.directive';
import { SelectAllInputFocusInDirective } from 'src/app/core/directives/select-all-input-focus-in.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormCreatorComponent } from '../../../components/shared/form-creator/form-creator.component';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: '#app-login',
  standalone: true,
  imports: [
    FormCreatorComponent,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    SelectAllInputFocusInDirective,
    ReactiveFormsModule,
    FormErrorHandlerDirective,
    NgxMaskDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  btnLoadin: boolean = false;
  constructor(
    private readonly _servAuth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  // -------------------------------------------
  // --------------- Create Form ---------------
  // -------------------------------------------
  loginForm: FormGroup = new FormGroup({
    mobile: new FormControl(null, [
      Validators.minLength(5),
      Validators.required,
    ]),
    password: new FormControl(null, Validators.required),
  });

  // -------------------------------------------
  // --------------- Submit Form ---------------
  // -------------------------------------------
  async submitLogin() {
    if (this.loginForm.valid) {
      this.btnLoadin = true
      this._servAuth.login(this.loginForm.value['mobile'], this.loginForm.value['password']).subscribe({
        next: (resp) => {
          console.log(resp)
          this.router.navigate(['/dashboard']);
          // this.toastIt.success('درخواست احراز با موفقیت ثبت شد.');
          this.btnLoadin = true
        },
        error: (err) => {
          console.log(err);
          
          this.btnLoadin = true
        },
      });
    }
  }
}

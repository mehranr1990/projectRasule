import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastIt: ToastService = inject(ToastService);
  const authService = inject(AuthService);
  const router = inject(Router);


  return next(req)
    .pipe(
      catchError(err => {

        if ((err.status === 403 || err.status === 401) && !req.url.includes("auth")) {
          // auto logout if 401 response returned from api
          // this.toastIt.error(err.error.error, 'خطا');
          authService.logout();
          // router.navigate(['/auth']);
          // window.location.href = '/auth';

        } else if (!req.url.includes("user")) {
          // err.error.status === 500 ? window.location.href = "/error" : null;

          switch (err.status) {
            case 500:
              // window.location.href = "/error"
              toastIt.error(err.error.name, err.error.message);
              break;
            case 400:
              toastIt.warning(err.error.error, err.error.message);
              break;
            default:
              break;
          }

        }
        const error = err.error.error || err.statusText;
        return throwError(err);
      })
    );
};

import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserStore} from "../stores/user.store";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore: UserStore = inject(UserStore);
 
  if (userStore.info) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userStore.info.token}`
      }
    });
  }
  return next(req);
};

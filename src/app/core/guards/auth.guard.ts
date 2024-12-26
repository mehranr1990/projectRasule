import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserStore} from "../stores/user.store";

export const authGuard: CanActivateFn = async () => {
  const userStore = inject(UserStore);
  return userStore.isAuthenticated;
};

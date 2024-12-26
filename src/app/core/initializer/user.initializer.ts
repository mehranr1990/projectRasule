import {AuthService} from "../services/auth.service";
import {UserStore} from "../stores/user.store";
import {lastValueFrom} from "rxjs";

export const initializeUser = (authService: AuthService, userStore: UserStore) => {
  let username:string = 'mehran'
  return async () => {
    if (localStorage.getItem('accessToken')) {
      let userToken;
      try {
        userToken = JSON.parse(localStorage.getItem('accessToken')!)
      }catch (e) {
        console.error(e);
      }
      if (userToken) {
        const userProfile = await lastValueFrom(authService.claimUserProfile(userToken,username));
        if (userProfile) {
          userStore.info = userProfile;
        }
      }else{
        userStore.removeUser();
      }
    }
  }
}

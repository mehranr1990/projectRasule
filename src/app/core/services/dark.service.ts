import { effect, HostBinding, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkService {

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
      if(this.darkMode()){
        document.getElementsByTagName("html")[0].setAttribute('data-mode', 'dark')
      } else{
        document.getElementsByTagName("html")[0].setAttribute('data-mode', 'light')

        // document.getElementsByTagName("html")[0].removeAttribute('data-mode')
      }
    });
  }

}

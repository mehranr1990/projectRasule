import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { sidebarMenu } from '../../../core/data/sidebar-menu.data';
import { UserStore } from "../../../../core/stores/user.store";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DarkService } from 'src/app/core/services/dark.service';

@Component({
  selector: '#app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    AvatarModule,
    SidebarModule,
    SidebarComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {

  items: MenuItem[] = [];
  @Input() lgTopBar: boolean;
  @Output() lgTopBarChange = new EventEmitter();
  @Input() smTopBar: boolean;
  @Output() smTopBarChange = new EventEmitter();
  countries: any[] | undefined;
  selectedCountry: any | undefined;

  private _renderer: Renderer2;
  sidebarMobileVisible: boolean = false;

  sidebarVisibleProfile: boolean = false;

  constructor(public readonly userStore: UserStore, public translate: TranslateService, rendererFactory: RendererFactory2, public readonly servDark:DarkService) {
    this._renderer = rendererFactory.createRenderer(null, null);    
  }

  ngOnInit() {
    this.translate.use('fa')
    this.items = sidebarMenu;
    this.lgTopBar = false;
    this.smTopBar = false;
    this.countries = [
      { name: 'Iran', code: 'IR' },
      { name: 'United States', code: 'US' }
    ];
  }

  changeLanguege(e) {
    if (e.value.code === 'IR') {
      this.translate.use('fa')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    } else if (e.value.code === 'US') {
      this.translate.use('en')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');

    }
  }


  sidebarDesktop(el) {

    let element : HTMLElement = (<HTMLElement>el.target)
    let sidebar: HTMLElement = document.getElementById("app-sidebar") as HTMLElement;
    let menuWrapper: HTMLElement = document.getElementById("wrapper") as HTMLElement;

    if (sidebar.classList.contains('sidebar-min')) {
      this._renderer.removeClass(sidebar, 'sidebar-min')
      this._renderer.setStyle(sidebar, 'width', '5rem')
      this._renderer.setStyle(sidebar, 'transition', 'all 0.2s ease-out')

      this._renderer.setStyle(menuWrapper, 'margin-right', '5rem')

      this._renderer.setStyle(element,'transition', '.2s')
      this._renderer.setStyle(element,'transform', 'rotateY(180deg)')
      this._renderer.setStyle(element,'transition-timing-function', 'ease-in-out')

    } else {
      this._renderer.addClass(sidebar, 'sidebar-min')
      this._renderer.setStyle(sidebar, 'width', '20rem')
      this._renderer.setStyle(sidebar, 'transition', 'all 0.2s ease-out')

      this._renderer.setStyle(menuWrapper, 'margin-right', '20rem')

      this._renderer.setStyle(element,'transition', '.2s')
      this._renderer.setStyle(element,'transform', 'rotateY(0deg)')
      this._renderer.setStyle(element,'transition-timing-function', 'ease-in')
      
    }

  }

  sidebarMobile() {
    this.sidebarMobileVisible !=this.sidebarMobileVisible
  }
}

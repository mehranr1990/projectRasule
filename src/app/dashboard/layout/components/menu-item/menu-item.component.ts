
import { ChangeDetectorRef, Component, Host, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './core/app.menu.service';
import { LayoutService } from './core/app.layout.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: '[app-menuitem]',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0',
      })),
      state('expanded', style({
        height: '*',
        overflow: 'visible',
      })),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})

export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = "";

  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, public router: Router, private menuService: MenuService, private _UserStore: UserStore) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
      Promise.resolve(null).then(() => {
        if (value.routeEvent) {
          this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
        }
        else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false;
          }
        }
      });
    });

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(params => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  ngOnInit() {
    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  updateActiveStateFromRoute() {
    let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if ((<HTMLInputElement>event.target).textContent === 'خروج') {
      this._UserStore.removeUser()
    }

    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }

    this.menuService.onMenuStateChange({ key: this.key });
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}

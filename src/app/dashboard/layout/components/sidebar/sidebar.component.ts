import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { sidebarMenu } from 'src/app/dashboard/core/data/sidebar-menu.data';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: '#app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MenuItemComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {

    items: MenuItem[] = [];

    ngOnInit() {
        this.items = sidebarMenu;
    }

}

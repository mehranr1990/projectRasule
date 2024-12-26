import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuItem} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {sidebarMenu} from "../core/data/sidebar-menu.data";
import {MenubarModule} from 'primeng/menubar';
import {SplitButtonModule} from "primeng/splitbutton";
import {ChipModule} from "primeng/chip";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {CommonModule} from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuModule,
    MenubarModule,
    SplitButtonModule,
    ChipModule,
    SidebarComponent,
    ToastModule,
    TopbarComponent, CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] = [];
  lgSidebarToggle: boolean
  smSidebarToggle: boolean

  constructor() {}

  ngOnInit() {
    this.items = sidebarMenu;
  }

}

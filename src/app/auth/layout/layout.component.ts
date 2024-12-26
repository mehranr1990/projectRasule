import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from "@angular/router";
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ToastModule } from 'primeng/toast';
import { DarkService } from 'src/app/core/services/dark.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    ToastModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnInit {

  switchLogin: boolean = false
  url: string = ""

  constructor(private router: Router,private readonly _servDark:DarkService) { }

  ngOnInit() {
    this.url = this.router.url
    if(this.url.includes('register')){
      this.switchLogin = true
    } else{
      this.switchLogin = false
    }
  }

}

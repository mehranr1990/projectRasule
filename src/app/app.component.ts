import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { SwService } from './core/services/sw.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'primeng-panel-core';

}

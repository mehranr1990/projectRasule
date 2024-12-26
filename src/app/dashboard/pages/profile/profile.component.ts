import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { UsersService } from 'src/app/core/services/users.service';
import { UpdateComponent } from './update/update.component';
import { UserStore } from 'src/app/core/stores/user.store';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ImageModule,ButtonModule,UpdateComponent,TooltipModule,CardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(private profileservise: UsersService, private userStore:UserStore) {}
  ngOnInit() {
    
    this.profileservise.get(this.userStore.info.username!).subscribe({
      next: (resp) => {
        this.profile = resp;
      },
    });
  }
  setdefaultimage(e){
    console.log(e);
    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s'
  }
}

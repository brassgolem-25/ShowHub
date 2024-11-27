import { CommonModule } from '@angular/common';
import { Component, Input, OnInit,Renderer2,Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faArrowRight ,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { RedirectService } from '../../core/redirect.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule, FontAwesomeModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  @Input() isUserLoggedIn: any;
  @Output() toggleSideNav = new EventEmitter<any> ();
  faArrowRight = faArrowRight;
  faUser = faUser;
  faCircleXmark=faCircleXmark;
  menuOptions:{"label":string,"description":string,"src":string,"disabled":boolean,"eventFunction":Function}[]=[];
  constructor(private  renderer: Renderer2 ,private redirectSer:RedirectService){
    renderer.listen('window','click',(e:any)=>{
      const sideNavElement = document.querySelector('.sidenav');
      if(!sideNavElement?.contains(e.target)){
            this.toggleSideNav.emit('close');
      }
    })
  }
  ngOnInit() {
    this.menuOptions = [
      { label: 'Notifications', description: '', src: 'assets/notification.png', disabled: false ,eventFunction:this.testFunction.bind(this)},
      { label: 'Your Orders', description: 'View all your bookings & purchases', src: 'assets/shopping-bag.png', disabled: !this.isUserLoggedIn ,eventFunction:this.testFunction.bind(this)},
      { label: 'Stream Library', description: 'Rented & Purchased Movies', src: 'assets/cast.png', disabled: !this.isUserLoggedIn  ,eventFunction:this.testFunction.bind(this)},
      { label: 'Play Credit Card', description: 'View your Play Credit Card details and offers', src: 'assets/credit-card.png' ,disabled:false,eventFunction:this.testFunction.bind(this)},
      { label: 'Account and Settings', description: 'Location,Payments,Permissions & More', src: 'assets/settings.png', disabled: !this.isUserLoggedIn ,eventFunction:this.testFunction.bind(this) },
      { label: 'Help & Support', description: 'View Commonly asked queries and chat', src: 'assets/message.png',disabled:false ,eventFunction:this.testFunction.bind(this)} // Example for reuse
    ];
    if(this.isUserLoggedIn){
      for(let index in this.menuOptions){
        if(this.menuOptions[index].disabled){
          this.menuOptions[index].disabled=false
        }
      }
    }
  }

  testFunction(label:string){
    if(label.includes('Account')){
      this.redirectSer.redirectToUserPage();
      this.toggleSideNav.emit('close');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../types/movie';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { userReview } from '../types/userReview';
import { DialogService } from '../../core/dailog.service';
import { AuthService } from '../../core/auth.service';
import { LiveEventService } from '../../core/live-events.service';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TabsComponent, RouterModule, LoadingSpinnerComponent, FontAwesomeModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent implements OnInit {
  currLocation:string='';
  mapURL:SafeResourceUrl = '';
  constructor(private router:Router,private route:ActivatedRoute,private liveEventSer:LiveEventService,private sanitizer: DomSanitizer){

  }
  loading=true;
  eventData :any

  ngOnInit() {
      this.currLocation=this.route.snapshot.params['location'];
      const eventCode = this.route.snapshot.params['eventCode'];
      console.log(eventCode)
      const data = {
        "event_code":eventCode
      }
      this.liveEventSer.getLiveEventsByEventCode(data).subscribe((event:any)=>{
        this.eventData = event
        this.mapURL=this.sanitizer.bypassSecurityTrustResourceUrl(event.google_map_link)
        console.log(event)
          this.loading=false;
      })
  }
}

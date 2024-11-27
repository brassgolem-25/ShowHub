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
import { faCheck, faL } from '@fortawesome/free-solid-svg-icons';
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
  currLocation: string = '';
  faCheck = faCheck;
  mapURL: SafeResourceUrl = '';
  eventDisclaimer = [
    "Show Hub Tickets is an online event and ticketing agency. Premier Tickets will NOT be responsible for any changes related to the event schedule, artist, venue, or cancellation and refunds related to the tickets.",
    "Event Organizer has all the rights to alter and/or modify and/or add seating arrangements based on the demand and availability of the space.",
    "In case of any misbehavior/misconduct by any person at the venue, the Event Organizer has all the rights to evict that person from the auditorium and no refund will be given.",
    "Ticket availability and prices declared/quoted are subject to change at the discretion of the event organizer without any notice."
  ]
  termsAndConditions = [
    "Ticket can be scanned over phone, but phone screen should be properly visible, else you have to bring printed ticket confirmation for scanning purposes.",
    "Tickets are non-refundable – Once confirmed, ticket sales are final. No refunds, exchanges or cancellations are available.",
    "If an event is canceled/postponed, we will refund only the face value of the ticket and NOT the booking fee. Refunds will only be initiated by the event organizer. We are not liable for any refunds.",
    "Booking fee per ticket may be levied. Please check the total amount before payment.",
    "The Event Organizer reserves the right to remove any individual from the venue due to misconduct or misbehavior, and no refunds will be provided.",
    "Organizers and their agents are not liable for any injuries, damages, thefts, losses, or costs during the event.",
    "By presenting this ticket, you authorize the organizers to utilize recordings of your appearance across all media platforms for advertising, publicity, and promotional purposes, globally and indefinitely.",
    "These terms and conditions are subject to change from time to time at the discretion of the organiser."
  ];
  isUserLoggedIn: boolean = false;
  userEmail: string = '';
  eventCode: string = '';
  isInterestedClicked: boolean = false;
  interesetedDetails:{}={

  }
  constructor(private authSer: AuthService, private router: Router, private route: ActivatedRoute, private liveEventSer: LiveEventService, private sanitizer: DomSanitizer) {

  }
  loading = true;
  eventData: any

  ngOnInit() {
    this.currLocation = this.route.snapshot.params['location'];
    this.eventCode = this.route.snapshot.params['eventCode'];
    const data = {
      "event_code": this.eventCode
    }
    this.liveEventSer.getLiveEventsByEventCode(data).subscribe((event: any) => {
      this.eventData = event;
      this.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl(event.google_map_link);
      this.loading = false;
    })
    this.authSer.checkAuthStatus().subscribe((response: { loggedIn: boolean, user: { data: string, iat: number, exp: string } }) => {
      this.isUserLoggedIn = response.loggedIn;
      this.userEmail = response.user.data;
    })

  }

  updateInterestedCount() {
    if (this.isUserLoggedIn) {
      if (!this.eventData.interested_users.includes(this.userEmail)) {
        const data = {
          "email": this.userEmail,
          "event_code": this.eventCode
        }
        this.liveEventSer.updateEventLikeCount(data).subscribe((res) => {
          console.log(res);
        })
      }else {
        this.eventData.like_count--;
        this.eventData.interested_users=this.eventData.interested_users;
      }
      this.showInterestedCaptions();
    }
  }

  revokeInterestedCount() {

  }

  showInterestedCaptions(){
    if(!this.eventData.interested_users.includes(this.userEmail)){
      return {detail:'Click on Interested to stay updated about this event.',btnText:"Intereseted?"}
    }
    return {detail:'Great! You will now be updated with all the happenings of this event.',btnText:"Intereseted"}
  }
}

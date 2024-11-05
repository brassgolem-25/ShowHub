import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch,faChevronLeft,faChevronRight,faInfo,faMobile } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from '@angular/router';

interface Showtime {
  time: string;
  format: string;
  availability: number;
}

interface Theater {
  name: string;
  showtimes: Showtime[];
}

@Component({
  selector: 'app-book-ticket',
  standalone: true,
  imports: [HeaderComponent, TabsComponent, CommonModule, MatButtonModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatOptionModule, MatSelectModule,CommonModule,FontAwesomeModule],
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit{
  faSearch = faSearch;
  faChevronLeft=faChevronLeft
  faChevronRight=faChevronRight;
  faInfo=faInfo;
  faMobile=faMobile;
  currDate:string="";
  dates: string[] = [];

  constructor(private route:ActivatedRoute) {
    const currDateArr = Date().slice(0, 15).split(" "); //[Mon,04,Nov,2024]
    let curDate = Number(currDateArr[2]) ;
    this.dates.push(currDateArr[0]+" "+curDate  + " " + currDateArr[1]);
    for (let i = 1; i < 7; i++) {
      curDate = curDate + 1 ;
      this.dates.push(currDateArr[0]+ " " +curDate + " " + currDateArr[1]);
    }
    console.log(this.dates)
  }
  movie = {
    title: 'Singham Again',
    language: 'Hindi',
    genres: ['Action', 'Drama']
  };

  selectedDate = '04 Nov';

  theaters = [
    {
      name: 'Cinepolis Fun Republic Mall, Andheri (W)',
      showtimes: [
        { time: '03:50 PM', format: 'Dolby 7.1', seatsAvailable: true },
        { time: '04:40 PM', format: 'Dolby 7.1', seatsAvailable: true },
        { time: '07:10 PM', format: 'Dolby 7.1', seatsAvailable: false },
      ],
      features: ['M-Ticket', 'Food & Beverage'],
      cancellationAvailable: true
    },
  ];

  // Method to change selected date
  selectDate(date: string) {
    this.selectedDate = date;
  }

  ngOnInit() {
     const eventName = this.route.snapshot.params['eventName'];
     this.currDate = this.route.snapshot.params['date'];
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { GenericHeaderComponent } from '../generic-header/generic-header.component';
import { CommonModule } from '@angular/common';
import { LiveEventService } from '../../core/live-events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [LoadingSpinnerComponent, GenericHeaderComponent, CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit {
  loading: boolean = true;
  currLocation: string = "";
  constructor(private liveEventsSer: LiveEventService, private route: ActivatedRoute) { }

  // Temporary data for filters
  dates = ['Today', 'Tomorrow', 'Weekend'];
  categories = ['Comedy', 'Live Show', 'Music', 'Theater'];
  prices = ['0-100', '100-500', '500-2000', '2000+'];

  selectedDates: string[] = [];
  selectedCategories: string[] = [];
  selectedPrices: string[] = [];

  // Temporary event data
  events = [
    {
      id: 1,
      title: 'Comedy Night',
      poster: 'https://via.placeholder.com/200',
      category: 'Comedy',
      rating: 8.5,
    },
    {
      id: 2,
      title: 'Music Concert',
      poster: 'https://via.placeholder.com/200',
      category: 'Music',
      rating: 7.9,
    },
    {
      id: 3,
      title: 'Live Show',
      poster: 'https://via.placeholder.com/200',
      category: 'Live Show',
      rating: 8.0,
    }
  ];

  toggleDate(date: string) {
    if (this.selectedDates.includes(date)) {
      this.selectedDates = this.selectedDates.filter(d => d !== date);
    } else {
      this.selectedDates.push(date);
    }
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  togglePrice(price: string) {
    if (this.selectedPrices.includes(price)) {
      this.selectedPrices = this.selectedPrices.filter(p => p !== price);
    } else {
      this.selectedPrices.push(price);
    }
  }

  clearFilter(filter: string) {
    if (filter === 'date') {
      this.selectedDates = [];
    } else if (filter === 'category') {
      this.selectedCategories = [];
    } else if (filter === 'price') {
      this.selectedPrices = [];
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const locationRouteObj = params['event-location'] ? params['event-location'] : 'mumbai';
      this.currLocation = locationRouteObj.split('-')[1];
      this.liveEventsSer.getAllEventsByLocation({ city: this.currLocation }).subscribe((data) => {
        this.loading = false;
        if(data.length > 0) {
          this.events = data;
        }
      });
    })

  }
}

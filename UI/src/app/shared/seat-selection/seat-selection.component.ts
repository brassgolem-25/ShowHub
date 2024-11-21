import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})

export class SeatSelectionComponent implements OnInit{
  // Showtimes
  showtimes = ['12:45 PM', '04:10 PM', '07:35 PM', '09:30 PM', '11:00 PM'];
  selectedTime: string = this.showtimes[1];

  // Rows (A-J)
  seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  // Sections with seats
  seatingSections = [
    {
      name: 'Silver',
      price: 190,
      seats: this.generateSeats(10, 20),
    },
    {
      name: 'Premier',
      price: 170,
      seats: this.generateSeats(10, 20),
    },
    {
      name: 'Executive',
      price: 160,
      seats: this.generateSeats(10, 20),
    },
  ];

  generateSeats(rows: number, cols: number): any[][] {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => {
        const statuses = ['available', 'bestseller', 'sold'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return {
          number: (colIndex + 1).toString(),
          status: randomStatus as 'available',
        };
      })
    );
  }

  getSeatClass(seat: any): string {
    return `seat-${seat.status}`;
  }

  selectSeat(seat: any): void {
    if (seat.status === 'available') {
      seat.status = 'selected';
    } else if (seat.status === 'selected') {
      seat.status = 'available';
    }
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  ngOnInit(): void {
      
  }
}

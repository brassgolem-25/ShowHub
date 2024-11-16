import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule,RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit{
  currLocation:string="";
  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((params)=>{
        this.currLocation = params['location'] ? params['location'] : "Mumbai";
      })
  }
}

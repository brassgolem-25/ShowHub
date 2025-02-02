import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule,RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit{
  redirectParams:string="";
  redirectURL:string="";
  constructor(private route:ActivatedRoute,private router: Router){}

  ngOnInit(): void {
      const curURL = this.router.url;
      this.route.params.subscribe((params)=>{
        if(curURL.includes('event')){
          this.redirectParams=params['event-location'];
        }else {
          this.redirectParams=params['location'];
        }
      })
      
  }
}

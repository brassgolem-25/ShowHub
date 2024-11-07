import { Component } from '@angular/core';
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [GenericHeaderComponent, HeaderComponent, TabsComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}

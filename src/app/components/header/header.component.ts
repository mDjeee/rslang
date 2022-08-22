import { Component, OnInit } from '@angular/core';
import { AppLogoComponent } from '../appLogo/appLogo.component';
import { NavigationComponent } from './header-components/navigation/navigation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

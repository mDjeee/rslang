import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  location: boolean = true;
  currentURL:string ='';
  constructor(private router:Router) { }
public locationFooter() {
  this.currentURL = this.router.url
  console.log('configured routes: ',this.router.url)
}
  ngOnInit(): void {
    this.locationFooter()
  }

}

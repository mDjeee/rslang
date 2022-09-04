import { Component, OnInit } from '@angular/core';
import { OasisService } from 'src/app/core/oasis.service';

@Component({
  selector: 'app-oasis',
  templateUrl: './oasis.component.html',
  styleUrls: ['./oasis.component.css']
})
export class OasisComponent implements OnInit {

  isLevels = true;

  constructor(private oasisService: OasisService) { }

  ngOnInit(): void {
  }

  choseLevel(group: number) {
    this.oasisService.choseLevel(group);
  }
}

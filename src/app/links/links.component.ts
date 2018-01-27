import { Component, OnInit } from '@angular/core';
import {MessageDbService} from '../message-db.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links = [];

  constructor(private db: MessageDbService) {

    db.message$
      .filter(x => x.link)
      .map(x => x.link)
      .subscribe((x => {
        this.links.push(x);
        if (this.links.length > 5) {
          this.links.splice(0, 1);
        }
      }));
  }

  ngOnInit() {
  }

}

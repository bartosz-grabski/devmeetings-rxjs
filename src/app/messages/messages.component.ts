import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.messages = db.list('messages').valueChanges();
  }

  ngOnInit() {
  }

}

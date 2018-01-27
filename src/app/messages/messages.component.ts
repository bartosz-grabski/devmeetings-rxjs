import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

interface Message {
  timestamp: number;
  body: string;
  sender: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Observable<Message[]>;

  constructor(db: AngularFireDatabase) {
    this.messages = db.list('messages').valueChanges().pipe(
      map((x: Message[]) => x.sort((a: Message, b: Message) => a.timestamp - b.timestamp))
    );
  }

  ngOnInit() {
  }

}

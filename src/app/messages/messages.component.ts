import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { map } from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';

export interface Message {
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
  private messagesDb: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {

    this.messagesDb = db.list('messages');
    this.messages = this.messagesDb.valueChanges().pipe(
      map((x: Message[]) => x.sort((a: Message, b: Message) => a.timestamp - b.timestamp))
    );

  }

  addMessage(message) {
    return fromPromise(this.messagesDb.push(message));
  }

  ngOnInit() {
  }

}

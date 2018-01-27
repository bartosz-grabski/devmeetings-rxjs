import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';

export interface Message {
  timestamp: number;
  body: string;
  sender: string;
  link?: any;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messages: Observable<Message[]>;
  private messagesDb: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {

    this.messagesDb = db.list('messages');
    this.messages = this.messagesDb.valueChanges().pipe(
      map((x: Message[]) => x.sort((a: Message, b: Message) => b.timestamp - a.timestamp))
    );

  }

  addMessage(message) {
    return fromPromise(this.messagesDb.push(message));
  }

  ngOnInit() {
  }

}

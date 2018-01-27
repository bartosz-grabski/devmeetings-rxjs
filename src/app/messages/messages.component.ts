import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {MessageDbService} from '../message-db.service';

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

  messages: Observable<Message[]>;
  private messagesDb: AngularFireList<any>;

  @Output() showLinks = new EventEmitter();

  constructor(private db: MessageDbService) {

    this.messages = db.messages$.pipe(
      map((x: Message[]) => x.sort((a: Message, b: Message) => a.timestamp - b.timestamp))
    );


  }

  onShowLinks() {
    this.showLinks.emit();
  }

  addMessage(message) {
    return fromPromise(this.db.dbList$.push(message));
  }

  ngOnInit() {
  }

}

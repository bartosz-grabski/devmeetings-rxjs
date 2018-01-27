import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Message } from "./messages/messages.component";
import { map, take, switchMap, filter } from "rxjs/operators";
import { concat } from "rxjs/observable/concat";
import { from } from 'rxjs/observable/from';

@Injectable()
export class MessageDbService {
  messages$ = this.db.list('messages').valueChanges();

  message$ = concat(
    this.messages$.pipe(
      take(1),
      switchMap(msgs => from(msgs)),
    ),
    this.db.list('messages').stateChanges(['child_added']).pipe(
      filter(action => !!action.payload),
      map(action => action.payload!.val()) // tslint:disable-line:no-non-null-assertion
    )
  )

  // private messagesDb: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }


  getMessages() {
      const messagesDb = this.db.list('messages');
      return messagesDb.valueChanges().pipe(
      map((x: Message[]) => x.sort((a: Message, b: Message) => a.timestamp - b.timestamp))
    );
  }
}

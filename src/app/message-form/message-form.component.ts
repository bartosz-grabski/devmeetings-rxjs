import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Message} from '../messages/messages.component';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  @Input() public submitButtonText = 'Done';

  @Output() formSubmit = new EventEmitter();
  formSubmitSubject = new Subject();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.formGroup = formBuilder.group({
      message: ['', Validators.required]
    });

    const regex = /https?:\/\/[a-z\.\/_0-9]+/g;


    this.formSubmitSubject
      .filter(() => this.formGroup.valid)
      .map(() => {
        const message: Message = {
          body: this.formGroup.value.message,
          timestamp: new Date().getTime(),
          sender: 'New'
        };
        const links = message.body.match(regex);
        if (links) {
          message.link = JSON.stringify(links);
          links.forEach((link) => {
            message.body = message.body.replace(link, '<a href="' + link + '">' + link + '</a>');
          });
        }

        return message;
      })
      .subscribe(this.formSubmit);

  }

  ngOnInit() {
  }

}

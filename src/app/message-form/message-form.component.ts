import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import {Subject} from 'rxjs/Subject';

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
      message : ['', Validators.required ]
    });

    this.formSubmitSubject
      .filter(() => this.formGroup.valid)
      .map(() => {
        return {
          body: this.formGroup.value.message,
          timestamp: new Date().getTime(),
          sender: 'New'
        };
      })
      .subscribe(this.formSubmit);

  }

  ngOnInit() {
  }

}

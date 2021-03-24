import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Message} from '../../models/message';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements AfterViewChecked {
  currentUser: string;
  form = this.formBuilder.group({
    input: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
  });
  @ViewChild('scrollMe') private scrollContainer: ElementRef;
  hoveredMessage: Message;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public messageService: MessageService
  ) {
    this.currentUser = userService.currentUser;
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.messageService.send({user: this.currentUser, value: this.form.controls.input.value});
      this.form.controls.input.reset('');
    }
  }
}

import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  loginForm = this.formBuilder.group({
    username: [null, [
      Validators.required,
      Validators.minLength(3)
    ]],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.setUser(this.loginForm.controls.username.value);
      this.router.navigateByUrl('chat-box');
    }
  }
}

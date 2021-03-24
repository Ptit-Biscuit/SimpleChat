import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ChatBoxComponent} from './pages/chat-box/chat-box.component';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent},
      {path: 'chat-box', component: ChatBoxComponent},
      {path: '**', redirectTo: ''},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

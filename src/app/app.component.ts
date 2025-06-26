import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./component/main/main.component";
import { ChatbotComponent } from "./component/chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat';
}

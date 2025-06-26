import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../service/chatbot.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements AfterViewChecked {
  isOpen = false;
  newMessage = '';
  messages: { text: string, from: 'user' | 'server' }[] = [
    { text: 'Hello! How can I help you?', from: 'server' }
  ];
  isWaitingForResponse = false;
  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private chatService: ChatbotService) {}

  ngAfterViewChecked(): void {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }
  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const trimmed = this.newMessage.trim();
    if (!trimmed || this.isWaitingForResponse) return;

    this.messages.push({ text: trimmed, from: 'user' });
    this.newMessage = '';
    this.isWaitingForResponse = true;

    this.chatService.getResponse(trimmed).subscribe({
      next: (response) => {
        this.messages.push({ text: response, from: 'server' });
        this.isWaitingForResponse = false;
      },
      error: () => {
        this.messages.push({ text: 'Oops, server error. Try again.', from: 'server' });
        this.isWaitingForResponse = false;
      }
    });
  }
}

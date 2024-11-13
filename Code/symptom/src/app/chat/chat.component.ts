import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  providers: [ChatService],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'] // Fixed the property name
})
export class ChatComponent {
  messages: { text: string; isUser: boolean }[] = [];
  message: string = '';
  loading: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage() {
    if (this.message.trim()) {
      // Add user message with loading state
      this.messages.push({ text: this.message, isUser: true });
      this.loading = true; // Start loading

      this.chatService.sendMessage(this.message).subscribe((response) => {
        this.loading = false; // Stop loading
        if (!response || response.predicted_disease == "") {
          this.messages.push({ text: "Sorry, Could not find command", isUser: false });
        } else {
          this.messages.push({ text: `Predicted disease is "${response.predicted_disease}"`, isUser: false });
        }
        this.message = ''; // Clear the input field
      });
    }
  }
}

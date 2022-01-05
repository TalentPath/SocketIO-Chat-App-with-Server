import { Component } from '@angular/core';
import { ChatService } from './chat-service.service';
import { TickerService } from './ticker-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string='';
  messageList: string[] = [];

  constructor(private chatService: ChatService, private tickerService:TickerService){

  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message) => {
      this.messageList.push(message);
    })
    this.tickerService.getBTCPrices().subscribe((data:any)=>console.log(data));
    this.tickerService.getStockUpdates().subscribe((data=>console.log(data)))
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}

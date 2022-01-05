import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class TickerService {


  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public stocks$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3000');

  public getBTCPrices = () => {
    this.socket.on('subscribed-btc-prices', (data) =>{
      console.log('subscribe')
      this.message$.next(data);
    });
    
    return this.message$.asObservable();
  };

  public getStockUpdates = () =>{
    this.socket.on('stocks', (data)=>{
      console.log('Getting Stocks');
      this.stocks$.next(data);
    })
    return this.stocks$.asObservable();
  }
}

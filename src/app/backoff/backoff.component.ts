import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backoff',
  templateUrl: './backoff.component.html',
  styleUrls: ['./backoff.component.scss']
})
export class BackoffComponent implements OnInit {

  orders=[{name:'cemline'}];
  orderSubscription: Subscription;

  constructor(private orderservice:OrderService) { }

  ngOnInit(): void {
    this.orderservice.getOrderToServer()
    this.orderSubscription = this.orderservice.ordersSubject.subscribe(
      (orders:any[])=>{
        this.orders = orders
      }
    );
    //this.orderservice.emitOrderSubject()
  }
}



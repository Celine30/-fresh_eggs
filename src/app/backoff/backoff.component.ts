import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  first_name: string;
  date: Date;
  boite: Number;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-backoff',
  templateUrl: './backoff.component.html',
  styleUrls: ['./backoff.component.scss']
})


export class BackoffComponent implements OnInit {

  orders=[];
  orderSubscription: Subscription;

  displayedColumns: string[] = ['name', 'first_name', 'date', 'boite'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private orderservice:OrderService) { }

  ngOnInit(): void {
    this.orderservice.getOrderToServer()
    this.orderSubscription = this.orderservice.ordersSubject.subscribe(
      (response)=>{
        this.dataSource.data = response;
        console.log(response)
      }
    );
  }
}



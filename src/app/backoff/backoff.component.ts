import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

  FiltreForm : FormGroup;
  minDate: Date;
  orders=[];
  orderSubscription: Subscription;

  displayedColumns: string[] = ['name', 'first_name', 'date', 'boite'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue;    
  }

  constructor(private orderservice:OrderService, private formBuilder : FormBuilder) {this.minDate = new Date(); }

  initForm(){
    this.FiltreForm = this.formBuilder.group({
      date:['',[Validators.required]],
    })
  }

  onSubmitForm(){
    const formValue = this.FiltreForm.value.date;
    console.log(new Date(formValue))
    console.log(formValue.toISOString())
    this.applyFilter(formValue.toISOString())
  }

  get f() { return this.FiltreForm.controls; }

  ngOnInit(): void {
  
    this.initForm();
    this.orderservice.getOrderToServer()
    this.orderSubscription = this.orderservice.ordersSubject.subscribe(
      (response)=>{
        this.dataSource.data = response;
        this.orders = response;
      }
    );
  }
}



import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  first_name: string;
  date: Date;
  boite: number;
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
  displayedColumns: string[] = ['name', 'last_name', 'date', 'boite'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  constructor(private orderservice:OrderService, private formBuilder : FormBuilder) {this.minDate = new Date(); }


  applyFilter(filterValue) {
    this.dataSource.filter = filterValue;  
    this.getTotalCost()  
  }

  resetFilters(){
    this.dataSource.filter = "";
  }

  initForm(){
    this.FiltreForm = this.formBuilder.group({
      date:['',[Validators.required]],
    })
  }

  onSubmitForm(){
    const formValue = this.FiltreForm.value.date;
    this.applyFilter(formValue.toISOString())
    
  }

  get f() { return this.FiltreForm.controls; }

  
  getTotalCost() {
    return this.dataSource.filteredData.map(t => t.boite).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
    this.initForm();
    this.dataSource.sort = this.sort;
    this.orderservice.getOrderToServer()
    this.orderSubscription = this.orderservice.ordersSubject.subscribe(
      (response)=>{
        this.dataSource.data= response;
        console.log(this.dataSource.data)
      }
    );
  }

}


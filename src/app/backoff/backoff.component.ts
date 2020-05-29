import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';




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

export class BackoffComponent implements OnInit, OnDestroy {

  
  FiltreForm : FormGroup;
  minDate: Date;
  orders=[];
  orderSubscription: Subscription;
  displayedColumns: string[] = ['name', 'last_name', 'ntel', 'date', 'boite'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  constructor(private router: Router ,private orderservice:OrderService, private formBuilder : FormBuilder, private authService : AuthService, private appcomponent : AppComponent) {this.minDate = new Date(); }


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
    console.log(formValue)
    console.log(formValue.toString())
    this.applyFilter(formValue.toString())
  }

  logOut(){
      console.log('se déconnecter');
      this.authService.signOut();
      this.appcomponent.backoff=false;
      this.router.navigate(['auth']);
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
        //console.log(this.dataSource.data)
      }
    );
  }

  ngOnDestroy() {
    console.log(this.dataSource.data)
    this.orderSubscription.unsubscribe();
    this.dataSource.data=[];
    console.log(this.dataSource.data)
  }

}


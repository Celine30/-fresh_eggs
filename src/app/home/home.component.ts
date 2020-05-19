import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , FormArray, Validators, FormControl} from '@angular/forms';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  name = new FormControl('');
  
  email = new FormControl('');

  ResaForm : FormGroup;
  selected :string;
  minDate: Date;
  maxDate: Date;  


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  

  constructor(private orderservice:OrderService, private formBuilder : FormBuilder) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate()+6);
  }

  initForm(){
    this.ResaForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name:['', Validators.required],
      number:['', Validators.required],
      date:['', Validators.required],
      boite:['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.initForm();
  }



  onSubmitForm(){
    const formValue = this.ResaForm.value;
    this.orderservice.addOrder(formValue);
    
  }

}

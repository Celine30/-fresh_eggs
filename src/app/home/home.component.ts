import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , FormArray, Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  ResaForm : FormGroup;
  selected :string;
  minDate: Date;
  maxDate: Date;  
  message:string;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  constructor(private orderservice:OrderService, private formBuilder : FormBuilder , private Router :Router, private route: ActivatedRoute) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate()+6);
  }

  initForm(){
    this.ResaForm = this.formBuilder.group({
      name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      number:['',[Validators.required , Validators.pattern('^(0[0-9]{1})([/ _.-]?[0-9]{2}){4}')]],
      date:[Date,[Validators.required]],
      boite:['',[Validators.required]],
      engagement:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.message = this.route.snapshot.params['caller']
  }

  get f() { return this.ResaForm.controls; }

  onSubmitForm(){
    const formValue = this.ResaForm.value;
    console.log(formValue)
    this.orderservice.addOrder(formValue); 
    //this.resetForm();
    //this.Router.navigate(["thanks"]);
  }


  onReset(): void {
    this.resetForm();
  }

  resetForm(value: any = undefined): void {
    this.ResaForm.reset(value);
  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , FormArray} from '@angular/forms';

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
 
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 2 && day !== 3 && day !== 4 &&  day !== 6;
  }

  constructor(private formBuilder : FormBuilder) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate()+6);
  }

  initForm(){
    this.ResaForm = this.formBuilder.group({
      name: '',
      last_name:'',
      number:'',
      date:'',
      boite:'',
    })
  }

  ngOnInit(): void {
    this.initForm()
  }
  onSubmitForm(){
    const formValue = this.ResaForm.value;
    console.log(formValue)
    var ladate=new Date()
    console.log("ladate.getDay() = "+ladate.getDay()+"<BR>")
    var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    console.log("Nous sommes un "+tab_jour[ladate.getDay()])
  }

}

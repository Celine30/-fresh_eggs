import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { Router } from '@angular/router';

    
// https://cors-anywhere.herokuapp.com/

@Injectable()

export class OrderService{


    constructor( private httpClient : HttpClient, private Router :Router ) {}

    public orders=[]

    public ordersObject=[]

    ordersSubject = new Subject<any>();


    orderUnit:any
    tableau=[]

    emitOrderSubject (){
        this.ordersSubject.next(this.orders.slice());
    }

    addOrder(order:any){
        let dateOk= order.date.getFullYear()+'/'+ (order.date.getMonth()+1)+'/'+ order.date.getDate()
        console.log(dateOk)
        this.httpClient
        .get('https://cors-anywhere.herokuapp.com/https://www.izycom-communication.fr/api/fresh-eggs/ajouter_order.php?name='+ order.name +'&last_name='+ order.last_name +'&num_tel='+ order.number +'&num_boite='+ order.boite +'&recup_date='+ dateOk )
        .subscribe(
            ()=>{
                console.log('Enregistrement terminé');
                this.Router.navigate(["thanks"]);
            },
            (error) => {
                console.log('Erreur de sauvegarde' + error);
                console.log(Object.values(error));
            }
        )    
    }

    getOrderToServer(){
        this.httpClient
            .get('https://cors-anywhere.herokuapp.com/https://www.izycom-communication.fr/api/fresh-eggs/')
            .subscribe(
                (response) =>{
                    console.log(response)
                    for (const property of response['results'].order) {
                        this.orderUnit = {name:property.first_name.toUpperCase(), last_name:property.last_name.toUpperCase(), ntel:property.num_tel, date:(new Date(property.recup_date)).toString(), boite:parseInt(property.num_boite)}
                        this.tableau.push(this.orderUnit)
                    }
                        this.orders=this.tableau
                        this.tableau=[]
                        this.emitOrderSubject();
                },
                (error) => {
                    console.log('Erreur de chargement' + error);
                }
            )
    }
}
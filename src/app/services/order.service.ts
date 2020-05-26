import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable()

export class OrderService{

    constructor( private httpClient : HttpClient ) {}

    public orders=[]

    public ordersObject=[]

    ordersSubject = new Subject<any>();


    orderUnit:any
    tableau=[]

    emitOrderSubject (){
        this.ordersSubject.next(this.orders.slice());
    }

    addOrder(order:any){
        console.log(order)
        this.httpClient
        .post('https://kaamelott-7aaa9.firebaseio.com/orders.json', order)
        .subscribe(
            ()=>{
                console.log('Enregistrement terminé');
            },
            (error) => {
                console.log('Erreur de sauvegarde' + error);
            }
        )
    }

    getOrderToServer(){
        this.httpClient
            .get<any[]>('https://kaamelott-7aaa9.firebaseio.com/orders.json')
            .subscribe(
                (response) =>{
                    for (const property of Object.values(response)) {
                        this.orderUnit = {name:property.name.toUpperCase(), last_name:property.last_name.toUpperCase(), ntel:property.number, date:property.date, boite:parseInt(property.boite)}
                        this.tableau.push(this.orderUnit)
                    }
                    this.orders=this.tableau
                    this.emitOrderSubject();
                },
                (error) => {
                    console.log('Erreur de chargement' + error);
                }
            )
    }
}
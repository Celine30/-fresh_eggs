import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable()

export class OrderService{

    constructor( private httpClient : HttpClient ) {}

    public orders=[ new Order (1, '38', 'azert', 'azerty', 'azerty', 'azerty')]

    ordersSubject = new Subject<any>();

    emitOrderSubject (){
        this.ordersSubject.next(this.orders.slice());
    }

    addOrder(order:any){
        console.log(order)
        console.log(this.orders)
        this.httpClient
        .post('https://kaamelott-7aaa9.firebaseio.com/orders.json', this.orders)
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
                    console.log(Object.values(response))
                    this.orders = Object.values(response);
                    this.emitOrderSubject();
                },
                (error) => {
                    console.log('Erreur de chargement' + error);
                }
            )
    }
}
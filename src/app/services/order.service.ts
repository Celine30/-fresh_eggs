import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()

export class OrderService{

    constructor( private httpClient : HttpClient ) {}

    public orders = [
    ]

    ordersSubject = new Subject<any>();

    emitOrderSubject (){
        this.ordersSubject.next(this.orders.slice());
    }

    addOrder(order:any){
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

    saveOrderToserver(){
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
                    this.orders = response;
                    this.emitOrderSubject();
                },
                (error) => {
                    console.log('Erreur de chargement' + error);
                }
            )
    }
}
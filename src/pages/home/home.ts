import { VendedorServiceProvider } from './../../providers/vendedor-service/vendedor-service';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { Chart } from 'chart.js';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;


    username = '';
    email = '';
    data0: any;
    data1: any;
    data2: any;

    constructor(private navCtrl: NavController, private auth: AuthService, public vend: VendedorServiceProvider) {

        console.log('Iniciando Home')
        let info = this.auth.getUserInfo();
        //this.username = info['name'];
        //this.email = info['email'];

        this.username = 'user';
        this.email = 'mail';

        //localStorage.setItem('vend_id', '99');


        // var data0 = vend.GetDataChar(localStorage.getItem('vend_id'),0);

        // var data3 = vend.GetDataChar(localStorage.getItem('vend_id'),2);

    }

    ionViewDidLoad() {

        //this.data0 = this.vend.GetDataChar(localStorage.getItem('vend_id'), 0);



        var poolColors = function (a) {
            var pool = [];
            for(var i=0;i<a;i++){
                pool.push(dynamicColors());
            }
            return pool;
        }
    
        var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    


        this.vend.GetDataChar(localStorage.getItem('vend_id'), 1).subscribe(
            data => {
                this.data0 = data;
                console.log(data);

                var keys = [];
                var values = [];

                keys = this.data0.map(function (obj) {
                    return obj.texto;
                });

                values = this.data0.map(function (obj) {
                    return obj.valor;
                });

                console.log(keys);
                console.log(values);

                this.barChart = new Chart(this.barCanvas.nativeElement, {

                    type: 'bar',
                    data: {
                        labels: keys,//["BJP", "INC", "AAP", "CPI", "CPI-M", "NCP"],
                        datasets: [{
                            label: 'Clientes',
                            data: values,//[200, 50, 30, 15, 20, 34],
                            borderWidth: 1,
                            backgroundColor: poolColors(10)
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }

                });


            },
            err => {
                console.log(err);
            },
            () => console.log('Proceso Completo')
        );


        //this.data1 = this.vend.GetDataChar(localStorage.getItem('vend_id'), 1);

        this.vend.GetDataChar(localStorage.getItem('vend_id'), 0).subscribe(
            data => {
                this.data1 = data;
                console.log(data);

                var keys = [];
                var values = [];

                keys = data.map(function (obj) {
                    return obj.texto;
                });

                values = data.map(function (obj) {
                    return obj.valor;
                });

                console.log(keys);
                console.log(values);

                this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

                    type: 'doughnut',
                    data: {
                        labels: keys,
                        datasets: [{
                            label: 'Grupos',
                            data: values,
                            backgroundColor: poolColors(10)
                        }]
                    }
        
                });
        


            },
            err => {
                console.log(err);
            },
            () => console.log('Proceso Completo')
        );


        this.vend.GetDataChar(localStorage.getItem('vend_id'), 2).subscribe(
            data => {
                this.data2 = data;
                console.log(data);

                var keys = [];
                var values = [];

                keys = data.map(function (obj) {
                    return obj.texto;
                });

                values = data.map(function (obj) {
                    return obj.valor;
                });

                console.log(keys);
                console.log(values);

                this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                    type: 'line',
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                label: "TimeLine",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: values,
                                spanGaps: false,
                            }
                        ]
                    }
        
                });
               


            },
            err => {
                console.log(err);
            },
            () => console.log('Proceso Completo')
        );








    }

    public logout() {
        this.auth.logout().subscribe(succ => {
            this.navCtrl.setRoot(LoginPage)
        });
    }
}

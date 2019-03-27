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
  data1 : any;

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

    this.data1 = this.vend.GetDataChar(localStorage.getItem('vend_id'),1);

    
    this.vend.GetDataChar(localStorage.getItem('vend_id'),1).subscribe(
        data => {
          this.data1 = data;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Proceso Completo')
      );



    let values = Object.keys(this.data1).map(key => this.data1[key]);
 
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: Object.keys(this.data1),//["BJP", "INC", "AAP", "CPI", "CPI-M", "NCP"],
            datasets: [{
                label: '# of Votes',
                data: values,//[200, 50, 30, 15, 20, 34],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
            labels: ["BJP", "Congress", "AAP", "CPM", "SP"],
            datasets: [{
                label: '# of Votes',
                data: [50, 29, 15, 10, 7],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                hoverBackgroundColor: [
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384" 
                ]
            }]
        }

    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"],
            datasets: [
                {
                    label: "Sell per week",
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
                    data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
                    spanGaps: false,
                }
            ]
        }

    });

}
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }
}

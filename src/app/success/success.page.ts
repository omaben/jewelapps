import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OrderService } from '../../services/order.service';
import { RestService } from '../../services/rest.service';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'page-about',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})

export class SuccessComponent implements OnInit {
	public aboutInfo: string;
  public aboutTitle: string;
  public companyPhone: string;
  public companyFix: string;
  public companyMail: string;
  public companyAdress: string;
  public logoApps : string;
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };
	constructor(
		private activatedRoute: ActivatedRoute, 
		private orderService: OrderService,
		private settingService: SettingService,
		private restService: RestService
	) {}
	
	ngOnInit() {
    this.settingService.find('app_name').subscribe(data => this.aboutTitle = data.value);
    this.settingService.find('app_about').subscribe(data => this.aboutInfo = data.value);
    this.settingService.find('company_phone').subscribe(data => this.companyPhone = data.value);
    this.settingService.find('company_fix').subscribe(data => this.companyFix = data.value);
    this.settingService.find('company_mail').subscribe(data => this.companyMail = data.value);
    this.settingService.find('company_adress').subscribe(data => this.companyAdress = data.value);
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
		});
    let username=sessionStorage.getItem('username');
		let tx: any = (Math.random().toString(36)+username.charAt(0)).toUpperCase().split('.')[1];
		let total: any = this.activatedRoute.snapshot.queryParams['amt'];
			
		// Add new order		
		let order:any = {id: tx, name: 'Order Online', username: sessionStorage.getItem('username') };
		
		// Add order detail
		let orderDetails: any = [];
		if(sessionStorage.getItem('cart') != null) {
			let cart = JSON.parse(sessionStorage.getItem('cart'));
			for(var i = 0; i < cart.length; i++) {
				let cart_row = JSON.parse(cart[i]);
				orderDetails.push({
					articleId: cart_row.id,
                    ordersId: tx,
                    quantity: cart_row.quantity,
                    price: cart_row.quantity * cart_row.gram,
                    totalGramNet: cart_row.quantity * cart_row.gram * cart_row.ayar_key / 1000
				});	
			}
			order['orderDetails'] = orderDetails;
		}
		
		this.orderService.create(order).subscribe(
			result => {				
				// Remove cart
				if(sessionStorage.getItem('cart') != null) {
					sessionStorage.removeItem('cart');
				}				
			}
		);
		
		
	}
}





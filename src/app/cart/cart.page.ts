import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SettingService } from '../../services/setting.service';
import { AccountService } from '../../services/account.service';
import { Item } from '../../entities/item.entities';
import { CartInfo } from '../../entities/cartinfo.entities';
import { UserInfo } from '../../entities/userinfo.entities';
import { Router } from '@angular/router';
import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'app-folder',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public folder: string;
  items:any = [];
	s:number = 0;
	sGram:number = 0;
	sHas:number = 0;
	cartInfo: CartInfo;
	businessEmail: string;
	returnUrl: string;
	userInfo: UserInfo;
  odreForm: any; 
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };
  public logoApps : string;
  constructor(
		private activatedRoute: ActivatedRoute, 
		private router: Router,
		private productService: ProductService,
		public cartService: CartService,
        private accountService: AccountService,
    private settingService: SettingService,
    public popoverCtrl: PopoverController
	) {
		if(sessionStorage.getItem('username') != null) {
            accountService.userInfo.username = sessionStorage.getItem('username');
        }
		this.userInfo = accountService.userInfo;
	}
  ngOnInit() {
	  
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
    });
    let params: any = this.activatedRoute.snapshot.params;
		if(Object.keys(params).length > 0) {
			this.add(params.id);	
		} else {
			if(sessionStorage.getItem('cart') != null) {
				let cartArr = JSON.parse(sessionStorage.getItem('cart'));	
				for(var i = 0; i < cartArr.length; i++) {
					let temp = JSON.parse(cartArr[i]);
					this.items.push({
						id: temp.id,
                        name: temp.name,
                        price: temp.price,
                        photo: temp.photo,
                        quantity: temp.quantity,
                        ayar: temp.ayar,
                        ayar_key: temp.ayar_key,
                        gram: temp.gram,
                        categoryId: temp.categoryId
					});
				}
			}
		}	
		this.sGram = this.total();
		this.sHas = this.totalHas();
		this.s = this.total_items()
        // Display Cart Info
        this.cartService.update(this.total_items(), this.total(), this.totalHas());
		this.settingService.find('paypal_business_email').subscribe(data => {
			this.businessEmail = data.value;
		});
		this.settingService.find('paypal_return').subscribe(data => {
			this.returnUrl = data.value;
		});
  }
  add(id: number) {
		this.productService.find(id).subscribe(data => {
			let item: Item = {
				id: data.id,
                name: data.title,
                price: data.price,
                photo: data.photo,
                ayar: data.ayar,
                ayar_key: data.ayar_key,
                    gram: data.gram,
                quantity: 1,
                categoryId: data.categoryId
			};
			if(sessionStorage.getItem('cart') == null) {
				let cart = [];
				cart.push(JSON.stringify(item));
				sessionStorage.setItem('cart', JSON.stringify(cart));
			} else {
				let cart: any = JSON.parse(sessionStorage.getItem('cart'));
				let cartArr = JSON.parse(sessionStorage.getItem('cart'));	
				let index: number = -1;
				for(var i = 0; i < cart.length; i++) {
					let temp = JSON.parse(cartArr[i]);
					if(temp.id == data.id) {
						index = i;
						break;
					}
				}
				
				if(index == -1) {
					cart.push(JSON.stringify(item));
					sessionStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let temp = JSON.parse(cart[index]);
					temp.quantity += 1;
					cart[index] = JSON.stringify(temp);
					sessionStorage.setItem('cart', JSON.stringify(cart));
				}
			}
			let cartArr = JSON.parse(sessionStorage.getItem('cart'));	
			for(var i = 0; i < cartArr.length; i++) {
				let temp = JSON.parse(cartArr[i]);
				this.items.push({
					id: temp.id,
                    name: temp.name,
                    price: temp.price,
                    photo: temp.photo,
                    quantity: temp.quantity,
                    ayar: temp.ayar,
                    ayar_key: temp.ayar_key,
                    gram: temp.gram,
                    categoryId: temp.categoryId
				});
			}
			
			// Sum
			this.sGram = this.total();
			this.sHas = this.totalHas();
			this.s = this.total_items()
			// Display Cart Info
			this.cartService.update(this.total_items(), this.total(), this.totalHas());
			
		});
  }
  save(event: any) {
		this.router.navigate(['/success']);
    }
    total(): number {
      let sGram: number = 0;
      let cart = JSON.parse(sessionStorage.getItem('cart'));	
      for(var i = 0; i < cart.length; i++) {
        let temp = JSON.parse(cart[i]);
        sGram += temp.quantity * temp.gram;
      }
      return Number(sGram.toFixed(2));
    }
    totalHas(): number {
		let sGram: number = 0;
		let sHas: number = 0;
		let cart = JSON.parse(sessionStorage.getItem('cart'));	
		for(var i = 0; i < cart.length; i++) {
		  let temp = JSON.parse(cart[i]);
		  sGram = temp.quantity * temp.gram;
            sHas += sGram * temp.ayar_key / 1000;
		}
		return Number(sHas.toFixed(2));
	  }
	updateQualiteMinus(id: number): void {
		var cart = JSON.parse(sessionStorage.getItem('cart'));
            for (var i = 0; i < cart.length; i++) {
                var temp = JSON.parse(cart[i]);
                
                if (temp.id == id) {
                    if(temp.quantity>1){
                        temp.quantity -= 1;
                        cart[i] = JSON.stringify(temp);
                    }
                    break;
                }
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            this.items = [];
            cart = JSON.parse(sessionStorage.getItem('cart'));
            for (var i = 0; i < cart.length; i++) {
                var temp = JSON.parse(cart[i]);
                this.items.push({
                    id: temp.id,
                    name: temp.name,
                    price: temp.price,
                    photo: temp.photo,
                    ayar: temp.ayar,
                    ayar_key: temp.ayar_key,
                    gram: temp.gram,
                    quantity: temp.quantity,
                    categoryId: temp.categoryId
                });
            }
            // Sum
            this.sGram = this.total();
			this.sHas = this.totalHas();
			this.s = this.total_items()
            // Display Cart Info
            this.cartService.update(this.total_items(), this.total(),this.totalHas());
	}
	updateQualitePlus(id: number): void {
		var cart = JSON.parse(sessionStorage.getItem('cart'));
            for (var i = 0; i < cart.length; i++) {
                var temp = JSON.parse(cart[i]);
                
                if (temp.id == id) {
                    temp.quantity += 1;
                    cart[i] = JSON.stringify(temp);
                    break;
                }
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            this.items = [];
            cart = JSON.parse(sessionStorage.getItem('cart'));
            for (var i = 0; i < cart.length; i++) {
                var temp = JSON.parse(cart[i]);
                this.items.push({
                    id: temp.id,
                    name: temp.name,
                    price: temp.price,
                    photo: temp.photo,
                    ayar: temp.ayar,
                    ayar_key: temp.ayar_key,
                    gram: temp.gram,
                    quantity: temp.quantity,
                    categoryId: temp.categoryId
                });
            }
            // Sum
            this.sGram = this.total();
			this.sHas = this.totalHas();
			this.s = this.total_items()
            // Display Cart Info
            this.cartService.update(this.total_items(), this.total(),this.totalHas());
	}
    remove(id: number): void {
      var result = confirm('Are you sure?');
      if(result) {
        let cart = JSON.parse(sessionStorage.getItem('cart'));	
        let index: number = -1;
        for(var i = 0; i < cart.length; i++) {
          let temp = JSON.parse(cart[i]);
          if(temp.id == id) {
            index = i;
            break;
          }
        }
        cart.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        
        this.items = [];
        cart = JSON.parse(sessionStorage.getItem('cart'));
        for(var i = 0; i < cart.length; i++) {
          let temp = JSON.parse(cart[i]);
          this.items.push({
            id: temp.id,
                    name: temp.name,
                    price: temp.price,
                    photo: temp.photo,
                    quantity: temp.quantity,
                    ayar: temp.ayar,
                    ayar_key: temp.ayar_key,
                    gram: temp.gram,
                    categoryId: temp.categoryId
          });
        }
        
        // Sum
		this.sGram = this.total();
		this.sHas = this.totalHas();
		this.s = this.total_items()
        
        // Display Cart Info
        this.cartService.update(this.total_items(), this.total(), this.totalHas());
      }		
    }
    
    total_items(): number {
      let s: number = 0;
      if(sessionStorage.getItem('cart') != null) {
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        s = cart.length;
      }
      return s;
    }
}

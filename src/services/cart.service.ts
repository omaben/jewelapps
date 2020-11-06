import { Injectable } from '@angular/core';

import { CartInfo } from '../entities/cartinfo.entities';
import { map } from 'rxjs/operators';
@Injectable()
export class CartService {
	
	cartInfo: CartInfo = { total : 0, total_items : 0,total_has: 0 };
	
	update(total: number, total_items: number, total_has: number){
		this.cartInfo.total = total;
		this.cartInfo.total_items = total_items;
		this.cartInfo.total_has = total_has;
	}
}
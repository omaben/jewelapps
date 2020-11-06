import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
@Injectable()
export class OrderService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	create(param: any) {	
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		param[this.restService.getKeyName()] = this.restService.getKey();
		let body = JSON.stringify(param);
		return this.http.post(this.restService.baseURLNoKey('order', 'create'), body, options);	
	}

	findByUsername(username: string) {	
		return this.http.get(this.restService.baseURLKey('order', 'findByUsername/' + username)).map((res:Response) => res.json());
	}

	find(id: number) {	
		return this.http.get(this.restService.baseURLKey('order', 'find/' + id)).map((res:Response) => res.json());		
	}

	sum(id: string) {	       
		return this.http.get(this.restService.baseURLKey('order', 'sum/' + id)).map((res:Response) => res.json());		
	}
	sumHas(id: string) {	       
		return this.http.get(this.restService.baseURLKey('order', 'sumHas/' + id)).map((res:Response) => res.json());		
	}
	
}
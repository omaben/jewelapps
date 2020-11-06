import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserInfo } from '../entities/userinfo.entities';

import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
@Injectable()
export class ContactService {
	
	userInfo: UserInfo = { username : ''};

	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	create(param: any) {	
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		param[this.restService.getKeyName()] = this.restService.getKey();
		let body = JSON.stringify(param);
		return this.http.post(this.restService.baseURLNoKey('contact', 'create'), body, options).map((res:Response) => res.json());
	}
	
	
	
	
	
}
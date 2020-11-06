import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserInfo } from '../entities/userinfo.entities';

import { RestService } from './rest.service';

@Injectable()
export class AccountService {
	
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
		return this.http.post(this.restService.baseURLNoKey('account', 'signup'), body, options).map((res:Response) => res.json());
	}
	
	login(username: string, password: string) {	
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		var key = this.restService.getKeyName;
		var keyValue = this.restService.getKey();
		let body = JSON.stringify({username: username, password: password, X_API_KEY: keyValue });
		return this.http.post(this.restService.baseURLNoKey('account', 'login'), body, options).map((res:Response) => res.json());
	}
    
    profile(username: string) {	
		return this.http.get(this.restService.baseURLKey('account', 'profile/' + username)).map((res:Response) => res.json());		
	}
    
    saveProfile(param: any) {	
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		param[this.restService.getKeyName()] = this.restService.getKey();
		let body = JSON.stringify(param);
		return this.http.post(this.restService.baseURLNoKey('account', 'profile'), body, options).map((res:Response) => res.json());
	}
	
	updateLoginedToTemplate(username: string){
		this.userInfo.username = username;
	}
	
	
	
	
	
}
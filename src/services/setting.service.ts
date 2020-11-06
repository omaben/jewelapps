import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable()
export class SettingService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	find(key: string) {	
		return this.http.get(this.restService.baseURLKey('setting', 'find_by_key/' + key)).map((res:Response) => res.json());		
	}
	
	
	
}
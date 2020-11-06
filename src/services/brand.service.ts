import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable()
export class BrandService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	findAll() {	
		return this.http.get(this.restService.baseURLKey('brand', 'find_all')).map((res:Response) => res.json());		
	}
	
	find(id: number) {	
		return this.http.get(this.restService.baseURLKey('brand', 'find_by_id/' + id)).map((res:Response) => res.json());		
	}
	
	
}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
@Injectable()
export class CategoryService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	findAll() {	
		return this.http.get(this.restService.baseURLKey('category', 'find_level_1')).map((res:Response) => res.json());		
	}
	
	findAllLevel() {	
		return this.http.get(this.restService.baseURLKey('category', 'find_all_level')).map((res:Response) => res.json());		
	}
	
	find(id: number) {	
		return this.http.get(this.restService.baseURLKey('category', 'find_by_id/' + id)).map((res:Response) => res.json());		
	}

	findCollection(id: number) {	
		return this.http.get(this.restService.baseURLKey('category', 'find_by_collection_id/' + id)).map((res:Response) => res.json());		
	}
	
	findSubCategory(id: number) {	
		return this.http.get(this.restService.baseURLKey('category', 'find_sub_categories/' + id)).map((res:Response) => res.json());		
	}
	
	countSubCategory(id: number) {	
		return this.http.get(this.restService.baseURLKey('category', 'count_sub_categories/' + id)).map((res:Response) => res.json());		
	}
	
}
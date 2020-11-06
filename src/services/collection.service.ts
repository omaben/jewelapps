import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
@Injectable()
export class CollectionService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	findAll() {	
		return this.http.get(this.restService.baseURLKey('collection', 'find_level_1')).map((res:Response) => res.json());		
	}
	
	findAllLevel() {	
		return this.http.get(this.restService.baseURLKey('collection', 'find_all_level')).map((res:Response) => res.json());		
	}
	
	find(id: number) {	
		return this.http.get(this.restService.baseURLKey('collection', 'find_by_id/' + id)).map((res:Response) => res.json());		
	}

	findCollection(id: number) {	
		return this.http.get(this.restService.baseURLKey('collection', 'find_by_id/' + id)).map((res:Response) => res.json());		
	}
	
	findSubcollection(id: number) {	
		return this.http.get(this.restService.baseURLKey('collection', 'find_sub_collections/' + id)).map((res:Response) => res.json());		
	}
	
	countSubcollection(id: number) {	
		return this.http.get(this.restService.baseURLKey('collection', 'count_sub_collections/' + id)).map((res:Response) => res.json());		
	}
	
}
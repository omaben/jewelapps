import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable()
export class CommentService {
	
	constructor (
		private http: Http,
		public restService: RestService
	) {}
	
	findAll() {	
		return this.http.get(this.restService.baseURLKey('comment', 'find_all')).map((res:Response) => res.json());		
	}
	
	find(id: number) {	
		return this.http.get(this.restService.baseURLKey('comment', 'find_by_article/' + id)).map((res:Response) => res.json());		
	}
	
	
}
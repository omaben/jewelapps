import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CollectionService } from '../../services/collection.service';
import { Product } from '../../entities/product.entities';
import { Collection } from '../../entities/collection.entities';
import { BrandService } from '../../services/brand.service';
import { SettingService } from '../../services/setting.service';
import { CommentService } from '../../services/comment.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home: string;
  public linkPhoto: string;
  public aboutInfo: string;
  public aboutTitle: string;
  products: Product[];
  collections : Collection[];
  brands : {};
  comments : {};
  public logoApps = 'https://demo.jewelapps.com/assets/upload/logoL.png';
  public slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay:true,
    loop:true
  };
  public slideOpts1 = {
    initialSlide: 1,
    speed: 500,
    autoplay:1000,
    loop:true
  };
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private collectionService: CollectionService, private brandService: BrandService, private settingService: SettingService, private commentService: CommentService) { }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.latest().subscribe(data => this.products = data);	
    this.collectionService.findAllLevel().subscribe(data => this.collections = data);
    this.brandService.findAll().subscribe(data => this.brands = data);
    this.settingService.find('base_url_photo').subscribe(data => this.linkPhoto = data.value);
    this.settingService.find('app_name').subscribe(data => this.aboutTitle = data.value);
    this.settingService.find('app_about').subscribe(data => this.aboutInfo = data.value);
    this.commentService.findAll().subscribe(data => this.comments = data);
  }
   

}

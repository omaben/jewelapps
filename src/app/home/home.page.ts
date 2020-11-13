import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CollectionService } from '../../services/collection.service';
import { Product } from '../../entities/product.entities';
import { Collection } from '../../entities/collection.entities';
import { BrandService } from '../../services/brand.service';
import { SettingService } from '../../services/setting.service';
import { CommentService } from '../../services/comment.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, AlertController } from '@ionic/angular'
import { ProductdetailPage } from '../productdetail/productdetail';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  signUpForm: FormGroup; 
  result: any;
  public home: string;
  public linkPhoto: string;
  public aboutInfo: string;
  public aboutTitle: string;
  public companyInstagram: string;
  public companyFb: string;
  public companyTwitter: string;
  public companyYoutube: string;
  public path_banner1: string;
  public path_banner2: string;
  public path_banner3: string;
  products: Product[];
  collections : Collection[];
  brands : {};
  comments : {};
  banner : {
    
  };
  public logoApps : string;
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
  constructor(private splashScreen: SplashScreen,private formBuilder: FormBuilder, private contactService: ContactService, private navCtrl: ModalController,private statusBar: StatusBar,private platform: Platform, private activatedRoute: ActivatedRoute, private productService: ProductService, private collectionService: CollectionService, private brandService: BrandService, private settingService: SettingService, private commentService: CommentService) { 
    this.initializeApp();
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
  });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
   
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.latest().subscribe(data => this.products = data);	
    this.collectionService.findAllLevel().subscribe(data => this.collections = data);
    this.brandService.findAll().subscribe(data => this.brands = data);
    this.settingService.find('base_url_photo').subscribe(data => this.linkPhoto = data.value);
    this.settingService.find('path_banner1').subscribe(data => this.path_banner1 = data.value);
    this.settingService.find('path_banner2').subscribe(data => this.path_banner2 = data.value);
    this.settingService.find('path_banner3').subscribe(data => this.path_banner3 = data.value);
    
    this.settingService.find('app_name').subscribe(data => this.aboutTitle = data.value);
    this.settingService.find('app_about').subscribe(data => this.aboutInfo = data.value);
    this.settingService.find('company_fb').subscribe(data => this.companyFb = data.value);
    this.settingService.find('company_instagram').subscribe(data => this.companyInstagram = data.value);
    this.settingService.find('company_twitter').subscribe(data => this.companyTwitter = data.value);
    this.settingService.find('company_youtube').subscribe(data => this.companyYoutube = data.value);
    this.commentService.findAll().subscribe(data => this.comments = data);
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
		});
  }
  async openSocial(network: string) {
    window.open(network)
  } 
  save() {
    this.contactService.create(this.signUpForm.value).subscribe(data => {
        var resultR = JSON.parse(data);
        if(resultR.count == 0) {
          window.location.reload()
        } else {
            this.result = resultR
        }
    });
}
  openNavDetailsPage(item) {
    this.navCtrl.create({
      component: ProductdetailPage,
      componentProps: { 
        productId:item.id
      }
  }).then((modal) => {
      modal.present();
  });
  }
}

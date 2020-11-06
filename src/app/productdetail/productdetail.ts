import { Component, OnInit, ViewChild } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { SettingService } from '../../services/setting.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import {Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entities';
import { ModalController, AlertController } from '@ionic/angular'
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
  styleUrls: ['./productdetail.scss'],
})
export class ProductdetailPage implements OnInit{
  myId = null;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  signUpForm1: FormGroup; 
  result: any;
  public productId: any;
  public categorieId: any;
  product: Product;
	products: Product[];
  public aboutInfo: string;
  public aboutTitle: string;
  public companyPhone: string;
  public companyFix: string;
  public companyMail: string;
  public companyAdress: string;
  public logoApps : string;
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: ModalController,private formBuilder: FormBuilder, private contactService: ContactService,private router: Router, public popoverCtrl: PopoverController, private settingService: SettingService, private productService: ProductService) { 
    this.signUpForm1 = this.formBuilder.group({
      fullName: ['', [Validators.required]], 
      content: ['', [Validators.required]],
      articleId: ['', [Validators.required]]
  });
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
  ngOnInit() {
    this.settingService.find('app_name').subscribe(data => this.aboutTitle = data.value);
    this.settingService.find('app_about').subscribe(data => this.aboutInfo = data.value);
    this.settingService.find('company_phone').subscribe(data => this.companyPhone = data.value);
    this.settingService.find('company_fix').subscribe(data => this.companyFix = data.value);
    this.settingService.find('company_mail').subscribe(data => this.companyMail = data.value);
    this.settingService.find('company_adress').subscribe(data => this.companyAdress = data.value);
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
		});
    this.productService.find(this.productId).subscribe(data => this.product = data);
      this.productService.findRelated(this.categorieId, this.productId).subscribe(data => this.products = data);
      
  }
 
loadData(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    
    if (this.products.length == 1000) {
      event.target.disabled = true;
    }
  }, 500);
}
save1() {
  this.productService.create(this.signUpForm1.value).subscribe(data => {
      var resultR = JSON.parse(data);
      if(resultR.count == 0) {
        window.location.reload()
      } else {
          this.result = resultR
      }
  });
}
backToCat(){
  this.navCtrl.dismiss();
}
addCart(idProduct){
  this.navCtrl.dismiss();
  this.router.navigate(['/cart', { id:idProduct }]);
}
}

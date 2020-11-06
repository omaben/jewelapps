import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { SettingService } from '../../services/setting.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import {Router} from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage implements OnInit{
  signUpForm: FormGroup; 
  result: any;
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

  constructor(private navCtrl: ModalController, private formBuilder: FormBuilder, private contactService: ContactService,private router: Router, public popoverCtrl: PopoverController, private settingService: SettingService) { 
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
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
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
		});
    
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
backToCat(){
  this.navCtrl.dismiss();
}
}

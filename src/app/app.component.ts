import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingService } from '../services/setting.service';
import { UserInfo } from '../entities/userinfo.entities';
import { AccountService } from '../services/account.service';
import {Router} from '@angular/router'
import { CollectionService } from '../services/collection.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userInfo: UserInfo;
  public logoApps : string;
  public companyInstagram: string;
  public companyFb: string;
  public companyTwitter: string;
  public companyYoutube: string;
  public totalItems: number;
  public appPages = [
    {
      title: 'Inbox',
      url: '/categorie',
      icon: 'mail',
      subPages: [{ title: 'subtest1', url: '' },
      { title: 'subtest2', url: '' },
      { title: 'subtest3', url: '' },
      { title: 'subtest4', url: '' },
      { title: 'subtest5', url: '' },
      { title: 'subtest6', url: '' },
      { title: 'subtest7', url: '' },
      { title: 'subtest8', url: '' }]
  },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  loggedIn = false;
  collections = {};
  categories = {};
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private settingService: SettingService,
    private accountService: AccountService,
    private collectionService: CollectionService,
    private categoryService: CategoryService, 
  ) {
    this.initializeApp();
    if(sessionStorage.getItem('username') != null) {
      accountService.userInfo.username = sessionStorage.getItem('username');
    }
    this.userInfo = accountService.userInfo;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.accountService.userInfo.username = '';
    if(sessionStorage.getItem('username') != null) {
        sessionStorage.removeItem('username');
    }
}

  updateLoggedInStatus() {
    setTimeout(() => {
      return sessionStorage.getItem('username')
    }, 300);
  }
  listenForLoginEvents() {
      window.addEventListener('/home', () => {
        this.updateLoggedInStatus();
      });
  }
  ngOnInit() {
    this.listenForLoginEvents();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.settingService.find('company_fb').subscribe(data => this.companyFb = data.value);
    this.settingService.find('company_instagram').subscribe(data => this.companyInstagram = data.value);
    this.settingService.find('company_twitter').subscribe(data => this.companyTwitter = data.value);
    this.settingService.find('company_youtube').subscribe(data => this.companyYoutube = data.value);
    this.collectionService.findAllLevel().subscribe(data => this.collections = data);		
    this.categoryService.findAllLevel().subscribe(data => this.categories = data);	
    this.settingService.find('path_logo').subscribe(data => {
			this.logoApps = data.value;
    });
    this.totalItems=this.total_items()
  }
  async openSocial(network: string) {
    window.open(network)
  } 
  total_items(): number {
    let totalItems: number = 0;
    if(sessionStorage.getItem('cart') != null) {
      let cart = JSON.parse(sessionStorage.getItem('cart'));
      totalItems = cart.length;
    }
    return totalItems;
  }
  findByCollection = function (selected_id) {
    const parent = this.categories;
    var categoriesCollection=[];
    Array.prototype.forEach.call(parent, data => {
        if (selected_id == data.collectionId) { 
            Array.prototype.push.call(categoriesCollection,data)
            
        }
    });
    return categoriesCollection;
        
}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login';
import { PopoverPage } from '../about-popover/about-popover';
import { LoginPageRoutingModule } from './login-routing.module';
import { SettingService } from '../../services/setting.service';
import { HttpModule } from '@angular/http';
import { ContactService } from '../../services/contact.service';
import {RouterModule} from '@angular/router';
import { AccountService } from '../../services/account.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    LoginPageRoutingModule
  ],
  providers: [
    SettingService,
    ContactService,
    AccountService
    
    ],
  declarations: [LoginPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [LoginPage],
})
export class LoginPageModule {}

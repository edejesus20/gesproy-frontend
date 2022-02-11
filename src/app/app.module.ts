import { LOCALE_ID, NgModule } from '@angular/core';

import localEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs,'es')

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SplitterModule} from 'primeng/splitter';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {SidebarModule} from 'primeng/sidebar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ChartModule} from 'primeng/chart';
import { PrivateLayoutModule } from './layout/private-layout/private-layout.module';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';

import {DialogModule} from 'primeng/dialog';
import { PublicLayoutModule } from './layout/public-layout/public-layout.module';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ToastModule } from "primeng/toast";
import {TreeModule} from 'primeng/tree';
// import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {TableModule} from 'primeng/table'
import { SharedModule } from './modules/shared/shared.module';
import { CommonModule } from '@angular/common';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UserService } from './core/services/usuarios/user.service';
@NgModule({
  declarations: [
    AppComponent,
      
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PublicLayoutModule,
    PrivateLayoutModule, 
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,

    DividerModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    InputTextModule,
  
    CardModule,
    MenuModule,
    MessagesModule,
    MessageModule,
   
    SplitterModule,
    MenubarModule,
    AvatarGroupModule,
    AvatarModule,
    SidebarModule,
    PanelMenuModule,
    ChartModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    TreeModule,
    SharedModule,
    // VirtualScrollerModule,
    TableModule
    ,KeyFilterModule
    
    
  ],
  providers: [ConfirmationService,MessageService,CdkVirtualScrollViewport,
  {provide:LOCALE_ID, useValue:'es'}],
 
  bootstrap: [AppComponent]
})
export class AppModule { }

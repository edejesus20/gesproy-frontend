import { NgModule } from '@angular/core';
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

import { SharedModule } from './modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicLayoutModule,
    PrivateLayoutModule, 

    DividerModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
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
    SharedModule
    // VirtualScrollerModule,
    
    
    
  ],
  providers: [ConfirmationService,MessageService,CdkVirtualScrollViewport],
 
  bootstrap: [AppComponent]
})
export class AppModule { }

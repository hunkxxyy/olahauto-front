

import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import {Subscription} from'rxjs/RX';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';



import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { APIService } from './globals/services/API.service';
import { AuthService } from './globals/services/auth.service';
import { ErrorService } from './globals/services/error.service';
import { Functions } from './globals/services/functions.service';
import { ModalComponent } from './components/modal/modal/modal.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ItemGroupComponent } from './components/hunk-dragable-menus/menu-group/menu.component';
import {ItemGroupComboComponent} from'./components/hunk-dragable-menus/menu-combo/menu-combo.component';
import { ItemgroupsModalComponent } from './components/hunk-dragable-menus/menu-modal/menu-modal.component';
import {DragableItemComponent,DragDropItem } from './components/hunk-dragable-menus/dragable-item/dragable-item.component';
import {ItemgroupServiceService} from'./components/hunk-dragable-menus/itemgroup-service.service';
import {inputDelayComponent} from './globals/components/inputDelay.component';
import {HunkInput} from './components/hunkInput/hunkInput.component';
import {hunkDate} from './globals/pipes/hunkDate.pipe';
import {Hunkhtml} from './directives/hunkhtml.directive';
import {FocusIt} from './directives/focus-it.directive';
import {TextCompressPipe} from './globals/pipes/text-compress.pipe';
import { markPipe } from './globals/pipes/mark.pipe';
import {hunkCurrencyPipe} from './globals/pipes/hunkCurrency.pipe';

/*--------------------------------------HTML EDIT-------------------------------------- */
import { HeadComponent } from './components/head/head.component';
import { LeftMenuBarComponent } from './components/left-menu-bar/left-menu-bar.component';

import { FooterComponent } from './components/footer/footer.component';
import { SidebarModule } from 'ng2-sidebar';
import { MenuService } from './services/menu-service.service';
import { OneMenuComponent } from './components/left-menu-bar/one-menu/one-menu.component';


/*--------------------------------------HTML EDIT-------------------------------------- */
import { CKEditorModule } from 'ng2-ckeditor';
import { DynamicHtmlComponent } from './views/dynamic-html/dynamic-html.component';
import { HtmlcontentsService } from './globals/services/htmlcontents.service';
import { HunkToolbarComponentComponent } from './components/hunk-toolbar-component/hunk-toolbar-component.component';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import {FileUploaderComponent} from './components/ckeditor/file-uploader/file-uploader.component';
import { FileuploadTempComponent } from './views/fileupload-temp/fileupload-temp.component';
import {ProgressBarModule} from "ng2-progress-bar";
/*--------------------------------------FLEX SLIDER indexen-------------------------------------- */
import { FlexSliderComponent } from './components/flex-slider/flex-slider.component';
import { SetupFlexSliderComponent } from './admin/setup-flex-slider/setup-flex-slider.component';
/*------------------------------------------Serach------------------------------------------*/
import { SearchResultComponent } from './views/search-result/search-result.component';
/*------------------------------------------LOGIN------------------------------------------*/
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ExitComponent } from './admin/exit/exit.component';


@NgModule({
  declarations: [
    AppComponent,

    ModalComponent,
    ConfirmComponent,
    markPipe,
    hunkCurrencyPipe,
    ItemGroupComponent,
    ItemGroupComboComponent,
    ItemgroupsModalComponent,
    DragableItemComponent,
    inputDelayComponent,
    HunkInput,
    hunkDate,
    TextCompressPipe,
    Hunkhtml,
    FocusIt,
    HeadComponent,
    LeftMenuBarComponent,
    SearchInputComponent,
    FooterComponent,


    OneMenuComponent,

    DynamicHtmlComponent,
    HunkToolbarComponentComponent,
    CkeditorComponent,
    FileUploaderComponent,
    FileuploadTempComponent,
    UPLOAD_DIRECTIVES,
    FlexSliderComponent,
    FlexSliderComponent,
    SetupFlexSliderComponent,
    SearchResultComponent,
    ModalLoginComponent,
    ExitComponent

  ],
  imports: [
    routing ,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    SidebarModule,
    CKEditorModule,
    ProgressBarModule

  ],

  providers: [AuthService,APIService,ErrorService,Functions,ItemgroupServiceService,MenuService,HtmlcontentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
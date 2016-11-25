

import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import {Subscription} from'rxjs/RX';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

/* ---------------------------------------------------Imported Moduls--------------------------------------------------- */
import { SidebarModule } from 'ng2-sidebar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CKEditorModule } from 'ng2-ckeditor';
import {ProgressBarModule} from "ng2-progress-bar";
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import {ColorPickerModule} from 'angular2-color-picker';


/* ---------------------------------------------------Imported Moduls---END--------------------------------------------- */



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

import { MenuService } from './services/menu-service.service';
import { OneMenuComponent } from './components/left-menu-bar/one-menu/one-menu.component';


/*--------------------------------------HTML EDIT-------------------------------------- */

import { DynamicHtmlComponent } from './views/dynamic-html/dynamic-html.component';
import { HtmlcontentsService } from './globals/services/htmlcontents.service';
import { HunkToolbarComponentComponent } from './components/hunk-toolbar-component/hunk-toolbar-component.component';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import {FileUploaderComponent} from './components/ckeditor/file-uploader/file-uploader.component';
import { FileuploadTempComponent } from './views/fileupload-temp/fileupload-temp.component';

/*--------------------------------------FLEX SLIDER indexen-------------------------------------- */
import { FlexSliderComponent } from './components/flex-slider/flex-slider.component';
import { SetupFlexSliderComponent } from './admin/setup-flex-slider/setup-flex-slider.component';
/*------------------------------------------Serach------------------------------------------*/
import { SearchResultComponent } from './views/search-result/search-result.component';
/*------------------------------------------LOGIN------------------------------------------*/
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ExitComponent } from './admin/exit/exit.component';
/*------------------------------------------Termekek-Admin------------------------------------------*/

import { TermekekComponent } from './admin/termekek/termekek.component';
import { TermekListaComponent } from './admin/termekek/termek-lista/termek-lista.component';
import { NewTermekComponent } from './admin/termekek/new-termek/new-termek.component';
import { ComboCsoportComponent } from './components/combo-base/combo-csoport/combo-csoport.component';
import { ComboAlcsoportComponent } from './components/combo-base/combo-alcsoport/combo-alcsoport.component';
import { ComboBaseComponent } from './components/combo-base/comboBase.component';
import { DynamicRoutesComponent } from './views/dynamic-routes/dynamic-routes.component';

import { TermekekViewComponent } from './views/termekek-view/termekek-view.component';
import { EgytermekComponent } from './views/egytermek/egytermek.component';
import { EgytermekFullComponent } from './views/egytermek-full/egytermek-full.component';


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
    ExitComponent,

    TermekekComponent,
    TermekListaComponent,
    NewTermekComponent,
    ComboBaseComponent,

    ComboCsoportComponent,
    ComboAlcsoportComponent,
    DynamicRoutesComponent,
    TermekekComponent,
    TermekekViewComponent,
    EgytermekComponent,
    EgytermekFullComponent

  ],
  imports: [
    routing ,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    SidebarModule,
    CKEditorModule,
    ProgressBarModule,
    ColorPickerModule

  ],

  providers: [AuthService,APIService,ErrorService,Functions,ItemgroupServiceService,MenuService,HtmlcontentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
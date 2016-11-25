import { Routes , RouterModule} from '@angular/router';
import { ItemGroupComponent } from './components/hunk-dragable-menus/menu-group/menu.component';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';

import { DynamicHtmlComponent } from './views/dynamic-html/dynamic-html.component';
import { DynamicRoutesComponent } from './views/dynamic-routes/dynamic-routes.component';
import { SetupFlexSliderComponent } from './admin/setup-flex-slider/setup-flex-slider.component';
import { SearchResultComponent } from './views/search-result/search-result.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { TermekekComponent } from './admin/termekek/termekek.component.ts';
import { NewTermekComponent } from './admin/termekek/new-termek/new-termek.component.ts';
import { EgytermekFullComponent } from './views/egytermek-full/egytermek-full.component';
import { ExitComponent } from './admin/exit/exit.component';



import { FileuploadTempComponent } from './views/fileupload-temp/fileupload-temp.component';
const  APP_ROUTES=[

 {path:'settings/menu',component:ItemGroupComponent},
 {path:'admin/routes',component:ItemGroupComponent},
 {path:'admin/termekek/list',component:TermekekComponent},
 {path:'admin/termekek/new',component:NewTermekComponent},
 {path:'admin/termekek',component:TermekekComponent},
 {path:'admin/termekek/modify/:id',component:NewTermekComponent},
 {  path:'admin',component:ModalLoginComponent},
 {  path:'view/fileupload',component:FileuploadTempComponent},
 {  path:'termekview/:id',component:EgytermekFullComponent},
 {  path:'searchresult/:id',component:SearchResultComponent},
 {  path:'admin/banner',component:SetupFlexSliderComponent},
 {  path:'auth/destroy',component:ExitComponent},
 {  path:'',component:DynamicHtmlComponent},

 {  path:'**',component:DynamicRoutesComponent},

 /*{path: '', redirectTo: '/settings/menu', pathMatch: 'full'},*/
];
export const routing = RouterModule.forRoot(APP_ROUTES, { useHash: true });
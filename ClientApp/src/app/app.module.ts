import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories.component';
import { AccessoriesListComponent } from './accessories/accessoriesList.component';
//import { ClothesService } from './clothes';
import { AppComponent } from './app.component';
import { ClothesComponent } from './clothes/clothes.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ClothesComponent,
    AccessoriesComponent,
    AccessoriesListComponent,
    LoginComponent,
    //ClothesService
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'clothes', component: ClothesComponent },
      { path: 'accessories', component: AccessoriesComponent },
      { path: 'accessoriesList', component: AccessoriesListComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

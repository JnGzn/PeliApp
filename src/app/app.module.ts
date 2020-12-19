// import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AntonComponent } from './anton/anton.component';
import { OrganComponent } from './anton/organ/organ.component';

@NgModule({
  declarations: [
    AppComponent,
    AntonComponent,
    OrganComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

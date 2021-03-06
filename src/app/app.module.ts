import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AntonComponent } from './anton/anton.component';
import { OrganComponent } from './anton/organ/organ.component';
import { AppRoutingModule } from './app-routing.module';
import { PeredComponent } from './pered/pered.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RenderAnchorDirective } from './pered/anchor.directive';

@NgModule({
  declarations: [
    AppComponent,
    AntonComponent,
    OrganComponent,
    PeredComponent,
    RenderAnchorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

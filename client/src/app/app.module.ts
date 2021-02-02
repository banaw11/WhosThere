import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinFormComponent } from './forms/join-form/join-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './home/home.component';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbBadgeModule, NbIconModule, NbActionsModule, NbCardModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    JoinFormComponent,
    ChatComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    HttpClientModule,
    NbSidebarModule,
    NbButtonModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbEvaIconsModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbCardModule,
    NbRadioModule,
    NbSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    NbThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

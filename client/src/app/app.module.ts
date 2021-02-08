import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinFormComponent } from './components/forms/join-form/join-form.component';
import { AvatarFormComponent } from './components/forms/avatar-form/avatar-form.component';
import { NickFormComponent } from './components/forms/nick-form/nick-form.component';
import { AvatarDialogComponent } from './components/windows/avatar-dialog/avatar-dialog.component';
import { NickDialogComponent } from './components/windows/nick-dialog/nick-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './home/home.component';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbBadgeModule, NbIconModule, 
  NbActionsModule, NbCardModule, NbRadioModule, NbSelectModule, NbInputModule, NbSpinnerModule, NbChatModule, NbAlertModule, NbFormFieldModule, NbUserModule, 
  NbMenuModule, NbWindowModule, NbContextMenuModule, NbToastrModule, NbPopoverModule, NbTabsetModule, NbDialogModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatCardComponent } from './components/chat/chat-card/chat-card.component';
import { FiltersFormComponent } from './components/forms/filters-form/filters-form.component';
import { CloseDialogComponent } from './components/windows/close-dialog/close-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    JoinFormComponent,
    ChatComponent,
    HomeComponent,
    ChatCardComponent,
    AvatarFormComponent,
    NickFormComponent,
    AvatarDialogComponent,
    NickDialogComponent,
    FiltersFormComponent,
    CloseDialogComponent
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
    NbSelectModule,
    NbInputModule,
    NbSpinnerModule,
    NbChatModule,
    NbAlertModule,
    NbFormFieldModule,
    NbUserModule,
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    NbContextMenuModule,
    NbToastrModule.forRoot(),
    NbPopoverModule,
    NbTabsetModule,
    NbDialogModule.forRoot()
    
  ],
  exports: [
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    NbThemeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

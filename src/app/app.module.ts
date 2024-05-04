import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module'; // Import AppRoutingModule
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {TaskListComponent} from './task-list/task-list.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {EditTaskDialogComponent} from "./task-list/edit-task-dialog/edit-task-dialog.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    EditTaskDialogComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

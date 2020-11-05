import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMasterComponent } from './quiz-master/quiz-master.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    QuizMasterComponent,
    QuizEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

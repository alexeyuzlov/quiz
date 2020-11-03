import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizMasterComponent } from './quiz-master/quiz-master.component';

const routes: Routes = [
  {
    path: 'master',
    component: QuizMasterComponent
  },
  {
    path: 'create',
    component: QuizEditComponent
  },
  {
    path: 'edit/:id',
    component: QuizEditComponent
  },
  {
    path: '',
    redirectTo: 'master',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

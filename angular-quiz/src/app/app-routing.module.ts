import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizMasterComponent } from './quiz-master/quiz-master.component';
import { ArticlesComponent } from './articles.component';

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
    path: 'articles',
    component: ArticlesComponent
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
export class AppRoutingModule {
}

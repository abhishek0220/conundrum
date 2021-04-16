import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { QuesComponent } from './components/ques/ques.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  {
    path:'',
    component: QuizComponent
  },
  {
    path:'question',
    component: QuesComponent
  },
  {
    path:'leaderboard',
    component: LeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

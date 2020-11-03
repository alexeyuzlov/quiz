import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-master',
  templateUrl: './quiz-master.component.html',
  styleUrls: ['./quiz-master.component.scss']
})
export class QuizMasterComponent implements OnInit, OnDestroy {
  public questions: IQuestion[] = [];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    console.info('Start component quiz-master');

    // fetch('localhost:3000/questions').then(question)

    this._http.get('/api/questions').subscribe(
      (questions: IQuestion[]) => {
        this.questions = questions;
      }
    )
  }

  ngOnDestroy() {
    console.info('quiz master destroyed');
  }
}

interface IQuestion {
  id: number;
  text: string;
  answer: string;
}
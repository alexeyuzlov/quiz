import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IQuestion, QuestionService } from '../question.service';
import { Subscription } from 'rxjs';
import { ConfirmService } from '../confirm.service';

@Component({
  selector: 'app-quiz-master',
  templateUrl: './quiz-master.component.html',
  styleUrls: ['./quiz-master.component.scss']
})
export class QuizMasterComponent implements OnInit, OnDestroy {
  public questions: IQuestion[] = [];

  public loading = false;

  private _loadSub: Subscription;

  constructor(
    private readonly _questionService: QuestionService,
    private readonly _confirmService: ConfirmService,
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  public ngOnDestroy() {
    this._loadSub.unsubscribe();
  }

  public load() {
    this.loading = true;
    this.questions = [];
    this._loadSub = this._questionService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      (questions: IQuestion[]) => this.questions = questions
    );
  }

  public remove(questionId: number) {
    this._confirmService.show().then(
      () => {
        this.loading = true;
        this._questionService.remove(questionId).pipe(
          finalize(() => this.loading = false)
        ).subscribe(
          () => {
            this.questions = this.questions.filter((q) => q.id !== questionId);
          }
        );
      }
    );
  }
}

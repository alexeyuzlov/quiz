import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion, QuestionService } from '../question.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  public form: FormGroup;

  public loading = false;

  private readonly _id: number;

  constructor(
    private _questionService: QuestionService,
    private _router: Router,
    route: ActivatedRoute,
  ) {
    this._id = +route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    });

    this.init();
  }

  public init() {
    if (!this._id) {
      return;
    }

    this._questionService.find(this._id).subscribe(
      (question: IQuestion) => this.form.patchValue(question)
    );
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const fn = !this._id
      ? this._questionService.create(this.form.value)
      : this._questionService.edit(this._id, this.form.value);

    this.loading = true;
    fn.subscribe(
      () => {
        this._router.navigate(['/master']);
      },
      (err: Error) => {
        this._validate(err);
        return err;
      }
    );
  }

  // todo should be part of common rest service
  private _validate(err) {
    if (err instanceof HttpErrorResponse) {
      const formError = err.error.data;

      for (const key in formError) {
        if (formError.hasOwnProperty(key)) {
          console.info(key);
          const control = this.form.get(key);
          if (!control) {
            continue;
          }

          control.setErrors({server: formError[key]});
        }
      }
    }
  }
}

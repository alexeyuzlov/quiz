import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  public form: FormGroup;
  public id: number;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    });

    this.id = +this._route.snapshot.paramMap.get('id');
    if (!this.id) {
      // console.info('New record');
    } else {
      this._http.get(`/api/questions/${this.id}`).subscribe(
        (question: any) => {
          this.form.patchValue(question);
        }
      )
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    let fn;
    if (!this.id) {
      fn = this._http.post('/api/questions', this.form.value)
    } else {
      fn = this._http.put(`/api/questions/${this.id}`, this.form.value)
    }

    fn.subscribe(
      () => {
        this._router.navigate(['/master']);
      }
    )
  }
}

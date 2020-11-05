import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO you can create common RestService with map response.data and handle errors aswell
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  get api() {
    return '/api/questions/';
  }

  constructor(
    private _http: HttpClient
  ) {
  }

  getAll(): Observable<IQuestion[]> {
    return this._http.get(this.api).pipe(
      // tap(console.info),
      map((response: IResponse<IQuestion[]>) => response.data)
    );
  }

  find(id: number): Observable<IQuestion> {
    return this._http.get(`${this.api}${id}`).pipe(
      map((response: IResponse<IQuestion>) => response.data)
    );
  }

  remove(id: number): Observable<void> {
    return this._http.delete<void>(`${this.api}${id}`);
  }

  create(body: any): Observable<void> {
    return this._http.post<void>(this.api, body);
  }

  edit(id: number, body): Observable<void> {
    return this._http.put<void>(`${this.api}${id}`, body);
  }
}

export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}

export enum ResponseStatus {
  Success = 'success',
  Fail = 'fail',
}

export interface IResponse<T = any> {
  data: T;
  message: string;
  status: ResponseStatus;
}

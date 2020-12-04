import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  get api() {
    return '/api/public/articles/';
  }

  constructor(
    private _http: HttpClient
  ) {
  }

  search(body: ArticleSearchRequest): Observable<ICursor<IArticle>> {
    const endpoint: string = `${this.api}search`;
    return this._http.post(endpoint, body).pipe(
      // tap(console.info),
      map((response: any) => response.data),
      map((data) => {
        console.info(data);

        return {
          data: data.data.map(toArticle),
          cursor: data.cursor
        };
      })
    );
  }
}

export interface ArticleSearchRequest {
  sort?: {
    field: 'id' | 'created_at' | 'updated_at';
    asc: boolean;
  };

  pageSize?: number;

  cursor: any;
}

export interface ICursor<T> {
  data: T[];
  cursor?: any;
}

export interface IArticle {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toArticle(data): IArticle {
  return {
    ...data,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

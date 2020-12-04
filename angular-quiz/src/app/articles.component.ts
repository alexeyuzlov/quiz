import { Component, OnInit } from '@angular/core';
import { ArticleSearchRequest, ArticlesService, IArticle } from './articles.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {
  public articles: IArticle[] = [];

  public cursor: any;

  public loading: boolean;

  constructor(
    private _articlesService: ArticlesService
  ) {
  }

  public ngOnInit() {
    this._search();
  }

  public next() {
    this._search();
  }

  private _search() {
    const body: ArticleSearchRequest = {
      cursor: this.cursor,
      pageSize: 2,
      sort: {
        field: 'updated_at',
        asc: true,
      }
    };

    this.loading = true;
    this._articlesService.search(body).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      (data) => {
        console.info(data);

        if (body.sort.asc) {
          this.articles = [...this.articles, ...data.data];
        } else {
          this.articles = [...data.data, ...this.articles];
        }

        this.cursor = data.cursor;
      }
    );
  }
}

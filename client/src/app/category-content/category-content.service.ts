import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryContentService {

  constructor(private http: HttpClient) { }

  getCategoryAndThemes(idCategory): Observable<any[]>{
    let category = this.http.get('http://localhost:8000/api/categories/'+idCategory)
    let themes = this.http.get('http://localhost:8000/api/themes-by-category/'+idCategory)

    return forkJoin([category, themes])
  }
}

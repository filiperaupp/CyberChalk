import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeContentService {

  constructor(private http: HttpClient) { }

  getMaterial(idTheme): Observable<any[]> {
    let contents = this.http.get('http://localhost:8000/api/contents-by-theme/'+idTheme)
    let courses = this.http.get('http://localhost:8000/api/courses-by-theme/'+idTheme)
    let theme = this.http.get('http://localhost:8000/api/themes/'+idTheme)

    return forkJoin([contents, courses, theme])
  }  

  like(newLike){
    return this.http.post('http://localhost:8000/api/like',newLike)
  }

  unlike(removeLike){
    return this.http.post('http://localhost:8000/api/unlike', removeLike)
  }

}

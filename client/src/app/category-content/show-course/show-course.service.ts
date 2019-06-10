import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowCourseService {

  constructor(private http: HttpClient) { }

  getCourseAndContents(idCourse){
    let course = this.http.get('http://localhost:8000/api/courses/'+idCourse)
    let contents = this.http.get('http://localhost:8000/api/contents-by-course-is-done/'+idCourse)

    return forkJoin([course, contents])
  }

  contentDone(data){
    return this.http.post('http://localhost:8000/api/progress/',data)
  }

  contentUndo(data){
    return this.http.post('http://localhost:8000/api/progress-undo',data)
  }
}

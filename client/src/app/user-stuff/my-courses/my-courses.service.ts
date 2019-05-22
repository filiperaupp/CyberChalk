import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8000/api/courses')
  }

  post(course){
    return this.http.post('http://localhost:8000/api/courses', course)
  }

  getById(id){
    return this.http.get('http://localhost:8000/api/courses/'+id)
  }

  update(id,course){
    return this.http.put('http://localhost:8000/api/courses/'+id, course)
  }

  delete(id){
    return this.http.delete('http://localhost:8000/api/courses/'+id)
  }
}

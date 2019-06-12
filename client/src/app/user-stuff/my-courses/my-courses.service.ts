import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {

  constructor(private http: HttpClient) { }

  getCoursesByUser(){
    return this.http.get('http://localhost:8000/api/courses-by-user')
  }
  
  post(course){
    return this.http.post('http://localhost:8000/api/courses', course)
  }
  
  getById(id){
    return this.http.get('http://localhost:8000/api/courses/'+id)
  }

  getCourseFullContents(idCourse){
    return this.http.get('http://localhost:8000/api/course-full-contents/'+idCourse)
  }
  
  update(id,course){
    return this.http.put('http://localhost:8000/api/courses/'+id, course)
  }
  
  delete(id){
    return this.http.delete('http://localhost:8000/api/courses/'+id)
  }
  
  //Contents to course
  addContentToCourse(content){
    return this.http.post('http://localhost:8000/api/add-content-in-course/', content)
  }
  getContentsByCourseId(idCourse){
    return this.http.get('http://localhost:8000/api/contents-by-course/'+ idCourse)
  }
  deleteContent(idContent){
    return this.http.delete('http://localhost:8000/api/contents-by-course/'+ idContent)
  }
  changePosition(newLeftId,newRightId) {
    return this.http.post('http://localhost:8000/api/change-position/', [newLeftId,newRightId])
  }
  //pending status
  sendToApprovre(idCourse,course) {
    return this.http.post('http://localhost:8000/api/send-to-approve/'+idCourse,course)
  }
  
  //change status by admin
  changeStatus(idCourse, status){
    return this.http.post('http://localhost:8000/api/change-status/'+idCourse, status)
  }
  //admin use
  getAll(){
    return this.http.get('http://localhost:8000/api/courses')
  }
  
}

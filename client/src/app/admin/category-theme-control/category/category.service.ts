import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8000/api/categories')
  }

  create(category){
    return this.http.post('http://localhost:8000/api/categories', category)
  }

  delete(id){
    return this.http.delete('http://localhost:8000/api/categories/' + id)
  }

  update(id,category){
    return this.http.put('http://localhost:8000/api/categories/'+id, category)
  }
}

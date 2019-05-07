import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8000/api/themes')
  }

  post(newTheme){
    return this.http.post('http://localhost:8000/api/themes', newTheme)
  }

  delete(id){
    return this.http.delete('http://localhost:8000/api/themes/' + id)
  }

  update(id,theme){
    return this.http.put('http://localhost:8000/api/themes/'+id, theme)
  }
}

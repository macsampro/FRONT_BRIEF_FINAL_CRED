import { Injectable } from '@angular/core';
import { Categories } from '../models/categories';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categorie: Categories[] = [];

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('http://localhost:3000/categories', {
      headers: this.getHeaders(),
    });
  }

  getCategorieById(id: number): Observable<Categories> {
    return this.http.get<Categories>(`http://localhost:3000/categories/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addCategori(categories: Categories): Observable<Categories> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Categories>(
      'http://localhost:3000/categories',
      categories,
      { headers: headers }
    );
  }
}

import { Injectable } from '@angular/core';
import { Produits } from '../models/produits';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  produit: Produits[] = [];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  getAllProduits(): Observable<Produits[]> {
    return this.http.get<Produits[]>('http://localhost:3000/produits', {
      headers: this.getHeaders(),
    });
  }

  getProduitById(id: number): Observable<Produits> {
    return this.http.get<Produits>(`http://localhost:3000/produits/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addProduits(produits: Produits): Observable<Produits> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Produits>(
      'http://localhost:3000/Produits',
      produits,
      { headers: headers }
    );
  }

  modifyProduit(
    id: number,
    updateData: Partial<Produits>
  ): Observable<Produits> {
    console.log(updateData)
    console.log(id)
    console.log(typeof id)
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.patch<Produits>(
      `http://localhost:3000/Produits/${id}`,
      updateData,
      { headers: this.getHeaders() }
    );
  }

  deleteProduits(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/produits/${id}`, {
      headers: headers,
    });
  }
}

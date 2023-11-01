import { Injectable } from '@angular/core';
import { Utilisateurs } from '../models/utilisateurs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  utilisateur: Utilisateurs[] = [];

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  login(nom: string, password: string) {
    return this.http
      .post<{ access_token: string; id_utilisateur: string; nom:string }>(
        'http://localhost:3000/api/auth/login',
        { nom, password }
      )
      .pipe(
        tap((response) => {
          console.log(
            'REGARDE CA POUR VOIR COMMENT TU RECOIS ID DE LA PERS CONNECTER',
            response.id_utilisateur
          );

          localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('nom', response.nom);

          if (response.id_utilisateur && Number.isFinite(response.id_utilisateur)) {
            localStorage.setItem('id_utilisateur', response.id_utilisateur);
            
            console.log(
              'Id utilisateur stocké:',
              localStorage.getItem('id_utilisateur')
            );
          }
        })
      );
  }
}

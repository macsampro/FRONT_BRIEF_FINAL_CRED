import { Injectable } from '@angular/core';
import { Utilisateurs } from '../models/utilisateurs';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private bddUrl = 'http://localhost:3000'
  currentUser!: Utilisateurs;
  isConnected: boolean = false;

  constructor(private http: HttpClient) { }

  login(nom: string, password: string) {
    return this.http.post<{ accessToken: string, id_utilisateur: number, sub: string }>(this.bddUrl + '/auth/login', { nom, password })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.accessToken);
          if (response.id_utilisateur && Number.isFinite(response.id_utilisateur)) {
            localStorage.setItem('id_utilisateur', `${response.id_utilisateur}`);
            console.log('Id utilisateur stocké:', localStorage.getItem('id_utilisateur'))
            console.log(typeof response.id_utilisateur)
          } else {
            console.error('mauvais id utilisateur');
          }
        })
      );
  }

  addUser(utilisateur: Utilisateurs): Observable<Utilisateurs> {
    return this.http.post<Utilisateurs>(
      'http://localhost:3000/auth/register',
      utilisateur
    );
  }

  checkConnexion(): boolean {
    this.isConnected = !!localStorage.getItem('access_token');
    return this.isConnected;
  }


}

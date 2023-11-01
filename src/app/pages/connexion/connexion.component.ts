import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  nom!: string;
  password!: string;
  connexion!: FormGroup;

  constructor(
    private authService:AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    localStorage.clear();
    this.initialForm();

  }

  private initialForm() {
    this.connexion = this.fb.group({
      nom: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnConnect() {
    if (this.connexion.valid) {
      let nom = this.connexion.value.nom;
      let password = this.connexion.value.password;
      this.authService.login(nom, password).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            // Stocker le token dans le localStorage
            localStorage.setItem('access_token', response.accessToken);

            console.log('Connexion réussie et token stocké!');
            this.router.navigate(['mon-stock']);
          } else {
            console.error('Token non reçu dans la réponse.');
          }
        },
        error: (error: any) => {
          alert('Erreur de saisie');
          console.error('Erreur lors de la connexion:', error);
        },
      });
    }
  }
}

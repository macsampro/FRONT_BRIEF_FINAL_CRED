// new-produit.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent {
  produitForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private produitsService: ProduitsService) {
    this.produitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [0, Validators.min(0)],
      quantite: [0, Validators.min(0)],
    });
  }

  ajouterProduit() {
    if (this.produitForm.valid) {
      const newProduct = this.produitForm.value;
      this.produitsService.addProduits(newProduct).subscribe(() => {
        // Redirigez l'utilisateur vers MonStockComponent après l'ajout
        // Vous pouvez utiliser la route ou une fonction de navigation du router
        // Par exemple, si vous avez importé Router, utilisez router.navigate(['/mon-stock']);
      });
    }
  }
}

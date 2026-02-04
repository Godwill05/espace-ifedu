import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';
import { WHATSAPP_PHONE8NUMBER } from '../../env/en';


@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent {
  today = new Date();
  tomorrow = new Date(this.today);

  constructor(private translationService: TranslationService) {

  }

  reserveTable(numberOfGuests: number,) {
  const lang = this.translationService.getCurrentLang();

  let message = '';

  if (lang === 'fr') {
    message = `Bonjour, je souhaite réserver une table à l'ESPACE IFEDU.\n` +
              `Nombre de personnes: ${numberOfGuests}\n` +
              `Date: ${this.today.toISOString().split('T')[0]}\n` +
              `Heure: \n` +
              `Pourriez-vous me confirmer la disponibilité ?`;
  } else {
    message = `Hello, I would like to book a table at ESPACE IFEDU.\n` +
              `Number of guests: ${numberOfGuests}\n` +
              `Date: ${this.today.toISOString().split('T')[0]}\n` +
              `Time: \n` +
              `Could you confirm availability?`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE8NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}
  // Variable pour contrôler l'affichage du modal
  isMenuModalOpen: boolean = false;

  // Variable pour suivre le chargement de l'image
  isImageLoaded: boolean = false;

  // Ouvrir le modal
  openMenuModal(): void {
    this.isMenuModalOpen = true;
    this.isImageLoaded = false;
    // Empêcher le défilement du body quand le modal est ouvert
    document.body.style.overflow = 'hidden';
  }

  // Fermer le modal
  closeMenuModal(): void {
    this.isMenuModalOpen = false;
    // Réactiver le défilement du body
    document.body.style.overflow = 'auto';
  }

  // Quand l'image est chargée
  onImageLoad(): void {
    this.isImageLoaded = true;
  }

  // Télécharger le menu
  downloadMenu(): void {
    // Créer un lien temporaire pour télécharger l'image
    const link = document.createElement('a');
    link.href = 'Menu.pdf'; // Même chemin que l'image affichée
    link.download = 'menu-restaurant-ifedu.pdf'; // Nom du fichier téléchargé
    link.click();
  }

  // Écouter la touche Échap pour fermer le modal
  // Écouter la touche Échap pour fermer le modal - CORRECTION ICI
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isMenuModalOpen && event.key === 'Escape') {
      this.closeMenuModal();
    }
  }

  // Version alternative plus spécifique si vous préférez :
  // @HostListener('window:keydown.escape', ['$event'])
  // onEscapeKey(event: KeyboardEvent): void {
  //   if (this.isMenuModalOpen) {
  //     this.closeMenuModal();
  //   }
  // }

  // Écouter les clics en dehors du modal
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Cette fonctionnalité est déjà gérée dans le template
  }


}

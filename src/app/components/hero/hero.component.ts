import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';
import { WHATSAPP_PHONE8NUMBER } from '../../env/en';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  arrivalDate = '';
  departureDate = '';
  guests = 1;
  isLoading = false;

  constructor(private translationService: TranslationService) {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.arrivalDate = today.toISOString().split('T')[0];
    this.departureDate = tomorrow.toISOString().split('T')[0];
  }

  decreaseGuests() {
    if (this.guests > 1) {
      this.guests--;
    }
  }

  increaseGuests() {
    if (this.guests < 3) {
      this.guests++;
    }
  }

  checkAvailability() {
    this.isLoading = true;

    // Get current language
    const lang = this.translationService.getCurrentLang();

    // Prepare message based on language
    let message = '';
    if (lang === 'fr') {
      message = `Bonjour, je souhaite réserver à l'ESPACE IFEDU.\n` +
                `Date d'arrivée: ${this.arrivalDate}\n` +
                `Date de départ: ${this.departureDate}\n` +
                `Nombre de personnes: ${this.guests}\n` +
                `Pourriez-vous me dire quelles chambres sont disponibles ?`;
    } else {
      message = `Hello, I would like to book at ESPACE IFEDU.\n` +
                `Arrival Date: ${this.arrivalDate}\n` +
                `Departure Date: ${this.departureDate}\n` +
                `Number of Guests: ${this.guests}\n` +
                `Could you tell me which rooms are available?`;
    }

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE8NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}

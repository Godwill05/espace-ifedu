import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';
import { WHATSAPP_PHONE8NUMBER } from '../../env/en';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  // Date pour le message WhatsApp
  today = new Date();
  tomorrow = new Date(this.today);

  // Configuration des chambres
  roomTypes = [
    {
      id: 1,
      type: 'studio',
      nameKey: 'rooms.studio.title',
      descriptionKey: 'rooms.studio.description',
      price: 5,
      priceCFA: 3000, // 299€ ≈ 195.000 FCFA
      image: '486677437_1182687573863905_205916896634320990_n.jpg',
      gallery: [
        '486755343_1182687487197247_3144273812044121498_n.jpg',
        '485986216_1182687490530580_4972013875046371112_n.jpg',
        '486024792_1182687473863915_5339805198809417394_n.jpg'
      ],
      featuresCount: 5,
      isValentin: false // Pour animation spéciale
    },
    {
      id: 2,
      type: 'suite',
      nameKey: 'rooms.suite.title',
      descriptionKey: 'rooms.suite.description',
      price: 25,
      priceCFA: 15000, // 599€ ≈ 392.000 FCFA
      image: '486147921_1182687353863927_6257500816751732111_n.jpg',
      gallery: [
        '486147921_1182687353863927_6257500816751732111_n.jpg',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        '486147921_1182687353863927_6257500816751732111_n.jpg'
      ],
      featuresCount: 7,
      isValentin: true // Pour animation Saint-Valentin
    },
    {
      id: 3,
      type: 'presidentielle',
      nameKey: 'rooms.presidentielle.title',
      descriptionKey: 'rooms.presidentielle.description',
      price: 75,
      priceCFA: 45000, // 1299€ ≈ 852.000 FCFA
      image: '487092432_1182687350530594_2638348298049457121_n.jpg',
      gallery: [
        'PHOTO-2026-02-02-15-01-35_2.jpg',
        'PHOTO-2026-02-02-15-01-33_4.jpg',
        '487092432_1182687350530594_2638348298049457121_n.jpg'
      ],
      featuresCount: 6,
      isValentin: false
    }
  ];

  // Gallerie active
  activeGallery: string[] = [];
  activeRoomIndex = 0;

  // Animation
  valentinHearts: any[] = [];
  prestigeStars: any[] = [];

  constructor(private translationService: TranslationService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit() {
    this.setActiveGallery(0);
    this.generateValentinAnimation();
    this.generatePrestigeAnimation();
  }

  setActiveGallery(index: number) {
    this.activeRoomIndex = index;
    this.activeGallery = this.roomTypes[index].gallery;
  }
  get hasValentinRoom(): boolean {
  return this.roomTypes?.some(room => room.isValentin) ?? false;
}

  // Message WhatsApp pour réservation
  bookRoom(room: any) {
    const lang = this.translationService.getCurrentLang();
    const arrivalDate = this.today.toISOString().split('T')[0];
    const departureDate = this.tomorrow.toISOString().split('T')[0];

    let message = '';

    if (lang === 'fr') {
      message = `Bonjour, je souhaite réserver la ${this.translationService.translate(room.nameKey)} à l'ESPACE IFEDU.\n` +
                `Type: ${this.translationService.translate(room.nameKey)}\n` +
                `Date d'arrivée: ${arrivalDate}\n` +
                `Date de départ: ${departureDate}\n` +
                `Prix: ${room.price}€ (${room.priceCFA.toLocaleString()} FCFA)\n` +
                `Pourriez-vous me confirmer la disponibilité ?`;
    } else {
      message = `Hello, I would like to book the ${this.translationService.translate(room.nameKey)} at ESPACE IFEDU.\n` +
                `Type: ${this.translationService.translate(room.nameKey)}\n` +
                `Arrival Date: ${arrivalDate}\n` +
                `Departure Date: ${departureDate}\n` +
                `Price: €${room.price} (${room.priceCFA.toLocaleString()} CFA)\n` +
                `Could you confirm availability?`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE8NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  // Génération animation Saint-Valentin
  generateValentinAnimation() {
    this.valentinHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }

  // Génération animation Prestige
  generatePrestigeAnimation() {
    this.prestigeStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 10,
      duration: 1 + Math.random() * 3
    }));
  }
}

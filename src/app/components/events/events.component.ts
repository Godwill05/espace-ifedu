import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';
import { WHATSAPP_PHONE8NUMBER } from '../../env/en';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  // Types d'événements

  eventTypes = [
    {
      id: 1,
      nameKey: 'events.weddings',
      icon: 'fa-solid fa-champagne-glasses',
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      capacity: 300,
      descriptionKey: 'events.weddingsDescription'
    },
    {
      id: 2,
      nameKey: 'events.conferences',
      icon: 'fa-solid fa-microphone',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      capacity: 500,
      descriptionKey: 'events.conferencesDescription'
    },
    {
      id: 3,
      nameKey: 'events.galas',
      icon: 'fa-solid fa-masks-theater',
      color: 'from-purple-500 to-violet-500',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      capacity: 250,
      descriptionKey: 'events.galasDescription'
    },
    {
      id: 4,
      nameKey: 'events.seminars',
      icon: 'fa-solid fa-graduation-cap',
      color: 'from-green-500 to-emerald-500',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      capacity: 200,
      descriptionKey: 'events.seminarsDescription'
    }
  ];

  // Équipements avec icônes Font Awesome
  equipments = [
    {
      icon: 'fa-solid fa-film',
      nameKey: 'events.equipment.audioVideo',
      descriptionKey: 'events.equipment.audioVideoDesc'
    },
    {
      icon: 'fa-solid fa-lightbulb',
      nameKey: 'events.equipment.lighting',
      descriptionKey: 'events.equipment.lightingDesc'
    },
    {
      icon: 'fa-solid fa-chair',
      nameKey: 'events.equipment.furniture',
      descriptionKey: 'events.equipment.furnitureDesc'
    },
    {
      icon: 'fa-solid fa-wifi',
      nameKey: 'events.equipment.wifi',
      descriptionKey: 'events.equipment.wifiDesc'
    },
    {
      icon: 'fa-solid fa-palette',
      nameKey: 'events.equipment.decoration',
      descriptionKey: 'events.equipment.decorationDesc'
    },
    {
      icon: 'fa-solid fa-utensils',
      nameKey: 'events.equipment.catering',
      descriptionKey: 'events.equipment.cateringDesc'
    }
  ];

  // Modal state
  showModal = false;
  modalMessage = '';
  defaultMessages = {
    fr: "Bonjour, je souhaite obtenir des informations pour organiser un événement à l'ESPACE IFEDU.\n\nType d'événement : \nDate prévue : \nNombre de participants : \nBudget estimé : \n\nMerci de me contacter pour discuter des possibilités.",
    en: "Hello, I would like to get information about organizing an event at ESPACE IFEDU.\n\nEvent type: \nPlanned date: \nNumber of participants: \nEstimated budget: \n\nPlease contact me to discuss the possibilities."
  };

  // Animation states
  activeType: number | null = null;
  hoveredEquipment: number | null = null;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.setDefaultMessage();
  }

  setDefaultMessage() {
    const lang = this.translationService.getCurrentLang();
    this.modalMessage = this.defaultMessages[lang as keyof typeof this.defaultMessages];
  }

  // Ouvrir modal de contact
  openContactModal() {
    this.setDefaultMessage();
    this.showModal = true;
    // Empêcher le défilement du body
    document.body.style.overflow = 'hidden';
  }

  // Fermer modal
  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  // Envoyer message via WhatsApp
  sendMessage() {
    const encodedMessage = encodeURIComponent(this.modalMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE8NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }

  // Demander un devis spécifique
  requestQuote(eventType: any) {
    const lang = this.translationService.getCurrentLang();
    const eventName = this.translationService.translate(eventType.nameKey);

    let message = '';
    if (lang === 'fr') {
      message = `Bonjour, je souhaite un devis pour un ${eventName.toLowerCase()} à l'ESPACE IFEDU.\n\n` +
                `Type d'événement : ${eventName}\n` +
                `Capacité estimée : ${eventType.capacity} personnes\n` +
                `Date prévue : \n` +
                `Budget approximatif : \n\n` +
                `Pourriez-vous me contacter pour discuter des détails ?`;
    } else {
      message = `Hello, I would like a quote for a ${eventName.toLowerCase()} at ESPACE IFEDU.\n\n` +
                `Event type: ${eventName}\n` +
                `Estimated capacity: ${eventType.capacity} people\n` +
                `Planned date: \n` +
                `Approximate budget: \n\n` +
                `Could you contact me to discuss the details?`;
    }

    this.modalMessage = message;
    this.openContactModal();
  }

  // Gestion des hover
  onTypeHover(index: number) {
    this.activeType = index;
  }

  onTypeLeave() {
    this.activeType = null;
  }

  onEquipmentHover(index: number) {
    this.hoveredEquipment = index;
  }

  onEquipmentLeave() {
    this.hoveredEquipment = null;
  }

  // Empêcher la fermeture du modal en cliquant à l'intérieur
  preventClose(event: Event) {
    event.stopPropagation();
  }


  // Zoom image properties
isZooming = false;
zoomLevel = 1;
zoomPosition = { x: 0, y: 0 };
imageSize = { width: 0, height: 0 };
containerRef: any;

// Méthodes pour le zoom d'image
onImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  this.imageSize = {
    width: img.naturalWidth,
    height: img.naturalHeight
  };
}

onImageMouseMove(event: MouseEvent) {
  if (!this.isZooming) return;

  const container = event.currentTarget as HTMLElement;
  const rect = container.getBoundingClientRect();

  // Calculer la position relative de la souris
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  this.zoomPosition = { x, y };
}

onImageMouseEnter() {
  this.isZooming = true;
  this.zoomLevel = 1.5; // Niveau de zoom par défaut
}

onImageMouseLeave() {
  this.isZooming = false;
  this.zoomLevel = 1;
}

onImageWheel(event: WheelEvent) {
  event.preventDefault();

  // Ajuster le niveau de zoom avec la molette
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  this.zoomLevel = Math.max(1, Math.min(3, this.zoomLevel + delta));
}

// Méthode pour obtenir le style de transformation
getZoomTransform() {
  if (!this.isZooming) return '';

  const { x, y } = this.zoomPosition;
  return `scale(${this.zoomLevel}) translate(${-x}%, ${-y}%)`;
}

// Méthode pour obtenir le style de point d'origine
getTransformOrigin() {
  if (!this.isZooming) return '';

  const { x, y } = this.zoomPosition;
  return `${x}% ${y}%`;
}
}

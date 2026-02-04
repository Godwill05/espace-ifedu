import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { EventsComponent } from '../events/events.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FoundersComponent } from '../founders/founders.component';
import { ContactComponent } from '../contact/contact.component';
import { LocationComponent } from '../location/location.component';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [HeroComponent, RoomsComponent, RestaurantComponent, EventsComponent, TestimonialsComponent, FoundersComponent, ContactComponent, LocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setJsonLd();
  }

  setJsonLd() {
    // 1. Définition de l'objet de données
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": "Espace IFEDU",
      "description": "Hôtel de charme et complexe événementiel à Porto-Novo, Bénin.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Porto-Novo",
        "addressCountry": "BJ",
        "streetAddress": "Quartier Tokpota"
      },
      "telephone": "+22990688585",
      "image": "https://espace-ifedu.vercel.app/301883386_491181863014483_6682814902501809988_n.jpg" // Change par l'URL réelle
    };

    // 2. Création de la balise script
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);

    // 3. Ajout de la balise dans le <head>
    this.renderer.appendChild(this.document.head, script);
  }
}

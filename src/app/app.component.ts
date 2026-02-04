import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importation nécessaire
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../app/services/translation.service';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { FoundersComponent } from './components/founders/founders.component';
import { LocationComponent } from './components/location/location.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { EventsComponent } from './components/events/events.component';


@Component({
  selector: 'app-root',
  standalone: true,
  // Ajoute CommonModule ici pour corriger l'erreur NG0303
   imports: [
    CommonModule,
    TranslocoModule,
    HeaderComponent,
    HeroComponent,
    RoomsComponent,
    RestaurantComponent,
    FoundersComponent,
    LocationComponent,
    ContactComponent,
    FooterComponent,
    CookieBannerComponent,
    TestimonialsComponent,
    EventsComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'espace-ifedu-front';

  constructor(public translationService: TranslationService) {}

  changeLang(lang: string) {
    this.translationService.setLanguage(lang);
  }
}

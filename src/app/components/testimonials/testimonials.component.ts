import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials = [
  {
    id: 1,
    name: 'Rayane',
    role: 'Client',
    avatar: '486677437_1182687573863905_205916896634320990_n.jpg',
    rating: 5,
    comment: 'Séjour très agréable à l’Espace Ifèdu. La chambre était propre, calme et bien climatisée. Le personnel est accueillant et toujours disponible.',
    stayType: 'Chambre Standard',
    date: 'Mars 2024',
    country: '🇧🇯 Bénin'
  },
  {
    id: 2,
    name: 'Dine',
    role: 'Cliente',
    avatar: '486755343_1182687487197247_3144273812044121498_n.jpg',
    rating: 4,
    comment: 'Très bon cadre pour se reposer ou organiser un petit événement. Le restaurant est correct et l’endroit est facile d’accès à Porto-Novo.',
    stayType: 'Studio',
    date: 'Février 2024',
    country: '🇧🇯 Bénin'
  },
  {
    id: 3,
    name: 'Joris Ligan',
    role: 'Visiteur',
    avatar: 'PHOTO-2026-02-02-15-01-32_3.jpg',
    rating: 5,
    comment: 'Excellent rapport qualité-prix. Le cadre est propre, sécurisé et bien entretenu. Je recommande l’Espace Ifèdu pour les séjours courts comme longs.',
    stayType: 'Chambre Confort',
    date: 'Janvier 2024',
    country: '🇧🇯 Bénin'
  }
];


  activeTestimonial = 0;

  nextTestimonial() {
    this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.activeTestimonial = (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number) {
    this.activeTestimonial = index;
  }

  // Générer les étoiles
  getStars(rating: number): any[] {
    return Array.from({ length: 5 }, (_, i) => ({
      filled: i < rating
    }));
  }
}

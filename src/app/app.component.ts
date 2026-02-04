import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importation nécessaire
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../app/services/translation.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  // Ajoute CommonModule ici pour corriger l'erreur NG0303
  imports: [CommonModule, TranslocoModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'espace-ifedu-front';

  constructor(
    public translationService: TranslationService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  changeLang(lang: string) {
    this.translationService.setLanguage(lang);
  }

  ngOnInit() {
    this.titleService.setTitle(
      'Hôtel & Salle de Fête Espace IFEDU - Porto-Novo, Bénin',
    );
    this.metaService.addTags([
      {
        name: 'description',
        content:
          "Découvrez l'Espace IFEDU à Porto-Novo. Hôtel confortable et salles de réception prestigieuses pour mariages et conférences au Bénin.",
      },
      {
        name: 'keywords',
        content: 'Hôtel Porto-Novo, Salle de fête Bénin, Mariage, Espace Ifedu',
      },
      {
        property: 'og:image',
        content: '301883386_491181863014483_6682814902501809988_n.jpg',
      }, // Pour le partage Facebook/WhatsApp
    ]);
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Hôtel & Salle de Fête Espace IFEDU - Porto-Novo',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Hôtel et salles de réception à Porto-Novo.',
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }
}

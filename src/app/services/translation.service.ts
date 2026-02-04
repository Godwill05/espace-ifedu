import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(
    private translocoService: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object // Détecte si on est sur serveur ou navigateur
  ) {
    // Au démarrage, on récupère la langue sauvegardée si on est sur le navigateur
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('user-lang');
      if (savedLang) {
        this.translocoService.setActiveLang(savedLang);
      }
    }
  }

  // Changer la langue
  setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);

    // On ne sauvegarde que si on est dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-lang', lang);
    }
  }

  // Récupérer la langue actuelle
  getCurrentLang(): string {
    return this.translocoService.getActiveLang();
  }

  // Liste des langues disponibles
  getAvailableLangs() {
    return [
      { id: 'fr', label: 'Français', flag: '🇫🇷' },
      { id: 'en', label: 'English', flag: '🇬🇧' }
    ];
  }

  public translate(key: string, params?: Record<string, any>): string {
    return this.translocoService.translate(key, params);
  }
  getTranslation(key: string): string {
  return this.translocoService.translate(key);
}
}

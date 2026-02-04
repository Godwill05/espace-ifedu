import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentLang: string;
  availableLangs: any[] = [];

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  ngOnInit() {
    this.availableLangs = this.translationService.getAvailableLangs();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage() {
    this.translationService.setLanguage(this.currentLang);
  }
}

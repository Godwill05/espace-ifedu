import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    const cookieChoice = localStorage.getItem('cookie-consent');

    if (!cookieChoice) {
      setTimeout(() => {
        this.showBanner = true;
      }, 1000);
    }
  }

  acceptCookies() {
    if (!this.isBrowser) return;

    localStorage.setItem('cookie-consent', 'accepted');
    this.showBanner = false;
  }

  rejectCookies() {
    if (!this.isBrowser) return;

    localStorage.setItem('cookie-consent', 'rejected');
    this.showBanner = false;
  }

  openCookieSettings() {
    console.log('Open cookie settings modal');
  }
}

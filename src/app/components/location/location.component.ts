import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  /* getDirections() {
    const destination = encodeURIComponent(
      'Espace IFEDU, Tokpota-Davo, Porto-Novo, Benin',
    );
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      '_blank',
    );
  } */
  largitude: number = 6.3562425;
  longitude: number = 2.4277995;
  getDirections() {
    // Coordonnées de l'Hôtel Espace IFEDU Cotonou
    const latitude = 6.5233156;
    const longitude = 2.6632051;

    // Adresse complète pour Google Maps
    const address = encodeURIComponent('Hôtel Espace IFEDU, Porto-Novo, Bénin');

    // Deux options possibles :

    // Option 1: Utiliser les coordonnées GPS (plus précis)
    /* window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    ); */

    // Option 2: Utiliser l'adresse textuelle
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${address}`,
      '_blank'
    );

    // Option 3: Utiliser l'URL de recherche Google Maps
    // window.open(
    //   `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=ChIJY0Vq0Q4BKxARX8Rg6Z7Z7Q8`,
    //   '_blank'
    // );
  }


    getCurrentCoordinates() {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by this browser');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);

      // Exemple : ouverture Google Maps avec ces coordonnées
     /*  window.open(
        `https://www.google.com/maps?q=${latitude},${longitude}`,
        '_blank'
      ); */
    },
    (error) => {
      console.error('Geolocation error:', error);
    },
    {
      enableHighAccuracy: true
    }
  );
}

}

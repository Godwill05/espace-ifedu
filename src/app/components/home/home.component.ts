import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { EventsComponent } from '../events/events.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FoundersComponent } from '../founders/founders.component';
import { ContactComponent } from '../contact/contact.component';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, RoomsComponent, RestaurantComponent, EventsComponent, TestimonialsComponent, FoundersComponent, ContactComponent, LocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

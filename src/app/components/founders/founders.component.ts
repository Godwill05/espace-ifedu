import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-founders',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './founders.component.html',
  styleUrls: ['./founders.component.css']
})
export class FoundersComponent {}

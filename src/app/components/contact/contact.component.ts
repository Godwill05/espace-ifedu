import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(public translationService: TranslationService) {}

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading = false;
  isSubmitted = false;

  submitForm() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;

      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }, 1500);
  }
}

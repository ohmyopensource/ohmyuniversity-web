import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ORG_TYPES } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-contatti-form-organization',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, CustomTextComponent],
  templateUrl: './contatti-form-organization.component.html',
})
export class ContattiFormOrganization {
  readonly orgTypes = ORG_TYPES;

  isLoading = false;
  succeeded = false;

  orgForm = {
    orgName: '',
    orgType: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  };

  submitOrg(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.succeeded = true;
    }, 1500);
  }
}

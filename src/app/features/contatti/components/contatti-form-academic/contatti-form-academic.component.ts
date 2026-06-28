import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ACADEMIC_ROLES, ACADEMIC_SUBJECTS, APP } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-contatti-form-academic',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, CustomTextComponent],
  templateUrl: './contatti-form-academic.component.html',
})
export class ContattiFormAcademic {
  readonly APP = APP;

  readonly academicRoles = ACADEMIC_ROLES;
  readonly academicSubjects = ACADEMIC_SUBJECTS;

  isLoading = false;
  succeeded = false;

  academicForm = {
    name: '',
    email: '',
    ateneo: '',
    role: '',
    subject: '',
    message: '',
  };

  submitAcademic(): void {
    this.isLoading = true;
    // @TODO
    setTimeout(() => {
      this.isLoading = false;
      this.succeeded = true;
    }, 1500);
  }
}

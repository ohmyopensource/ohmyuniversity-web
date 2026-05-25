import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contatti-form-academic',
  imports: [FormsModule],
  templateUrl: './contatti-form-academic.html',

})
export class ContattiFormAcademic {


  // Form universitari
  readonly academicForm = {
    name: '',
    email: '',
    ateneo: '',
    role: '',
    subject: '',
    message: '',
  };

  readonly academicRoles = [
    'Studente',
    'Dottorando',
    'Docente',
    'Ricercatore',
    'Staff tecnico-amministrativo',
    'Rettore / Direzione ateneo',
  ];

  readonly academicSubjects = [
    'Problema tecnico / Bug',
    'Il mio ateneo non è supportato',
    'Richiesta di integrazione per il mio ateneo',
    'Domanda sul funzionamento',
    'Feedback sul prodotto',
    'Altro',
  ];

  submitAcademic(): void {
    // TODO: integrazione API
    console.log('Academic form submitted', this.academicForm);
  }

}

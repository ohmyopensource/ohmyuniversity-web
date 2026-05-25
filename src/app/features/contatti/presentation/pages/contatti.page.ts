import { Component, signal } from '@angular/core';
import { ContattiFormAcademic } from '../components/contatti-form-academic/contatti-form-academic';
import { ContattiFormOrganization } from '../components/contatti-form-organization/contatti-form-organization';

export type ContactTab = 'academic' | 'organization';

@Component({
  selector: 'app-contatti-page',
  standalone: true,
  imports: [ContattiFormAcademic, ContattiFormOrganization],
  templateUrl: './contatti.page.html',
})
export class ContattiPage {
  readonly activeTab = signal<ContactTab>('academic');

  setTab(tab: ContactTab): void {
    this.activeTab.set(tab);
  }

}

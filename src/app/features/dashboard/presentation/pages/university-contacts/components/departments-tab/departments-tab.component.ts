import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideMail,
  LucidePhone,
  LucideBuilding2,
} from '@lucide/angular';
import { UniversityContactsService } from 'src/app/features/dashboard/services/university-contacts.service';

@Component({
  selector: 'app-departments-tab',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomLinkComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './departments-tab.component.html',
})
export class DepartmentsTabComponent {
  private readonly contactsService = inject(UniversityContactsService);

  readonly iconSearch = LucideSearch;
  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconBuilding = LucideBuilding2;

  private readonly departments = toSignal(this.contactsService.departments$);
  private readonly campuses = toSignal(this.contactsService.campuses$);

  readonly loading = computed(() => this.departments() === undefined);
  readonly searchValue = signal('');
  readonly activeCampus = signal<number | 'all'>('all');

  readonly campusFilters = computed(() => [
    { id: 'all' as const, label: 'Tutte le sedi' },
    ...(this.campuses() ?? []).map(c => ({ id: c.id, label: c.label })),
  ]);

  readonly filtered = computed(() => {
    const list = this.departments() ?? [];
    const q = this.searchValue().toLowerCase().trim();
    const campus = this.activeCampus();
    return list.filter(d => {
      const matchCampus = campus === 'all' || d.sedeIds.includes(campus);
      const matchQ =
        !q || d.name.toLowerCase().includes(q) || (d.email ?? '').toLowerCase().includes(q);
      return matchCampus && matchQ;
    });
  });

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  setCampus(id: number | 'all'): void {
    this.activeCampus.set(id);
  }
}

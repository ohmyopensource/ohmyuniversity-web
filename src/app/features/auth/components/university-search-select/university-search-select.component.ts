/**
 * @file university-search-select.component.ts
 * @description Local searchable combobox for selecting a university from
 * a long list. Filters by name/short name as the user types, shows a
 * dropdown of matches, and emits the selected university on click.
 * Not part of the shared UI suite - scoped to the login feature for now.
 */

import {
  Component,
  input,
  output,
  signal,
  computed,
  ElementRef,
  inject,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon, LucideSearch, LucideCheck } from '@lucide/angular';
import { University } from '@types';

@Component({
  selector: 'app-university-search-select',
  standalone: true,
  imports: [FormsModule, LucideDynamicIcon],
  templateUrl: './university-search-select.component.html',
})
export class UniversitySearchSelectComponent {
  private readonly elementRef = inject(ElementRef);

  readonly iconSearch = LucideSearch;
  readonly iconCheck = LucideCheck;

  readonly universities = input.required<University[]>();
  readonly selected = input<University | undefined>(undefined);
  readonly selectionChange = output<University>();

  readonly query = signal('');
  readonly isOpen = signal(false);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.universities();
    if (!q) return list;
    return list.filter(
      u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q),
    );
  });

  get displayValue(): string {
    if (this.isOpen()) return this.query();
    return this.selected()?.shortName ?? '';
  }

  onFocus(): void {
    this.isOpen.set(true);
    this.query.set('');
  }

  onInput(value: string): void {
    this.query.set(value);
  }

  selectUniversity(uni: University): void {
    this.selectionChange.emit(uni);
    this.isOpen.set(false);
    this.query.set('');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

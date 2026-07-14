import { Component, computed, inject, signal } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucidePhone,
  LucideMail,
  LucideClock,
  LucideSearch,
} from '@lucide/angular';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { getUsefulContacts } from '@shared/constants';

@Component({
  selector: 'app-useful-numbers-tab',
  standalone: true,
  imports: [CustomCardComponent, CustomInputComponent, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './useful-numbers-tab.component.html',
})
export class UsefulNumbersTabComponent {
  private readonly auth = inject(AuthFacade);

  readonly iconPhone = LucidePhone;
  readonly iconMail = LucideMail;
  readonly iconClock = LucideClock;
  readonly iconSearch = LucideSearch;

  readonly searchValue = signal('');

  private readonly allContacts = computed(() => {
    const universityId = this.auth.getUniversityId()?.toLowerCase() ?? '';
    return getUsefulContacts(universityId);
  });

  readonly contacts = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.allContacts();
    return this.allContacts().filter(
      c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    );
  });

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }
}

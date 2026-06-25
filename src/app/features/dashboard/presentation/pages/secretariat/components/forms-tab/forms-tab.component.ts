import { Component, input, computed } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideExternalLink,
  LucideFileText,
  LucideCalendarDays,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { FormModule } from '@shared/types/dashboard/dashboard-secretariat.types';

@Component({
  selector: 'app-forms-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomButtonComponent],
  templateUrl: './forms-tab.component.html',
})
export class FormsTabComponent {
  readonly forms = input.required<FormModule[]>();

  readonly iconFile = LucideFileText;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconCalendar = LucideCalendarDays;

  readonly categories = computed(() => {
    const cats = new Set(this.forms().map(f => f.category));
    return Array.from(cats);
  });

  formsForCategory(category: string): FormModule[] {
    return this.forms().filter(f => f.category === category);
  }
}

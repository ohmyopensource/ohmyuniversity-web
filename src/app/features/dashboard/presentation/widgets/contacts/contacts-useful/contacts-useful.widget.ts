import { Component, Input, computed, inject } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideContactRound } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { getUsefulContacts } from '@shared/constants/shared/university-useful-contacts.constants';

@Component({
  selector: 'app-contacts-useful-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './contacts-useful.widget.html',
})
export class ContactsUsefulWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  private readonly auth = inject(AuthFacade);
  readonly lucideContact = LucideContactRound;

  readonly contacts = computed(() => {
    const universityId = this.auth.getUniversityId()?.toLowerCase() ?? '';
    return getUsefulContacts(universityId);
  });
}

import { Component, Input, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideContactRound } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { UniversityContactsService } from 'src/app/features/dashboard/services/university-contacts.service';

@Component({
  selector: 'app-contacts-teachers-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './contacts-teachers.widget.html',
})
export class ContactsTeachersWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  private readonly contactsService = inject(UniversityContactsService);
  private readonly docenti = toSignal(this.contactsService.docenti$);

  readonly loading = computed(() => this.docenti() === undefined);
  readonly teachers = computed(() => this.docenti() ?? []);

  readonly lucideContact = LucideContactRound;
}

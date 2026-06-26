import { Component, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { Portal, PortalCategoryDef } from '@shared/types/features/portals.types';
import { PortalCardComponent } from '../portal-card/portal-card.component';

@Component({
  selector: 'app-portal-category-section',
  standalone: true,
  imports: [LucideDynamicIcon, CustomBadgeComponent, PortalCardComponent],
  templateUrl: './portal-category-section.component.html',
})
export class PortalCategorySectionComponent {
  readonly category = input.required<PortalCategoryDef>();
  readonly portals = input.required<Portal[]>();
}

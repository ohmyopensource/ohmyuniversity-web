import { Component, input } from '@angular/core';
import { LucideDynamicIcon, LucideExternalLink, LucideStar } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { Portal, PortalCategoryDef } from '@shared/types/features/portals.types';

@Component({
  selector: 'app-portal-card',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './portal-card.component.html',
})
export class PortalCardComponent {
  readonly portal = input.required<Portal>();
  readonly categoryDef = input.required<PortalCategoryDef | undefined>();
  readonly featured = input<boolean>(false);

  readonly iconExternalLink = LucideExternalLink;
  readonly iconStar = LucideStar;
}

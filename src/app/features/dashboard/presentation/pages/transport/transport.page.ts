import { Component, signal, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideMapPin,
  LucideBus,
  LucideTrainFront,
  LucideDownload,
  LucideExternalLink,
  LucideNavigation,
  LucideClock,
  LucideInfo,
  LucideWifi,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import { TransportCompany, TransportRoute } from '@shared/types/dashboard/transport.types';
import { MOCK_TRANSPORT_ROUTES, MOCK_TRANSPORT_COMPANIES } from '@shared/data/mock/transport.mock';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [
    FormsModule,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomTabsComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './transport.page.html',
})
export class TransportPage {
  private readonly sanitizer = inject(DomSanitizer);

  readonly iconSearch = LucideSearch;
  readonly iconMapPin = LucideMapPin;
  readonly iconBus = LucideBus;
  readonly iconTrain = LucideTrainFront;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconNavigation = LucideNavigation;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconWifi = LucideWifi;

  activeTab = signal<string>('public');
  fromValue = signal<string>('');
  mapUrl = signal<string | null>(null);
  searching = signal<boolean>(false);

  // @TODO
  readonly universityName = 'Università di Bologna';
  readonly universityAddress = 'Via Zamboni 33, Bologna';

  readonly tabs: TabItem[] = [
    { id: 'public', label: 'Trasporto pubblico', icon: LucideBus },
    { id: 'companies', label: 'Aziende locali', icon: LucideTrainFront },
  ];

  readonly routes: TransportRoute[] = MOCK_TRANSPORT_ROUTES;
  readonly companies: TransportCompany[] = MOCK_TRANSPORT_COMPANIES;

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  onFromChange(val: string | number): void {
    this.fromValue.set(String(val));
  }

  searchRoute(): void {
    if (!this.fromValue()) return;
    this.searching.set(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = encodeURIComponent(`${this.fromValue()} to ${this.universityAddress}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyD-placeholder&origin=${encodeURIComponent(this.fromValue())}&destination=${encodeURIComponent(this.universityAddress)}&mode=transit`;

    // @TODO
    const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(this.universityAddress)}&output=embed`;
    this.mapUrl.set(mapsUrl);
    this.searching.set(false);
  }

  openGoogleMaps(): void {
    const from = encodeURIComponent(this.fromValue() || '');
    const to = encodeURIComponent(this.universityAddress);
    const url = from
      ? `https://www.google.com/maps/dir/${from}/${to}`
      : `https://www.google.com/maps/search/${to}`;
    window.open(url, '_blank');
  }

  routeTypeVariant(type: string): 'primary' | 'secondary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'success'> = {
      bus: 'primary',
      train: 'secondary',
      mixed: 'success',
    };
    return map[type] ?? 'primary';
  }

  routeTypeLabel(type: string): string {
    const map: Record<string, string> = {
      bus: 'Bus',
      train: 'Treno',
      mixed: 'Bus + Treno',
    };
    return map[type] ?? type;
  }

  companyTypeIcon(type: string): any {
    return type === 'train' ? LucideTrainFront : LucideBus;
  }
}

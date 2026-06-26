import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideGraduationCap,
  LucideMail,
  LucideBookOpen,
  LucideBriefcase,
  LucideWallet,
  LucideBuilding2,
  LucideUsers,
  LucideShield,
  LucideStar,
  LucideTriangleAlert,
} from '@lucide/angular';
import { Portal, PortalCategory, PortalCategoryDef } from '@shared/types/features/portals.types';
import { STATIC_PORTALS } from '@shared/constants';
import { PortalCardComponent } from '../components/portal-card/portal-card.component';
import { PortalCategorySectionComponent } from '../components/portal-category-section/portal-category-section.component';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';
import { UniversityConfigResponse } from 'src/app/core/domain/models/career/university-config.model';

@Component({
  selector: 'app-portals',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomInputComponent,
    CustomBadgeComponent,
    LucideDynamicIcon,
    PortalCardComponent,
    PortalCategorySectionComponent,
  ],
  templateUrl: './portals.page.html',
})
export class PortalsPage implements OnInit {
  private readonly http = inject(HttpClient);

  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly iconSearch = LucideSearch;
  readonly iconStar = LucideStar;

  searchValue = signal<string>('');
  private readonly portalsSignal = signal<Portal[]>([...STATIC_PORTALS]);

  readonly categories: PortalCategoryDef[] = [
    {
      id: 'segreteria',
      label: 'Segreteria',
      icon: LucideBuilding2,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
    {
      id: 'didattica',
      label: 'Didattica',
      icon: LucideBookOpen,
      color: 'var(--color-secondary-dark)',
      bg: 'var(--color-secondary-light)',
    },
    {
      id: 'email',
      label: 'Email & Comunicazione',
      icon: LucideMail,
      color: 'var(--color-tertiary-dark)',
      bg: 'var(--color-tertiary-light)',
    },
    {
      id: 'borse',
      label: 'Borse & Servizi',
      icon: LucideWallet,
      color: 'var(--color-success-dark)',
      bg: 'var(--color-success-light)',
    },
    {
      id: 'carriera',
      label: 'Carriera',
      icon: LucideBriefcase,
      color: 'var(--color-warning-dark)',
      bg: 'var(--color-warning-light)',
    },
    {
      id: 'collaborazione',
      label: 'Collaborazione',
      icon: LucideUsers,
      color: 'var(--color-info-dark)',
      bg: 'var(--color-info-light)',
    },
    {
      id: 'benessere',
      label: 'Benessere & Supporto',
      icon: LucideShield,
      color: 'var(--color-error-dark)',
      bg: 'var(--color-error-light)',
    },
    {
      id: 'internazionale',
      label: 'Internazionale',
      icon: LucideGraduationCap,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
  ];

  ngOnInit(): void {
    // Inject dynamic URLs from backend
    this.http.get<UniversityConfigResponse>(API.university.externalServices).subscribe({
      next: config => {
        this.portalsSignal.update(portals =>
          portals.map(p => {
            if (p.id === 'esse3' && config.esse3PortalUrl) {
              return { ...p, url: config.esse3PortalUrl };
            }
            if (p.id === 'moodle' && config.moodleUrl) {
              return { ...p, url: config.moodleUrl };
            }
            if (p.id === 'biblioteca' && config.libraryUrl) {
              return { ...p, url: config.libraryUrl };
            }
            return p;
          }),
        );
      },
      error: () => {},
    });
  }

  readonly featuredPortals = computed(() => this.portalsSignal().filter(p => p.featured && p.url));

  readonly filteredPortals = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.portalsSignal();
    return this.portalsSignal().filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        this.categoryDef(p.category)?.label.toLowerCase().includes(q),
    );
  });

  readonly isSearching = computed(() => this.searchValue().trim().length > 0);
  readonly totalCount = computed(() => this.filteredPortals().length);

  readonly visibleCategories = computed(() => {
    const ids = new Set(this.filteredPortals().map(p => p.category));
    return this.categories.filter(c => ids.has(c.id));
  });

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  portalsForCategory(categoryId: PortalCategory): Portal[] {
    return this.filteredPortals().filter(p => p.category === categoryId);
  }

  categoryDef(id: PortalCategory): PortalCategoryDef | undefined {
    return this.categories.find(c => c.id === id);
  }
}

import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideSearch,
  LucideWallet,
  LucideFileText,
  LucideMegaphone,
  LucideCreditCard,
  LucideTriangleAlert,
  LucideBriefcase,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import {
  MOCK_SCHOLARSHIPS,
  MOCK_FORM_MODULES,
  MOCK_BANDI,
} from '@shared/data/mock/secretariat.mock';
import { Scholarship } from '@shared/types/dashboard/dashboard-secretariat.types';
import { APP } from '@shared/constants';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { ScholarshipsTabComponent } from '../components/scholarships-tab/scholarships-tab.component';
import { FormsTabComponent } from '../components/forms-tab/forms-tab.component';
import { BandiTabComponent } from '../components/bandi-tab/bandi-tab.component';
import { FeesTabComponent } from '../components/fees-tab/fees-tab.component';
import { InternshipsTabComponent } from '../components/internships-tab/internships-tab.component';
import { FeeStatusResponse } from 'src/app/core/domain/models/career/fees-status.model';
import { InternshipApplication } from 'src/app/core/domain/models/career/internship.model';
import { FeesFacade } from 'src/app/core/application/facades/fees.facade';
import { InternshipsFacade } from 'src/app/core/application/facades/internships.facade';

@Component({
  selector: 'app-secretariat',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    CustomInputComponent,
    CardStatusComponent,
    ScholarshipsTabComponent,
    FormsTabComponent,
    BandiTabComponent,
    FeesTabComponent,
    InternshipsTabComponent,
  ],
  templateUrl: './secretariat.page.html',
})
export class SecretariatPage implements OnInit {
  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly APP = APP;

  private readonly toast = inject(ToastService);
  private readonly fees = inject(FeesFacade);
  private readonly internships = inject(InternshipsFacade);
  private readonly auth = inject(AuthFacade);

  readonly hasCarriera = this.auth.hasCarriera();

  tasse = signal<FeeStatusResponse | null>(null);
  tasseLoading = signal(true);
  tasseError = signal(false);

  internshipApplications = signal<InternshipApplication[]>([]);
  internshipsLoading = signal(true);
  internshipsError = signal(false);

  readonly iconSearch = LucideSearch;

  activeTab = signal<string>('scholarships');
  searchValue = signal<string>('');

  readonly tabs: TabItem[] = [
    { id: 'scholarships', label: 'Borse di studio', icon: LucideWallet },
    { id: 'forms', label: 'Modulistica', icon: LucideFileText },
    { id: 'bandi', label: 'Bandi e concorsi', icon: LucideMegaphone },
    { id: 'internships', label: 'Tirocini', icon: LucideBriefcase },
    { id: 'fees', label: 'Tasse', icon: LucideCreditCard },
  ];

  readonly allScholarships = MOCK_SCHOLARSHIPS;
  readonly allForms = MOCK_FORM_MODULES;
  readonly allBandi = MOCK_BANDI;

  readonly filteredScholarships = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.allScholarships;
    return this.allScholarships.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  });

  readonly filteredForms = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.allForms;
    return this.allForms.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  });

  readonly filteredBandi = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.allBandi;
    return this.allBandi.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  });

  onTabChange(id: string): void {
    this.activeTab.set(id);
    this.searchValue.set('');
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  onApplyScholarship(s: Scholarship): void {
    if (s.status === 'closed') {
      this.toast.warning('Le domande per questa borsa sono chiuse.', { duration: 4000 });
      return;
    }
    window.open(s.url, '_blank');
  }

  ngOnInit(): void {
    if (!this.hasCarriera) return;

    this.fees.getStatus().subscribe({
      next: data => {
        this.tasse.set(data);
        this.tasseLoading.set(false);
      },
      error: () => {
        this.tasseError.set(true);
        this.tasseLoading.set(false);
      },
    });

    this.internships.getApplications().subscribe({
      next: data => {
        this.internshipApplications.set(data.applications ?? []);
        this.internshipsLoading.set(false);
      },
      error: () => {
        this.internshipsError.set(true);
        this.internshipsLoading.set(false);
      },
    });
  }
}

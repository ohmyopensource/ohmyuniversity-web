import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, startWith } from 'rxjs/operators';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { LucideDynamicIcon, LucideSearch, LucideChevronDown, LucideMail } from '@lucide/angular';
import { UniversityContactsService } from 'src/app/features/dashboard/services/university-contacts.service';
import {
  DocenteDetailResponse,
  DocenteSummary,
} from 'src/app/core/domain/models/career/docenti.model';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomPaginationComponent } from '@ui/custom-pagination/custom-pagination.component';
import { PAGINATION } from '@constants';

@Component({
  selector: 'app-professors-tab',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    CustomButtonComponent,
    CustomPaginationComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './professors-tab.component.html',
})
export class ProfessorsTabComponent {
  private readonly contactsService = inject(UniversityContactsService);

  readonly iconSearch = LucideSearch;
  readonly iconChevron = LucideChevronDown;
  readonly iconMail = LucideMail;

  readonly scope = signal<'own' | 'all'>('own');

  private readonly activeList = toSignal(
    toObservable(this.scope).pipe(
      switchMap(scope =>
        (scope === 'own' ? this.contactsService.docenti$ : this.contactsService.allDocenti$).pipe(
          startWith(undefined),
        ),
      ),
    ),
  );
  readonly loading = computed(() => this.activeList() === undefined);
  readonly searchValue = signal('');

  readonly expandedId = signal<string | null>(null);
  readonly detailLoadingId = signal<string | null>(null);
  private readonly detailCache = signal<Record<string, DocenteDetailResponse>>({});

  readonly filtered = computed(() => {
    const list = this.activeList() ?? [];
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return list;
    return list.filter(d => d.name.toLowerCase().includes(q));
  });

  readonly currentPage = signal(1);
  readonly pageSize = signal<number>(PAGINATION.defaultPageSize);

  readonly paginated = computed(() => {
    const list = this.filtered();
    const start = (this.currentPage() - 1) * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });

  constructor() {
    effect(() => {
      this.scope();
      this.searchValue();
      this.currentPage.set(1);
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  setScope(scope: 'own' | 'all'): void {
    this.scope.set(scope);
    this.expandedId.set(null);
    this.searchValue.set('');
  }
  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  detailFor(id: string): DocenteDetailResponse | undefined {
    return this.detailCache()[id];
  }

  isExpanded(id: string): boolean {
    return this.expandedId() === id;
  }

  isLoadingDetail(id: string): boolean {
    return this.detailLoadingId() === id;
  }

  toggle(prof: DocenteSummary): void {
    if (!prof.hasDetail || !prof.id) return;
    const id = prof.id;

    if (this.expandedId() === id) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(id);
    if (this.detailCache()[id]) return;

    this.detailLoadingId.set(id);
    this.contactsService.getDocenteDetail(id).subscribe({
      next: detail => {
        this.detailCache.update(cache => ({ ...cache, [id]: detail }));
        this.detailLoadingId.set(null);
      },
      error: () => this.detailLoadingId.set(null),
    });
  }
}

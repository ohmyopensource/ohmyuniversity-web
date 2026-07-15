import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideTriangleAlert, LucideInfo } from '@lucide/angular';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomFilterComponent, FilterState } from '@ui/custom-filter/custom-filter.component';
import {
  CustomAccordionComponent,
  AccordionItem,
} from '@ui/custom-accordion/custom-accordion.component';
import { SkeletonCardComponent } from '@ui/custom-skeleton/skeleton-presets';
import { SkeletonIfDirective } from '@ui/custom-skeleton/skeleton-if.directive';
import { RoadmapFacade } from 'src/app/core/application/facades/roadmap.facade';
import { CorsoLaureaNazionale } from 'src/app/core/domain/models/roadmap/corso-laurea-nazionale.model';
import { CorsoLaureaCardComponent } from '../corso-laurea-card/corso-laurea-card.component';

interface MagistraleGroup {
  classeLaureaCod: string;
  classeLaureaDes: string;
  corsi: CorsoLaureaNazionale[];
  ateneiCount: number;
}

@Component({
  selector: 'app-magistrali-affini',
  standalone: true,
  imports: [
    CardStatusComponent,
    CustomFilterComponent,
    CustomAccordionComponent,
    SkeletonCardComponent,
    SkeletonIfDirective,
    CorsoLaureaCardComponent,
  ],
  templateUrl: './magistrali-affini.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagistraliAffiniComponent {
  private readonly facade = inject(RoadmapFacade);

  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly lucideInfo = LucideInfo;

  readonly skeletonItems = [0, 1, 2, 3, 4, 5];

  readonly loading = signal(false);
  readonly searched = signal(false);
  readonly error = signal<string | null>(null);
  readonly results = signal<CorsoLaureaNazionale[]>([]);

  /**
   * Groups the flat result list by degree class code. Results arrive already
   * sorted alphabetically by nomeCorso from the backend, so each group's
   * corsi array stays alphabetically ordered too.
   */
  readonly groupedResults = computed<MagistraleGroup[]>(() => {
    const map = new Map<string, MagistraleGroup>();
    for (const corso of this.results()) {
      const existing = map.get(corso.classeLaureaCod);
      if (existing) {
        existing.corsi.push(corso);
      } else {
        map.set(corso.classeLaureaCod, {
          classeLaureaCod: corso.classeLaureaCod,
          classeLaureaDes: corso.classeLaureaDes ?? corso.classeLaureaCod,
          corsi: [corso],
          ateneiCount: 0,
        });
      }
    }
    for (const group of map.values()) {
      group.ateneiCount = new Set(group.corsi.map(c => c.ateneoNome)).size;
    }
    return Array.from(map.values()).sort((a, b) =>
      a.classeLaureaCod.localeCompare(b.classeLaureaCod),
    );
  });

  /**
   * Maps grouped results to the accordion's data-driven item format. `content`
   * is kept as a meaningful fallback string (used only if contentTemplate is
   * absent) rather than left empty.
   */
  readonly accordionItems = computed<AccordionItem[]>(() =>
    this.groupedResults().map(group => ({
      title: `${group.classeLaureaCod} — ${group.classeLaureaDes}`,
      content: `${group.corsi.length} corsi disponibili in ${group.ateneiCount} atenei`,
    })),
  );

  /**
   * Triggers the "magistrali affini" search using the free-text value typed
   * into the filter search bar as the current degree class code.
   *
   * @param state Filter state emitted by the search bar.
   */
  onFilter(state: FilterState): void {
    const classe = state.search.trim();
    if (!classe) {
      this.resetState();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.searched.set(true);

    this.facade.getMagistraliAffini(classe).subscribe({
      next: corsi => {
        this.results.set(corsi);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.results.set([]);
        this.loading.set(false);
        this.error.set(
          err.status === 404
            ? `Non conosciamo la classe di laurea "${classe}". Controlla il codice inserito (es. L-31).`
            : 'Errore nel recupero dei dati. Riprova più tardi.',
        );
      },
    });
  }

  /**
   * Clears all section state — invoked when the search bar is emptied,
   * either by manual deletion or via the filter's reset action.
   */
  private resetState(): void {
    this.searched.set(false);
    this.error.set(null);
    this.results.set([]);
    this.loading.set(false);
  }
}

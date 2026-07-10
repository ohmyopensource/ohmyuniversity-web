import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideDynamicIcon, LucideSearch } from '@lucide/angular';
import { MySchedulesComponent } from '../components/my-schedules/my-schedules.component';
import { ScheduleSearchModalComponent } from '../components/schedule-search-modal/schedule-search-modal.component';
import { MyTimetablesService } from 'src/app/features/dashboard/services/my-timetables.service';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { TimetableResponse } from 'src/app/core/domain/models/timetable/timetable.model';
import { TimetableFacade } from 'src/app/core/application/facades/timetable.facade';
import { UNIVERSITY_ID_KEY } from 'src/app/core/application/usecases/auth/login.usecase';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomButtonComponent,
    MySchedulesComponent,
    ScheduleSearchModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './schedule.page.html',
})
export class SchedulePage implements OnInit {
  private readonly timetable = inject(TimetableFacade);
  private readonly auth = inject(AuthFacade);
  private readonly myTimetables = inject(MyTimetablesService);

  private readonly searchModal = viewChild.required(ScheduleSearchModalComponent);

  readonly iconSearch = LucideSearch;
  readonly mySchedules = signal<TimetableResponse[]>([]);
  readonly loading = signal(true);
  readonly allTimetables = signal<TimetableResponse[]>([]);

  ngOnInit(): void {
    const universityId = localStorage.getItem(UNIVERSITY_ID_KEY)?.toUpperCase() ?? 'UNIMOL';

    this.timetable.getTimetables(universityId).subscribe({
      next: data => this.allTimetables.set(data),
      error: () => {},
    });

    this.myTimetables.mySchedules$.subscribe({
      next: data => {
        this.mySchedules.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openSearch(): void {
    this.searchModal().open();
  }

  get hasCarriera(): boolean {
    return this.auth.hasCarriera();
  }
}

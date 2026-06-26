import { Component, signal, inject } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { TabItem } from '@ui/custom-tab/custom-tab.component';
import { SelectOption } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { LucideDynamicIcon, LucideInfo, LucideTriangleAlert } from '@lucide/angular';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { Building, Campus } from '@shared/types/dashboard/dashboard-classrooms.types';
import { MOCK_CAMPUSES } from '@shared/data/mock/classrooms.mock';
import { ClassroomsBuildingListComponent } from '../components/classrooms-building-list/classrooms-building-list.component';
import { ClassroomsFiltersComponent } from '../components/classrooms-filters/classrooms-filters.component';
import { ClassroomsMapCardComponent } from '../components/classrooms-map-card/classrooms-map-card.component';

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTextComponent,
    LucideDynamicIcon,
    CardStatusComponent,
    ClassroomsMapCardComponent,
    ClassroomsFiltersComponent,
    ClassroomsBuildingListComponent,
  ],
  templateUrl: './classrooms.page.html',
})
export class ClassroomsPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly iconInfo = LucideInfo;

  private readonly toast = inject(ToastService);

  activeCampusId = signal<string>('campobasso');
  activeBuilding = signal<string>('all');
  searchValue = signal<string>('');

  readonly campusTabs: TabItem[] = [
    { id: 'campobasso', label: 'Campobasso' },
    { id: 'termoli', label: 'Termoli' },
    { id: 'pesche', label: 'Pesche' },
  ];

  readonly campuses: Campus[] = MOCK_CAMPUSES;

  get activeCampus(): Campus {
    return this.campuses.find(c => c.id === this.activeCampusId()) ?? this.campuses[0];
  }

  get buildingOptions(): SelectOption[] {
    return [
      { value: 'all', label: 'Tutti gli edifici' },
      ...this.activeCampus.buildings.map(b => ({ value: b.id, label: b.name })),
    ];
  }

  get filteredBuildings(): Building[] {
    const buildings =
      this.activeBuilding() === 'all'
        ? this.activeCampus.buildings
        : this.activeCampus.buildings.filter(b => b.id === this.activeBuilding());

    const search = this.searchValue().toLowerCase().trim();
    if (!search) return buildings;

    return buildings
      .map(b => ({
        ...b,
        classrooms: b.classrooms.filter(
          c =>
            c.name.toLowerCase().includes(search) ||
            c.floor.toLowerCase().includes(search) ||
            c.type.toLowerCase().includes(search),
        ),
      }))
      .filter(b => b.classrooms.length > 0);
  }

  get totalClassrooms(): number {
    return this.filteredBuildings.reduce((acc, b) => acc + b.classrooms.length, 0);
  }

  get availableCount(): number {
    return this.filteredBuildings.reduce(
      (acc, b) => acc + b.classrooms.filter(c => c.available).length,
      0,
    );
  }

  onCampusChange(id: string): void {
    this.activeCampusId.set(id);
    this.activeBuilding.set('all');
    this.searchValue.set('');
  }

  onBuildingChange(val: string | number): void {
    this.activeBuilding.set(String(val));
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  onBooking(): void {
    this.toast.show('Funzione disponibile a breve - riservata a docenti e tecnici.', 'info', {
      duration: 4000,
    });
  }
}

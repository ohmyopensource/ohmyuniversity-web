import { Component, signal } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { LucideBuilding2, LucideGraduationCap, LucidePhone } from '@lucide/angular';
import { DepartmentsTabComponent } from '../components/departments-tab/departments-tab.component';
import { ProfessorsTabComponent } from '../components/professors-tab/professors-tab.component';
import { UsefulNumbersTabComponent } from '../components/useful-numbers-tab/useful-numbers-tab.component';

@Component({
  selector: 'app-university-contacts',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    DepartmentsTabComponent,
    ProfessorsTabComponent,
    UsefulNumbersTabComponent,
  ],
  templateUrl: './university-contacts.page.html',
})
export class UniversityContactsPage {
  readonly activeTab = signal<string>('departments');

  readonly tabs: TabItem[] = [
    { id: 'departments', label: 'Dipartimenti', icon: LucideBuilding2 },
    { id: 'professors', label: 'Docenti', icon: LucideGraduationCap },
    { id: 'useful', label: 'Numeri utili', icon: LucidePhone },
  ];

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }
}

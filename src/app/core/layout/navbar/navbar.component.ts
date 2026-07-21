import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideLayoutDashboard, LucideLogOut, LucideUserKey } from '@lucide/angular';
import { APP } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';

export interface NavLink {
  label: string;
  path: string;
  accent?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, CustomButtonComponent, CustomModalComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly APP = APP;
  private readonly auth = inject(AuthFacade);

  readonly iconMenu = LucideMenu;
  readonly iconDashboard = LucideLayoutDashboard;
  readonly iconLogout = LucideLogOut;
  readonly iconUserKey = LucideUserKey;

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Orientamento', path: '/orientamento' },
    { label: 'Chi Siamo', path: '/chi-siamo' },
    { label: 'Partner', path: '/partner', accent: true },
    { label: 'Contattaci', path: '/contatti' },
  ];

  get isLoggedIn(): boolean {
    return this.auth.hasValidSession();
  }

  logout(): void {
    this.auth.logout().subscribe();
  }
}

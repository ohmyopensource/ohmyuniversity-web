import { Component, signal, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LoginMode } from '@types';
import { RouterLink } from '@angular/router';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { LoginMarqueeComponent } from '../components/login-marquee/login-marquee.component';
import { UniversityLoginFormComponent } from '../components/university-login-form/university-login-form.component';
import { PartnerLoginFormComponent } from '../components/partner-login-form/partner-login-form.component';
import {
  ORGANIZATION,
  APP,
  UNIVERSITY_MARQUEE_IMAGES,
  UNIVERSITY_LOGIN_STATS,
  PARTNER_MARQUEE_IMAGES,
  PARTNER_LOGIN_STATS,
} from '@constants';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    CustomTabsComponent,
    LoginMarqueeComponent,
    UniversityLoginFormComponent,
    PartnerLoginFormComponent,
  ],
  templateUrl: './login.page.html',
})
export class LoginPage implements AfterViewInit, OnDestroy {
  readonly ORGANIZATION = ORGANIZATION;
  readonly APP = APP;

  readonly mode = signal<LoginMode>('university');

  readonly modeTabs = [
    { id: 'university', label: 'Università' },
    { id: 'partner', label: 'Partner' },
  ];

  readonly universityImages = UNIVERSITY_MARQUEE_IMAGES;
  readonly universityStats = UNIVERSITY_LOGIN_STATS;

  readonly partnerImages = PARTNER_MARQUEE_IMAGES;
  readonly partnerStats = PARTNER_LOGIN_STATS;

  @ViewChild('formContent') formContentRef?: ElementRef<HTMLDivElement>;
  readonly formHeight = signal<number>(400);
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    if (!this.formContentRef) return;

    this.resizeObserver = new ResizeObserver(entries => {
      const height = entries[0]?.contentRect.height;
      if (height) this.formHeight.set(height);
    });
    this.resizeObserver.observe(this.formContentRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  setMode(mode: string): void {
    this.mode.set(mode as LoginMode);
  }
}

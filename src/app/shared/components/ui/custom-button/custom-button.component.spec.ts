/**
 * @file custom-button.component.spec.ts
 * @description Unit tests for CustomButtonComponent covering rendering modes,
 * interaction states, icon display, accessibility attributes, and event emission.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  function setInput<K extends keyof CustomButtonComponent>(
    name: K,
    value: CustomButtonComponent[K],
  ): void {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a native button element when mode is link-internal', () => {
    setInput('mode', 'link-internal');
    setInput('href', '/home');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn).not.toBeNull();
  });

  it('should render a native button element when mode is link-internal', () => {
    setInput('mode', 'link-internal');
    setInput('href', '/home');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn).not.toBeNull();
  });

  it('should render an anchor button element when mode is link-external', () => {
    setInput('mode', 'link-external');
    setInput('href', 'https://example.com');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn).not.toBeNull();
  });

  it('should display the label text', () => {
    setInput('label', 'Clicca qui');
    const label = fixture.debugElement.query(By.css('.btn__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Clicca qui');
  });

  it('should display succeededLabel when succeeded is true and succeededLabel is set', () => {
    setInput('label', 'Salva');
    setInput('succeeded', true);
    setInput('succeededLabel', 'Salvato!');
    const label = fixture.debugElement.query(By.css('.btn__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Salvato!');
  });

  it('should display original label when succeeded is true but no succeededLabel is set', () => {
    setInput('label', 'Salva');
    setInput('succeeded', true);
    const label = fixture.debugElement.query(By.css('.btn__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Salva');
  });

  it('should apply btn--primary class by default', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--primary');
  });

  it('should apply the correct variant class', () => {
    setInput('variant', 'error');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--error');
  });

  it('should apply the correct size class', () => {
    setInput('size', 'lg');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--lg');
  });

  it('should apply btn--full-width class when fullWidth is true', () => {
    setInput('fullWidth', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--full-width');
  });

  it('should apply btn--dark class when darkTheme is true', () => {
    setInput('darkTheme', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--dark');
  });

  it('should apply btn--disabled class when disabled is true', () => {
    setInput('disabled', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--disabled');
  });

  it('should apply btn--loading class when loading is true', () => {
    setInput('loading', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--loading');
  });

  it('should apply btn--icon-only class when iconOnly is true', () => {
    setInput('iconOnly', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--icon-only');
  });

  it('should not apply variant class when succeeded is true', () => {
    setInput('variant', 'primary');
    setInput('succeeded', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).not.toContain('btn--primary');
  });

  it('should apply btn--succeeded-filled class when succeeded and succeededStyle is filled', () => {
    setInput('succeeded', true);
    setInput('succeededStyle', 'filled');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--succeeded-filled');
  });

  it('should apply btn--succeeded-ghost class when succeeded and succeededStyle is ghost', () => {
    setInput('succeeded', true);
    setInput('succeededStyle', 'ghost');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('btn--succeeded-ghost');
  });

  it('should set disabled attribute when disabled is true', () => {
    setInput('disabled', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.disabled).toBeTruthy();
  });

  it('should set disabled attribute when loading is true', () => {
    setInput('loading', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.disabled).toBeTruthy();
  });

  it('should set disabled attribute when succeeded is true', () => {
    setInput('succeeded', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.disabled).toBeTruthy();
  });

  it('should return true for isInert when disabled', () => {
    component.disabled = true;
    expect(component.isInert).toBeTruthy();
  });

  it('should return true for isInert when loading', () => {
    component.loading = true;
    expect(component.isInert).toBeTruthy();
  });

  it('should return true for isInert when succeeded', () => {
    component.succeeded = true;
    expect(component.isInert).toBeTruthy();
  });

  it('should return false for isInert when button is active', () => {
    component.disabled = false;
    component.loading = false;
    component.succeeded = false;
    expect(component.isInert).toBeFalsy();
  });

  it('should emit clicked event when button is clicked', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.onButtonClick(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit clicked event when button is disabled', () => {
    setInput('disabled', true);
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.onButtonClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT emit clicked event when button is loading', () => {
    setInput('loading', true);
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.onButtonClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT emit clicked event when button is succeeded', () => {
    setInput('succeeded', true);
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.onButtonClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should show spinner when loading is true', () => {
    setInput('loading', true);
    const spinner = fixture.debugElement.query(By.css('.btn__spinner'));
    expect(spinner).not.toBeNull();
  });

  it('should not show spinner when loading is false', () => {
    setInput('loading', false);
    const spinner = fixture.debugElement.query(By.css('.btn__spinner'));
    expect(spinner).toBeNull();
  });

  it('should set aria-busy="true" when loading', () => {
    setInput('loading', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should not set aria-busy when not loading', () => {
    setInput('loading', false);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-busy')).toBeNull();
  });

  it('should show success icon when succeeded is true and not loading', () => {
    setInput('succeeded', true);
    setInput('loading', false);
    const icon = fixture.debugElement.query(By.css('.btn__icon--left'));
    expect(icon).not.toBeNull();
  });

  it('should set aria-pressed="true" when succeeded', () => {
    setInput('succeeded', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-pressed')).toBe('true');
  });

  it('should set aria-label when ariaLabel is provided', () => {
    setInput('ariaLabel', 'Azione principale');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-label')).toBe('Azione principale');
  });

  it('should set aria-disabled="true" when inert', () => {
    setInput('disabled', true);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not set aria-disabled when button is active', () => {
    setInput('disabled', false);
    setInput('loading', false);
    setInput('succeeded', false);
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-disabled')).toBeNull();
  });

  it('should return "noopener noreferrer" for externalRel when target is _blank', () => {
    component.target = '_blank';
    expect(component.externalRel).toBe('noopener noreferrer');
  });

  it('should return empty string for externalRel when target is _self', () => {
    component.target = '_self';
    expect(component.externalRel).toBe('');
  });

  it('should return iconSize 14 for size xs', () => {
    component.size = 'xs';
    expect(component.iconSize).toBe(14);
  });

  it('should return iconSize 16 for size sm', () => {
    component.size = 'sm';
    expect(component.iconSize).toBe(16);
  });

  it('should return iconSize 18 for size md', () => {
    component.size = 'md';
    expect(component.iconSize).toBe(18);
  });

  it('should return iconSize 20 for size lg', () => {
    component.size = 'lg';
    expect(component.iconSize).toBe(20);
  });

  it('should set type="button" by default', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.type).toBe('button');
  });

  it('should set type="submit" when configured', () => {
    setInput('type', 'submit');
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.type).toBe('submit');
  });
});

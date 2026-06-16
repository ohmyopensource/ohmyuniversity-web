import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomModalComponent } from './custom-modal.component';

let component: CustomModalComponent;
let fixture: ComponentFixture<CustomModalComponent>;

function fakeAsync<T extends (...args: any[]) => void>(fn: T): T {
  return fn;
}

function tick(ms: number): void {
  vi.advanceTimersByTime(ms);
  fixture?.detectChanges();
}

describe('CustomModalComponent', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [CustomModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.clearAllTimers();
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render modal content when closed', () => {
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container).toBeNull();
  });

  it('should render modal content after open()', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container).not.toBeNull();
    tick(10);
  }));

  it('should render the backdrop after open()', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(backdrop).not.toBeNull();
    tick(10);
  }));

  it('should set isOpen to true after open()', fakeAsync(() => {
    component.open();
    expect(component.isOpen).toBe(true);
    tick(10);
  }));

  it('should not open again if already open', fakeAsync(() => {
    component.open();
    component.open();
    tick(10);
    expect(component.isOpen).toBe(true);
  }));

  it('should emit opened event after open()', fakeAsync(() => {
    const spy = vi.fn();
    component.opened.subscribe(spy);
    component.open();
    tick(10);
    expect(spy).toHaveBeenCalled();
  }));

  it('should lock document scroll when open() is called and lockScroll is true', fakeAsync(() => {
    fixture.componentRef.setInput('lockScroll', true);
    component.open();
    tick(10);
    expect(document.body.style.overflow).toBe('hidden');
  }));

  it('should not lock document scroll when lockScroll is false', fakeAsync(() => {
    fixture.componentRef.setInput('lockScroll', false);
    component.open();
    tick(10);
    expect(document.body.style.overflow).not.toBe('hidden');
  }));

  it('should close the modal after close()', fakeAsync(() => {
    component.open();
    tick(10);
    component.close();
    tick(300);
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  }));

  it('should emit closed event with reason after close()', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.open();
    tick(10);
    component.close('button');
    tick(300);
    expect(spy).toHaveBeenCalledWith('button');
  }));

  it('should emit closed with programmatic reason by default', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.open();
    tick(10);
    component.close();
    tick(300);
    expect(spy).toHaveBeenCalledWith('programmatic');
  }));

  it('should restore scroll after close()', fakeAsync(() => {
    fixture.componentRef.setInput('lockScroll', true);
    component.open();
    tick(10);
    component.close();
    tick(300);
    expect(document.body.style.overflow).toBe('');
  }));

  it('should not close if already closed', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.close();
    tick(300);
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should toggle open the modal when closed', fakeAsync(() => {
    component.toggle();
    tick(10);
    expect(component.isOpen).toBe(true);
  }));

  it('should toggle close the modal when open', fakeAsync(() => {
    component.open();
    tick(10);
    component.toggle();
    tick(300);
    expect(component.isOpen).toBe(false);
  }));

  it('should render the title when provided', fakeAsync(() => {
    fixture.componentRef.setInput('title', 'Titolo modale');
    component.open();
    fixture.detectChanges();
    tick(10);
    const title = fixture.nativeElement.querySelector('.modal-header__title');
    expect(title.textContent.trim()).toBe('Titolo modale');
  }));

  it('should not render title element when title is empty', fakeAsync(() => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('showCloseButton', false);
    component.open();
    fixture.detectChanges();
    tick(10);
    const title = fixture.nativeElement.querySelector('.modal-header__title');
    expect(title).toBeNull();
  }));

  it('should render the subtitle when provided', fakeAsync(() => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('subtitle', 'Sottotitolo');
    component.open();
    fixture.detectChanges();
    tick(10);
    const subtitle = fixture.nativeElement.querySelector('.modal-header__subtitle');
    expect(subtitle.textContent.trim()).toBe('Sottotitolo');
  }));

  it('should not render the header when title is empty and showCloseButton is false', fakeAsync(() => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('showCloseButton', false);
    component.open();
    fixture.detectChanges();
    tick(10);
    const header = fixture.nativeElement.querySelector('.modal-header');
    expect(header).toBeNull();
  }));

  it('should render close button when showCloseButton is true', fakeAsync(() => {
    fixture.componentRef.setInput('showCloseButton', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    const closeBtn = fixture.nativeElement.querySelector('.modal-header__close');
    expect(closeBtn).not.toBeNull();
  }));

  it('should not render close button when showCloseButton is false', fakeAsync(() => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('showCloseButton', false);
    component.open();
    fixture.detectChanges();
    tick(10);
    const closeBtn = fixture.nativeElement.querySelector('.modal-header__close');
    expect(closeBtn).toBeNull();
  }));

  it('should close modal when close button is clicked', fakeAsync(() => {
    fixture.componentRef.setInput('showCloseButton', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    const closeBtn = fixture.nativeElement.querySelector('.modal-header__close');
    closeBtn.click();
    tick(300);
    expect(component.isOpen).toBe(false);
  }));

  it('should emit closed with button reason when close button is clicked', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    fixture.componentRef.setInput('showCloseButton', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    fixture.nativeElement.querySelector('.modal-header__close').click();
    tick(300);
    expect(spy).toHaveBeenCalledWith('button');
  }));

  it('should close modal on backdrop click when closeOnBackdrop is true', fakeAsync(() => {
    fixture.componentRef.setInput('closeOnBackdrop', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    fixture.nativeElement.querySelector('.modal-backdrop').click();
    tick(300);
    expect(component.isOpen).toBe(false);
  }));

  it('should emit closed with backdrop reason on backdrop click', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    fixture.componentRef.setInput('closeOnBackdrop', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    component.onBackdropClick();
    tick(300);
    expect(spy).toHaveBeenCalledWith('backdrop');
  }));

  it('should not close on backdrop click when closeOnBackdrop is false', fakeAsync(() => {
    fixture.componentRef.setInput('closeOnBackdrop', false);
    fixture.componentRef.setInput('shakeOnPersist', false);
    component.open();
    tick(10);
    component.onBackdropClick();
    tick(300);
    expect(component.isOpen).toBe(true);
  }));

  it('should close on ESC key when closeOnEsc is true', fakeAsync(() => {
    fixture.componentRef.setInput('closeOnEsc', true);
    component.open();
    tick(10);
    component.onEscape();
    tick(300);
    expect(component.isOpen).toBe(false);
  }));

  it('should emit closed with esc reason on ESC key', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    fixture.componentRef.setInput('closeOnEsc', true);
    component.open();
    tick(10);
    component.onEscape();
    tick(300);
    expect(spy).toHaveBeenCalledWith('esc');
  }));

  it('should not close on ESC key when closeOnEsc is false', fakeAsync(() => {
    fixture.componentRef.setInput('closeOnEsc', false);
    fixture.componentRef.setInput('shakeOnPersist', false);
    component.open();
    tick(10);
    component.onEscape();
    tick(300);
    expect(component.isOpen).toBe(true);
  }));

  it('should not close on ESC when modal is not open', fakeAsync(() => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.onEscape();
    tick(300);
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should not close when persistent is true and backdrop is clicked', fakeAsync(() => {
    fixture.componentRef.setInput('persistent', true);
    fixture.componentRef.setInput('shakeOnPersist', false);
    component.open();
    tick(10);
    component.onBackdropClick();
    tick(300);
    expect(component.isOpen).toBe(true);
  }));

  it('should not close when persistent is true and ESC is pressed', fakeAsync(() => {
    fixture.componentRef.setInput('persistent', true);
    fixture.componentRef.setInput('shakeOnPersist', false);
    component.open();
    tick(10);
    component.onEscape();
    tick(300);
    expect(component.isOpen).toBe(true);
  }));

  it('should return true for hasHeader when title is set', () => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.detectChanges();
    expect(component.hasHeader).toBe(true);
  });

  it('should return true for hasHeader when showCloseButton is true', () => {
    fixture.componentRef.setInput('showCloseButton', true);
    fixture.detectChanges();
    expect(component.hasHeader).toBe(true);
  });

  it('should return false for hasHeader when title is empty and showCloseButton is false', () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('showCloseButton', false);
    fixture.detectChanges();
    expect(component.hasHeader).toBe(false);
  });

  it('should return px string for drawerSizeStyle when drawerSize is a number', () => {
    fixture.componentRef.setInput('drawerSize', 400);
    fixture.detectChanges();
    expect(component.drawerSizeStyle).toBe('400px');
  });

  it('should return the value as-is for drawerSizeStyle when drawerSize is a string', () => {
    fixture.componentRef.setInput('drawerSize', '40vw');
    fixture.detectChanges();
    expect(component.drawerSizeStyle).toBe('40vw');
  });

  it('should return auto for sheetSizeStyle when sheetSize is auto', () => {
    fixture.componentRef.setInput('sheetSize', 'auto');
    fixture.detectChanges();
    expect(component.sheetSizeStyle).toBe('auto');
  });

  it('should return px string for sheetSizeStyle when sheetSize is a number', () => {
    fixture.componentRef.setInput('sheetSize', 300);
    fixture.detectChanges();
    expect(component.sheetSizeStyle).toBe('300px');
  });

  it('should include modal-backdrop--dark in backdropClasses when darkTheme is true', fakeAsync(() => {
    fixture.componentRef.setInput('darkTheme', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    expect(backdrop.classList).toContain('modal-backdrop--dark');
  }));

  it('should include modal-container--dark in containerClasses when darkTheme is true', fakeAsync(() => {
    fixture.componentRef.setInput('darkTheme', true);
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.classList).toContain('modal-container--dark');
  }));

  it('should apply the correct type class on the container', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'drawer-right');
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.classList).toContain('modal-container--drawer-right');
  }));

  it('should apply size class on container when type is center', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'center');
    fixture.componentRef.setInput('size', 'lg');
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.classList).toContain('modal-container--lg');
  }));

  it('should not apply size class on container when type is not center', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'drawer-right');
    fixture.componentRef.setInput('size', 'lg');
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.classList).not.toContain('modal-container--lg');
  }));

  it('should set aria-modal="true" on modal container', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.getAttribute('aria-modal')).toBe('true');
  }));

  it('should set aria-label to title when title is provided', fakeAsync(() => {
    fixture.componentRef.setInput('title', 'Conferma azione');
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.getAttribute('aria-label')).toBe('Conferma azione');
  }));

  it('should set aria-label to default text when title is empty', fakeAsync(() => {
    fixture.componentRef.setInput('title', '');
    component.open();
    fixture.detectChanges();
    tick(10);
    const container = fixture.nativeElement.querySelector('.modal-container');
    expect(container.getAttribute('aria-label')).toBe('Finestra di dialogo');
  }));

  it('should render the modal-body element', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    tick(10);
    const body = fixture.nativeElement.querySelector('.modal-body');
    expect(body).not.toBeNull();
  }));

  it('should render the modal-footer element', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    tick(10);
    const footer = fixture.nativeElement.querySelector('.modal-footer');
    expect(footer).not.toBeNull();
  }));
});

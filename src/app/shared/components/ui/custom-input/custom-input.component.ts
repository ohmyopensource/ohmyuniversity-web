/**
 * @file custom-input.component.ts
 * @description
 * Highly configurable Angular form control supporting multiple input types
 * (text, textarea, select, password, etc.), validation states, icons,
 * prefix/suffix decorations, and full ControlValueAccessor integration.
 *
 * Designed for design system usage with consistent UI/UX behavior,
 * accessibility support, and dark mode compatibility.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideEye,
  LucideEyeOff,
  LucideX,
  LucideCircleAlert,
  LucideCircleCheck,
} from '@lucide/angular';

/**
 * Supported input rendering modes.
 *
 * Determines both HTML element type and internal behavior
 * (e.g. text field, textarea, select, password toggle logic).
 */
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'number'
  | 'url'
  | 'search'
  | 'textarea'
  | 'select';

/**
 * Defines the visual size scale of the input component.
 *
 * Controls spacing, typography scale, and overall density.
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Defines the visual accent variant used for focus, borders and states.
 *
 * Typically aligned with design system semantic colors.
 */
export type InputVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Represents the semantic validation state of the input.
 *
 * Used internally to resolve visual feedback (border, icon, messages).
 */
export type InputStatus = 'default' | 'success' | 'error';

/**
 * Option model used by select-type inputs.
 *
 * Represents a single selectable item within dropdown lists.
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * A highly configurable form control supporting multiple input types,
 * validation states, icons, and full integration with Angular Forms API.
 *
 * Implements ControlValueAccessor to behave as a native form control.
 */
@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideDynamicIcon],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly iconEye = LucideEye;
  readonly iconEyeOff = LucideEyeOff;
  readonly iconClear = LucideX;
  readonly iconError = LucideCircleAlert;
  readonly iconSuccess = LucideCircleCheck;

  /**
   * Defines the input type and its rendering behavior.
   */
  @Input() type: InputType = 'text';

  /**
   * Primary label displayed above the input field.
   */
  @Input() label: string = '';

  /**
   * Placeholder text shown when the field is empty.
   */
  @Input() placeholder: string = '';

  /**
   * Helper text displayed below the input for guidance.
   */
  @Input() hint: string = '';

  /**
   * Error message used to indicate invalid state.
   */
  @Input() errorMessage: string = '';

  /**
   * Success message used to indicate valid state.
   */
  @Input() successMessage: string = '';

  /**
   * Options used when rendering a select input.
   */
  @Input() options: SelectOption[] = [];

  /**
   * Placeholder displayed for select inputs.
   */
  @Input() selectPlaceholder: string = 'Seleziona';

  /**
   * Visual variant used for focus and semantic coloring.
   */
  @Input() variant: InputVariant = 'primary';

  /**
   * Controls the size and density of the input field.
   */
  @Input() size: InputSize = 'md';

  /**
   * If true, input stretches to fill container width.
   */
  @Input() fullWidth: boolean = true;

  /**
   * Enables dark theme styling for this instance.
   */
  @Input() darkTheme: boolean = false;

  /**
   * Icon displayed on the left side of the input.
   */
  @Input() iconLeft: any = null;

  /**
   * Icon displayed on the right side of the input.
   * Ignored when conflicting behaviors (password/clearable) are active.
   */
  @Input() iconRight: any = null;

  /**
   * Text prefix displayed inside the input (e.g. https://, €).
   */
  @Input() prefix: string = '';

  /**
   * Text suffix displayed inside the input (e.g. kg, %).
   */
  @Input() suffix: string = '';

  /**
   * Enables clear button when input has a value.
   */
  @Input() clearable: boolean = false;

  /**
   * Disables user interaction with the input.
   */
  @Input() disabled: boolean = false;

  /**
   * Makes input read-only (value cannot be modified).
   */
  @Input() readonly: boolean = false;

  /**
   * Marks the field as required (UI-level indicator only).
   */
  @Input() required: boolean = false;

  /**
   * Number of rows used when type is textarea.
   */
  @Input() rows: number = 4;

  /**
   * Native HTML autocomplete attribute.
   */
  @Input() autocomplete: string = 'off';

  /**
   * Unique identifier used to bind label and input elements.
   */
  @Input() inputId: string = `input-${Math.random().toString(36).slice(2, 7)}`;

  /**
   * Minimum numeric value (for number-based inputs).
   */
  @Input() min: string | number = '';

  /**
   * Maximum numeric value (for number-based inputs).
   */
  @Input() max: string | number = '';

  /**
   * Minimum allowed string length.
   */
  @Input() minLength: number = 0;

  /**
   * Maximum allowed string length.
   */
  @Input() maxLength: number = 0;

  /**
   * Regex pattern used for validation.
   */
  @Input() pattern: string = '';

  /**
   * Emitted whenever the input value changes.
   */
  @Output() inputChange = new EventEmitter<string | number>();

  /**
   * Emitted when input receives focus.
   */
  @Output() inputFocus = new EventEmitter<FocusEvent>();

  /**
   * Emitted when input loses focus.
   */
  @Output() inputBlur = new EventEmitter<FocusEvent>();

  /**
   * Emitted when Enter key is pressed.
   */
  @Output() inputEnter = new EventEmitter<KeyboardEvent>();

  /**
   * Emitted when the clear action is triggered.
   */
  @Output() cleared = new EventEmitter<void>();

  /** Current value of the control. */
  value: string | number = '';

  /** Tracks focus state for UI styling. */
  isFocused = signal(false);

  /** Controls password visibility toggle state. */
  showPassword = signal(false);

  /**
   * Internal callback triggered when value changes from the view.
   */
  private onChange: (val: any) => void = () => {};

  /**
   * Internal callback triggered when control is touched.
   */
  private onTouched: () => void = () => {};

  /**
   * Writes a value from the form model into the view.
   *
   * @param val Value coming from Angular forms.
   * @returns void
   */
  writeValue(val: any): void {
    this.value = val ?? '';
    this.cdr.markForCheck();
  }

  /**
   * Registers a handler to propagate value changes to Angular forms.
   *
   * @param fn Callback function provided by Angular Forms API.
   * @returns void
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a handler to mark the control as touched.
   *
   * @param fn Callback function provided by Angular Forms API.
   * @returns void
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Updates disabled state of the control.
   *
   * @param disabled Whether the control should be disabled.
   * @returns void
   */
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  /**
   * Handles native input event and propagates value changes.
   *
   * @param event DOM input event.
   * @returns void
   */
  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.inputChange.emit(val);
    this.cdr.markForCheck();
  }

  /**
   * Handles focus event and updates internal UI state.
   *
   * @param event Focus event.
   * @returns void
   */
  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  /**
   * Handles blur event and marks control as touched.
   *
   * @param event Blur event.
   * @returns void
   */
  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  /**
   * Handles keyboard interaction (Enter key submission hook).
   *
   * @param event Keyboard event.
   * @returns void
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.inputEnter.emit(event);
  }

  /**
   * Clears the current input value and resets internal state.
   *
   * @returns void
   */
  onClear(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
    this.cleared.emit();
    this.cdr.markForCheck();
  }

  /**
   * Toggles password visibility for password input type.
   *
   * @returns void
   */
  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  /**
   * Resolves the effective input type based on component state.
   *
   * Handles special cases such as password visibility toggle
   * and non-native input types (textarea, select).
   *
   * @returns HTML input type used for rendering.
   */
  get effectiveType(): string {
    if (this.type === 'password') return this.showPassword() ? 'text' : 'password';
    if (this.type === 'textarea' || this.type === 'select') return this.type;
    return this.type;
  }

  /**
   * Computes the current validation status of the input.
   *
   * @returns InputStatus representing visual feedback state.
   */
  get status(): InputStatus {
    if (this.errorMessage) return 'error';
    if (this.successMessage) return 'success';
    return 'default';
  }

  /**
   * Returns icon size based on configured input size.
   *
   * @returns Size in pixels used for Lucide icons.
   */
  get iconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /**
   * Determines whether the clear button should be visible.
   *
   * @returns True if clear button should be rendered.
   */
  get showClearBtn(): boolean {
    return this.clearable && !!this.value && !this.disabled && !this.readonly;
  }

  /**
   * Determines whether password visibility toggle should be shown.
   *
   * @returns True if input type is password.
   */
  get showPasswordToggle(): boolean {
    return this.type === 'password';
  }

  /**
   * Computes wrapper container classes.
   *
   * @returns Space-separated CSS class string.
   */
  get wrapperClasses(): string {
    return [
      'ci-wrapper',
      this.fullWidth ? 'ci-wrapper--full' : '',
      this.darkTheme ? 'ci-wrapper--dark' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Computes input field classes based on state and configuration.
   *
   * @returns Space-separated CSS class string.
   */
  get fieldClasses(): string {
    return [
      'ci-field',
      `ci-field--${this.size}`,
      `ci-field--${this.variant}`,
      `ci-field--${this.status}`,
      this.isFocused() ? 'ci-field--focused' : '',
      this.disabled ? 'ci-field--disabled' : '',
      this.readonly ? 'ci-field--readonly' : '',
      this.iconLeft ? 'ci-field--icon-left' : '',
      this.iconRight || this.showClearBtn || this.showPasswordToggle || this.suffix
        ? 'ci-field--icon-right'
        : '',
      this.prefix ? 'ci-field--has-prefix' : '',
      this.darkTheme ? 'ci-field--dark' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

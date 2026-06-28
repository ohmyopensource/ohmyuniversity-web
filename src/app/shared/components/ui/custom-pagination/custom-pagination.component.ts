/**
 * @file custom-pagination.component.ts
 * @description Pagination component providing page navigation, page size control,
 * and intelligent page range rendering with ellipsis support.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideDynamicIcon,
} from '@lucide/angular';
import { ButtonVariant } from '../custom-button/custom-button.component';

/**
 * Available pagination component sizes.
 */
export type PaginationSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Visual emphasis applied to the active page indicator. It defines how strongly
 * the current page is highlighted within the pagination controls, ranging from
 * a fully filled and elevated style to a minimal text-only representation without
 * any background or shadow.
 */
export type PaginationEmphasis = 'filled' | 'soft' | 'minimal';

/**
 * Representation of a pagination entry used to render the navigation structure.
 * Each item corresponds either to an actual page number that can be selected
 * by the user, or to an ellipsis placeholder used to indicate a skipped range
 * of pages in the pagination sequence.
 */
export type PageItem = { type: 'page'; value: number } | { type: 'ellipsis'; id: string };

/**
 * Pagination component used to navigate large datasets in a structured and
 * predictable way. It supports configurable page size, dynamic page range
 * rendering with ellipsis compression, and optional controls such as jump-to-page,
 * first/last navigation, and page size selection.
 */
@Component({
  selector: 'app-custom-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideDynamicIcon],
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPaginationComponent implements OnChanges {
  readonly iconFirst = LucideChevronsLeft;
  readonly iconPrev = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;
  readonly iconLast = LucideChevronsRight;

  /** Total number of items in the dataset. */
  @Input() totalItems: number = 0;

  /** Number of items per page. */
  @Input() pageSize: number = 10;

  /** Current page (1-based index). */
  @Input() currentPage: number = 1;

  /** Available page size options. */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  /** Maximum number of visible page buttons before ellipsis is used. */
  @Input() maxVisiblePages: number = 5;

  /** Whether to show page size selector. */
  @Input() showPageSizeSelector: boolean = true;

  /** Whether to show pagination info (range + total). */
  @Input() showInfo: boolean = true;

  /** Whether to show first/last page buttons. */
  @Input() showFirstLast: boolean = true;

  /** Whether to show jump-to-page input. */
  @Input() showJumpToPage: boolean = false;

  /** Disables all pagination interactions. */
  @Input() disabled: boolean = false;

  /** Visual variant aligned with button system. */
  @Input() variant: ButtonVariant = 'primary';

  /** Component size. */
  @Input() size: PaginationSize = 'md';

  /** Active page emphasis style. */
  @Input() emphasis: PaginationEmphasis = 'filled';

  /** Enables dark theme styling. */
  @Input() darkTheme: boolean = false;

  /**
   * Whether to show first/last page buttons on mobile.
   * Defaults to false to preserve space on small screens.
   */
  @Input() showFirstLastOnMobile: boolean = false;

  /**
   * Emitted when page changes.
   * @param page - Selected page (1-based index)
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Emitted when page size changes.
   * @param size - New page size value
   */
  @Output() pageSizeChange = new EventEmitter<number>();

  jumpValue: number | null = null;

  /**
   * Total number of pages.
   * @returns Number of pages based on totalItems and pageSize
   */
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  /** Whether current page is the first page. */
  get isFirst(): boolean {
    return this.currentPage <= 1;
  }

  /** Whether current page is the last page. */
  get isLast(): boolean {
    return this.currentPage >= this.totalPages;
  }

  /**
   * Starting index of current page range (1-based).
   * @returns First visible item index
   */
  get rangeStart(): number {
    return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  /**
   * Ending index of current page range (1-based).
   * @returns Last visible item index
   */
  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  /**
   * Builds pagination structure with pages and ellipsis.
   * Ensures first and last page are always visible and applies
   * sliding window logic around current page.
   *
   * @returns Array of PageItem used for rendering pagination UI
   */
  get pageItems(): PageItem[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const max = this.maxVisiblePages;

    if (total <= max) {
      return this.range(1, total).map(v => ({ type: 'page', value: v }));
    }

    const inner = max - 2;
    const half = Math.floor(inner / 2);

    let start = Math.max(2, current - half);
    let end = start + inner - 1;

    if (end >= total) {
      end = total - 1;
      start = Math.max(2, end - inner + 1);
    }

    const items: PageItem[] = [];
    items.push({ type: 'page', value: 1 });

    if (start > 2) items.push({ type: 'ellipsis', id: 'left' });

    for (const v of this.range(start, end)) {
      items.push({ type: 'page', value: v });
    }

    if (end < total - 1) items.push({ type: 'ellipsis', id: 'right' });

    items.push({ type: 'page', value: total });

    return items;
  }

  /** Icon size based on component size. */
  get iconSize(): number {
    const map: Record<PaginationSize, number> = { xs: 12, sm: 14, md: 16, lg: 18 };
    return map[this.size];
  }

  /** Host CSS classes. */
  get hostClasses(): Record<string, boolean> {
    return {
      pagination: true,
      [`pagination--${this.size}`]: true,
      [`pagination--${this.variant}`]: true,
      [`pagination--${this.emphasis}`]: true,
      'pagination--dark': this.darkTheme,
      'pagination--disabled': this.disabled,
      'pagination--hide-first-last-mobile': !this.showFirstLastOnMobile,
    };
  }

  /**
   * Synchronizes internal state when inputs change.
   *
   * @param changes - Angular SimpleChanges object
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize']) {
      this.jumpValue = null;
    }
    if (this.currentPage > this.totalPages) {
      setTimeout(() => this.goTo(this.totalPages));
    }
  }

  /**
   * Navigates to a specific page.
   *
   * @param page - Target page (1-based index)
   */
  goTo(page: number): void {
    if (this.disabled) return;
    const clamped = Math.max(1, Math.min(page, this.totalPages));
    if (clamped === this.currentPage) return;
    this.pageChange.emit(clamped);
  }

  /** Navigates to first page. */
  goFirst(): void {
    this.goTo(1);
  }

  /** Navigates to previous page. */
  goPrev(): void {
    this.goTo(this.currentPage - 1);
  }

  /** Navigates to next page. */
  goNext(): void {
    this.goTo(this.currentPage + 1);
  }

  /** Navigates to last page. */
  goLast(): void {
    this.goTo(this.totalPages);
  }

  /**
   * Executes jump-to-page action.
   */
  onJump(): void {
    if (this.jumpValue == null) return;
    this.goTo(this.jumpValue);
    this.jumpValue = null;
  }

  /**
   * Handles keyboard interaction for jump input.
   *
   * @param event - Keyboard event
   */
  onJumpKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.onJump();
  }

  /**
   * Handles page size change.
   *
   * @param event - Select change event
   */
  onPageSizeChange(event: Event): void {
    if (this.disabled) return;
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
    this.pageChange.emit(1);
  }

  /** Type guard for ellipsis items. */
  isEllipsis(item: PageItem): item is { type: 'ellipsis'; id: string } {
    return item.type === 'ellipsis';
  }

  /** Type guard for page items. */
  isPageItem(item: PageItem): item is { type: 'page'; value: number } {
    return item.type === 'page';
  }

  /**
   * Creates a numeric range.
   *
   * @param from - Start value
   * @param to - End value
   * @returns Array of numbers in range
   */
  private range(from: number, to: number): number[] {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }

  /**
   * TrackBy function for Angular rendering optimization.
   *
   * @param _ - Index
   * @param item - Pagination item
   * @returns Unique key
   */
  trackByItem(_: number, item: PageItem): string {
    return item.type === 'page' ? `page-${item.value}` : `ellipsis-${item.id}`;
  }
}

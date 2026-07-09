/**
 * @file skeleton-if.directive.ts
 * @description
 * Structural directive that toggles between a skeleton placeholder template
 * and the projected content based on a loading condition, avoiding repeated
 * `@if (loading) { ... } @else { ... }` blocks across templates.
 */

import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

/**
 * Structural directive used as `*ohmySkeleton="isLoading; skeleton skeletonTpl"`.
 * Renders the provided skeleton template while `isLoading` is true, and
 * swaps to the host template (the actual content) once loading completes.
 *
 * Usage:
 * ```html
 * <div *ohmySkeleton="isLoading(); skeleton skeletonTpl">
 *   {{ data().title }}
 * </div>
 * <ng-template #skeletonTpl>
 *   <app-custom-skeleton variant="text" [count]="3" />
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[ohmySkeleton]',
  standalone: true,
})
export class SkeletonIfDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private hasRenderedContent = false;
  private hasRenderedSkeleton = false;
  private skeletonTemplateRef: TemplateRef<unknown> | null = null;
  private loading = true;

  /** Loading condition: true shows the skeleton, false shows the projected content. */
  @Input() set ohmySkeleton(value: boolean) {
    this.loading = value;
    this.updateView();
  }

  /** Template rendered while the loading condition is true. */
  @Input() set ohmySkeletonSkeleton(template: TemplateRef<unknown> | null) {
    this.skeletonTemplateRef = template;
    this.updateView();
  }

  /**
   * Renders either the skeleton template or the host content template,
   * clearing the view container only when a switch is actually needed.
   *
   * @returns Void.
   */
  private updateView(): void {
    if (this.loading) {
      if (!this.hasRenderedSkeleton && this.skeletonTemplateRef) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.skeletonTemplateRef);
        this.hasRenderedSkeleton = true;
        this.hasRenderedContent = false;
      }
    } else if (!this.hasRenderedContent) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasRenderedContent = true;
      this.hasRenderedSkeleton = false;
    }
  }
}

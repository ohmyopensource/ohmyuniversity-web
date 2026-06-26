import { LinkBase, LabeledValue } from '@shared/types';

/** Legal cookie table row */
export interface LegalCookieTable {
  name: string;
  purpose: string;
  duration: string;
}

/** Legal navigation link */
export interface LegalListItem extends LinkBase {
  isExternal?: boolean;
}

/** Legal labeled text item - alias of LabeledValue */
export type LegalLabeledItem = LabeledValue;

/** Legal table row - alias of LabeledValue */
export type LegalTableRow = LabeledValue;

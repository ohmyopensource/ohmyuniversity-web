import { Icon } from '@shared/types';

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: Icon;
  color: string;
  hovered?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  hovered?: boolean;
}

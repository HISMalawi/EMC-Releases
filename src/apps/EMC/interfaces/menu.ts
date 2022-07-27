export interface MenuItem {
  title: string;
  id: string;
  url?: string;
  icon?: string;
  img?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}
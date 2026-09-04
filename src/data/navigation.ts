export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export const primaryNavigation: readonly NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/schedule/' },
  { label: 'Speakers', href: '/speakers/' },
];

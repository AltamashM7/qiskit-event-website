export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export const primaryNavigation: readonly NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Event', href: '/about-event/' },
  { label: 'About Quantum Mechanics', href: '/about-quantum-mechanics/' },
];

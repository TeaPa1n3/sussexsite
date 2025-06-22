interface EventButton {
  icon: 'rsvp' | 'map' | 'notes';
  label: string;
  url: string;
  isVisible?: boolean;
}

export interface MemberEvent {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  type: 'Public Event' | 'Private Event';
  buttons: EventButton[];
}
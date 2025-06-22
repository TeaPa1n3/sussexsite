// Easy to modify polls configuration
export const polls = [
  {
    id: 'training-times-2024',
    title: 'Potential Event Interest',
    description: 'Bramber Castle, 20/07/25, one day, LH & Combat?',
    options: [
      { id: '1', text: 'Yes I could attend' },
      { id: '2', text: 'No I cannot' },
    ],
    // Set to false to close the poll
    isActive: true,
    // Optional closing date (null for no end date)
    endsAt: null
  },
  {
    id: 'event-preferences',
    title: 'Event Preferences Survey',
    description: 'Which types of events would you like to see more of?',
    options: [
      { id: '1', text: 'Large battle reenactments' },
      { id: '2', text: 'Small local displays' },
      { id: '3', text: 'Living history focused events' },
      { id: '4', text: 'Training workshops' }
    ],
    isActive: true,
    endsAt: null
  }
];
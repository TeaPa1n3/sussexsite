export const announcements = [
  {
    id: 'battle-of-lewes-food',
    isActive: false,
    type: 'info',
    title: 'Battle of Lewes - Food Plan & notes',
    message: 'Tara has formulated the authentic food plan for the Battle of Lewes. Please have a look. There will also be additional pickled goods provided by Holly and Benn. Cost is £6 per head, per day.',
    date: '2025-05-15',
    buttons: {
      primary: {
        isVisible: true,
        label: 'Food plan & Notes',
        url: 'https://docs.google.com/document/d/13Tecmlvn-gqpNUEdmQ0OTr0RxIbhQG5_/edit?usp=sharing&ouid=104012576232039115956&rtpof=true&sd=true'
      },
      file: {
        isVisible: true,
        label: 'Sign Up',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfYf9FjClkbYO2bA7_mdUEMVjISDx-PCa6wKyrpXXqNX6L-Dw/viewform?usp=dialog'
      },
      payment: {
        isVisible: true,
        label: 'Pay Now',
        price: 6,
        modalContent: {
          title: 'Payment Details',
          description: 'Make Payment for authentic food:',
          accountName: 'BENN CW BELL',
          accountNumber: '41532872',
          sortCode: '60-13-09',
          referenceFormat: '[Your Name] BOL Food',
          priceLabel: 'Price Per Day'
        }
      }
    }
  },
  {
    id: 'membership-renewal',
    isActive: false,
    type: 'warning',
    title: 'Membership Renewal',
    message: 'Membership payment is now due for 2025-26. Click on the renew now button for payment information.',
    date: '2025-12-01',
    buttons: {
      primary: {
        isVisible: false,
        label: 'Renew Now',
        url: 'https://forms.gle/your-registration-form'
      },
      file: {
        isVisible: false,
        label: 'Download Form',
        url: ''
      },
      payment: {
        isVisible: true,
        label: 'Renew Now',
        price: 30,
        modalContent: {
          title: 'Membership Payment Details',
          description: 'Annual Membership Payment for 2025-26:',
          accountName: 'BENN CW BELL',
          accountNumber: '41532872',
          sortCode: '60-13-09',
          referenceFormat: '[Your Name] INS',
          priceLabel: 'Membership Fee'
        }
      }
    }
  }
];
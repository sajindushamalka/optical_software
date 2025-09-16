const CashierMenuItem = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'invoice',
          title: 'Invoice',
          type: 'collapse',
          icon: 'fas fa-shopping-cart',
          children: [
            {
              id: 'full_invoice',
              title: 'Full Invoice',
              type: 'item',
              icon: 'fas fa-file-invoice',
              url: '/cashier/invoice'
            },
            {
              id: 'advance',
              title: 'Receipt Invoices',
              type: 'item',
              icon: 'fas fa-spinner',
              url: '/cashier/ongoing'
            },
          ]
        },
        {
          id: 'claims',
          title: 'Claim Bills',
          type: 'item',
          icon: 'fas fa-balance-scale',
          url: '/cashier/claims'
        },
        {
          id: 'history',
          title: 'History',
          type: 'item',
          icon: 'fas fa-history',
          url: '/cashier/history'
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'item',
          icon: 'fas fa-sign-out-alt',
          url: '/logout'
        },
      ]
    },

  ]
};

export default CashierMenuItem;

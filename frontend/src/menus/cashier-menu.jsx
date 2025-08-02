const CashierMenuItem = {
    items: [
      {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: 'feather icon-home',
            url: '/cashier/dashboard'
          },
          {
            id: 'invoice',
            title: 'Invoice',
            type: 'item',
             icon: 'fas fa-file-invoice',
            url: '/cashier/invoice'
          }, 
          {
            id: 'ongoing',
            title: 'On Going',
            type: 'item',
             icon: 'fas fa-spinner',
            url: '/cashier/ongoing'
          }, 
          {
            id: 'history',
            title: 'History',
            type: 'item',
             icon: 'fas fa-history',
            url: '/cashier/history'
          }, 
        ]
      },
      
    ]
  };
  
  export default CashierMenuItem;
  
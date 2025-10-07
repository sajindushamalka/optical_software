const RootAdminMenu = {
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
          url: '/rootadmin'
        },
        {
          id: 'logout',
          title: 'Log Out',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/logoutO'
        },
      ]
    },
    {
      id: 'invoicereport',
      title: 'Invoice Reports',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'sections',
          title: 'Admin Reports',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'monthlyreport',
              title: 'Sales Report',
              type: 'item',
              icon: 'feather icon-file-text',   // document-like icon
              url: '/rootadmin/invoice/sales'
            },
            {
              id: 'editreport',
              title: 'Edit Report',
              type: 'item',
              icon: 'feather icon-edit',   // pencil/edit icon
              url: '/rootadmin/invoice/edit'
            }

          ]
        }
      ]
    },
    {
      id: 'controls',
      title: 'Controls',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'sections2',
          title: 'Admin Items',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'assistances',
              title: 'Assistance Details',
              type: 'item',
              icon: 'feather icon-users',
              url: '/rootadmin/assistance'
            },
            {
              id: 'lenses',
              title: 'Lenses',
              type: 'item',
              icon: 'feather icon-eye',
              url: '/rootadmin/lense'
            },
            {
              id: 'frame',
              title: 'Frame',
              type: 'item',
              icon: 'feather icon-square',
              url: '/rootadmin/frame'
            },
            {
              id: 'users',
              title: 'Users',
              type: 'item',
              icon: 'feather icon-user',
              url: '/rootadmin/users'
            },
            {
              id: 'inventory',
              title: 'Inventory',
              type: 'item',
              icon: 'feather icon-box',
              url: '/rootadmin/inventory'
            },
            {
              id: 'invoice',
              title: 'Invoice',
              type: 'item',
              icon: 'feather icon-file-text',
              url: '/rootadmin/invoice'
            },
            {
              id: 'contact',
              title: 'Contact Lense',
              type: 'item',
              icon: 'feather icon-activity',
              url: '/rootadmin/conactlens'
            },

          ]
        }
      ]
    }
  ]
};

export default RootAdminMenu;

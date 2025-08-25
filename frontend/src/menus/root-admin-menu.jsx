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
          id: 'logout',
          title: 'Log Out',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/logoutO'
        },
      ]
    },
  ]
};

export default RootAdminMenu;

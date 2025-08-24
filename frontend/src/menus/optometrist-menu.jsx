const OptometristMenuItem = {
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
            url: '/optometrist/dashboard'
          },
          {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            icon: 'fas fa-shopping-cart',
            url: '/optometrist/orders'
          },
          {
            id: 'logout',
            title: 'Log Out',
            type: 'item',
            icon: 'fas fa-sign-out-alt',
            url: '/logoutO'
          },
        ]
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'group',
        icon: 'icon-ui',
        children: [
          {
            id: 'sections',
            title: 'Sections',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Button',
                type: 'item',
                url: '/basic/button'
              },
              {
                id: 'badges',
                title: 'Badges',
                type: 'item',
                url: '/basic/badges'
              },
              {
                id: 'breadcrumb',
                title: 'Breadcrumb & Pagination',
                type: 'item',
                url: '/basic/breadcrumb-paging'
              },
              {
                id: 'collapse',
                title: 'Collapse',
                type: 'item',
                url: '/basic/collapse'
              },
              {
                id: 'tabs-pills',
                title: 'Tabs & Pills',
                type: 'item',
                url: '/basic/tabs-pills'
              },
              {
                id: 'typography',
                title: 'Typography',
                type: 'item',
                url: '/basic/typography'
              }
            ]
          }
        ]
      }
    ]
  };
  
  export default OptometristMenuItem;
  
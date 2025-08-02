const AssistanceMenuItem = {
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
            url: '/basic/button'
          },
          {
            id: 'orders',
            title: 'Orders',
            type: 'collapse',
            icon: 'fas fa-shopping-cart',
            children:[
               {
                id: 'New_Order',
                title: 'New Order',
                type: 'item',
                url: '/assistance/order',
              },
              {
                id: 'All_Orders',
                title: 'All Orders',
                type: 'item',
                url: '/assistance/order/all'
              },
            ]
          },
          {
            id: 'invoice',
            title: 'Invoice',
            type: 'item',
             icon: 'fas fa-file-invoice',
            url: '/assistance/invoice'
          }, 
          {
            id: 'prescription',
            title: 'Prescription',
            type: 'item',
            icon: 'fas fa-first-aid',
            url: '/basic/badges'
          },
          {
            id: 'sales',
            title: 'Sales',
            type: 'item',
            icon: 'fas fa-chart-line',
            url: '/basic/badges'
          }
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
  
  export default AssistanceMenuItem;
  
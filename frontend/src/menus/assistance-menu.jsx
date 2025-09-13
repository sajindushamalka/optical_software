const AssistanceMenuItem = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        // {
        //   id: 'dashboard',
        //   title: 'Dashboard',
        //   type: 'item',
        //   icon: 'feather icon-home',
        //   url: '/basic/button'
        // },
        {
          id: 'orders',
          title: 'Orders',
          type: 'collapse',
          icon: 'fas fa-shopping-cart',
          children: [
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
          title: 'Process Orders',
          type: 'item',
          icon: 'fas fa-file-invoice',
          url: '/assistance/invoice'
        },
        {
          id: 'prescription',
          title: 'Prescription',
          type: 'item',
          icon: 'fas fa-first-aid',
          url: '/assistance/prescriptions'
        },
        {
          id: 'factory',
          title: 'Factory',
          type: 'item',
          icon: 'fas fa-chart-line',
          url: '/assistance/factory'
        },
         {
          id: 'job_status',
          title: 'Job Status',
          type: 'item',
          icon: 'fas fa-tasks',
          url: '/assistance/job'
        },
        {
          id: 'logout',
          title: 'Log Out',
          type: 'item',
          icon: 'fas fa-sign-out-alt',
          url: '/logout'
        },
      ]
    },
    // {
    //   id: 'reports',
    //   title: 'Reports',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'sections',
    //       title: 'Sections',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb',
    //           title: 'Breadcrumb & Pagination',
    //           type: 'item',
    //           url: '/basic/breadcrumb-paging'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'tabs-pills',
    //           title: 'Tabs & Pills',
    //           type: 'item',
    //           url: '/basic/tabs-pills'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
};

export default AssistanceMenuItem;

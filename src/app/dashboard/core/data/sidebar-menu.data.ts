import { MenuItem } from "primeng/api";

export const sidebarMenu: MenuItem[] = [
  {
    label: 'menu.menu',
    items: [
      {
        label: 'سرباز ها ',
        icon: 'fa-duotone fa-user',

        items: [
          {
            label: 'سربازها',
            routerLink: ['/dashboard/posts']
          },
          {
            label: 'افزودن سرباز',
            routerLink: ['/dashboard/posts/create']
          }
        ]
      },
      {
        label: 'دوره ها',
        icon: 'fa-regular fa-grid-2',
        routerLink: ['/dashboard/categories']
      },
      // {
      //   label: 'نظرات',
      //   icon: 'fa-regular fa-code',
      //   routerLink: ['/dashboard/comments']
      // },
      {
        label: 'menu.users',
        icon: 'fa-duotone fa-user',

        items: [
          {
            label: 'menu.user',
            routerLink: ['/dashboard/profile']
          }
        ]
      }
    ]
  },
  {
    // label: 'menu.Profile',
    items: [
    
      {
        label: 'menu.Logout',
        icon: 'fa-duotone fa-arrow-up-left-from-circle',
        command() {
          // localStorage.removeItem('accessToken')
        },
        routerLink: ['/auth']
      }
    ]
  }
]


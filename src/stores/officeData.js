import { defineStore } from 'pinia'

export const useOfficeStore = defineStore('officeStore', {
  state: () => ({
    office: [
      {
        id: 1,
        name: 'Nexus Poperty Agency Co., Ltd.',
        short_name: 'NPA',
      },
      {
        id: 2,
        name: 'Nexus Property Consultants Co., Ltd.',
        short_name: 'NPC',
      },
      {
        id: 3,
        name: 'Nexus Property Marketing Co., Ltd',
        short_name: 'NPM',
      },
      {
        id: 4,
        name: 'Nexus Real Estate Advisory Co., Ltd',
        short_name: 'NRA',
      },
      {
        id: 5,
        name: 'Nexus Retail Advisory Co., Ltd.',
        short_name: 'NRT',
      },
      {
        id: 6,
        name: 'OHO Service Co.,Ltd.',
        short_name: 'OHO',
      },
      {
        id: 7,
        name: 'Conspire',
        short_name: 'CONSPIRE',
      },
    ],
  }),
})

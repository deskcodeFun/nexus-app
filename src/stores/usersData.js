import { defineStore } from 'pinia'

export const usersStore = defineStore('userStore', {
  state: () => ({
    users: [
      {
        id: 1,
        fname: 'Sumita',
        lname: 'Khongnok',
        email: 'sumita@nexus.co.th',
        department: 'Finance & Accounting',
        office_id: 'NPC',
      },
      {
        id: 2,
        fname: 'Nattapon',
        lname: 'Muangnanta',
        email: 'nattapon@nexus.co.th',
        department: 'Valuation Advisory',
        office_id: 'NPC',
      },
      {
        id: 3,
        fname: 'Napasorn',
        lname: 'Makchuay',
        email: 'napasorn@nexus.co.th',
        department: 'Marketing Communication',
        office_id: 'NPM',
      },
      {
        id: 4,
        fname: 'Chavanut',
        lname: 'Jangprasitchai',
        email: 'chavanut@nexus.co.th',
        department: 'Land Acquistion',
        office_id: 'Nexus Poperty Agency Co., Ltd.',
      },
      {
        id: 5,
        fname: 'Meeting Room',
        lname: '',
        email: '',
        department: 'Central Administrations',
        office_id: 'NPC',
      },
      {
        id: 6,
        fname: 'Patthama',
        lname: 'Sinprasertporn',
        email: 'patthama@nexus.co.th',
        department: 'Sales Services',
        office_id: 'NPM',
      },
      {
        id: 7,
        fname: 'Arpatcha',
        lname: 'Tonpoo',
        email: 'apatcha@nexus.co.th,',
        department: 'Investment Advisory',
        office_id: 'NRA',
      },
      {
        id: 8,
        fname: 'Patcharin',
        lname: 'Kotama',
        email: 'patcharin@nexus.co.th',
        department: 'Central Administrations',
        office_id: 'NPC',
      },
      {
        id: 9,
        fname: 'Natthida',
        lname: 'Mairieng',
        email: 'natthida@nexus.co.th',
        department: 'Business Development',
        office_id: 'NPM',
      },
      {
        id: 10,
        fname: 'Seksan',
        lname: 'Hiranprasatkul',
        email: 'seksan@nexus.co.th',
        department: 'Valuation Advisory',
        office_id: 'NPC',
      },
      {
        id: 11,
        fname: 'Massupa',
        lname: 'Seangthong',
        email: 'massupa@nexus.co.th',
        department: 'Finance & Accounting',
        office_id: 'NPC',
      },
      {
        id: 12,
        fname: 'Ayika',
        lname: 'Suntornkrut',
        email: 'ayika@nexus.co.th',
        department: 'Valuation Advisory',
        office_id: 'NPC',
      },
      {
        id: 13,
        fname: 'Achara',
        lname: 'Mahaolan',
        email: 'achara@nexus.co.th',
        department: 'Valuation Advisory',
        office_id: 'NPC',
      },
      {
        id: 14,
        fname: 'Satita',
        lname: 'Teepatimakorn',
        email: 'satita@nexus.co.th',
        department: 'Investment Advisory',
        office_id: 'NRA',
      },
      {
        id: 15,
        fname: 'Karnjana',
        lname: 'Chaisirikul',
        email: '',
        department: 'Conspire',
        office_id: 'Conspire',
      },
      {
        id: 16,
        fname: 'Danuya',
        lname: 'Taechamongkalapiwat',
        email: 'danuya@nexus.co.th',
        department: 'Marketing Communication',
        office_id: 'NPM',
      },
      {
        id: 17,
        fname: 'Ketwadee',
        lname: 'Dangbunjong',
        email: 'ketwadee@nexus.co.th',
        department: 'Central Administrations',
        office_id: 'NPC',
      },
      {
        id: 18,
        fname: 'Patcharaporn',
        lname: 'Pankaew',
        email: 'patcharaporn@nexus.co.th',
        department: 'Retail  Services',
        office_id: 'NRT',
      },
      {
        id: 19,
        fname: 'Atipa',
        lname: 'Muthita',
        email: 'atipa@nexus.co.th',
        department: 'Research Advisory',
        office_id: 'NRA',
      },
    ],
  }),
  getters: {
    fullname: (state) => {
      // return an array of full names for all users
      return state.users.fname + state.users.lname
    },
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    },
  },
  actions: {
    addUser(newUser) {
      // user is object
      this.users.push(newUser)
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => {
        return user.id !== userId
      })
    },
  },
})

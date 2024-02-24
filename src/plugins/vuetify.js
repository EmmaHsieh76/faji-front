/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// 中文語言包
import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#1867C0',
          // secondary: '#5CBBF6',
          third: '#F9C80E',
          forth: '#E67B21',
          fifth: '#31312D',
          sixth: '#244080',
          seventh: '#D92323',
          eigth: '#ffffff',
          ninth: '#3F000F'
        }
      }
    }
  },
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  }
})

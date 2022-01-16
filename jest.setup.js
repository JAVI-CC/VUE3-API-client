
import { config } from '@vue/test-utils'
import { QIcon, QCardSection, QForm, QBtn, QInput } from 'quasar'

config.global.components = {
  'q-icon': QIcon,
  'q-card-section': QCardSection,
  'q-form': QForm,
  'q-input': QInput,
  'q-btn': QBtn
}

//mocker-router components
// import {
//     VueRouterMock,
//     createRouterMock,
//     injectRouterMock,
//   } from 'vue-router-mock'

//   import { config } from '@vue/test-utils'
  
//   // create one router per test file
//   const router = createRouterMock()
//   beforeEach(() => {
//     injectRouterMock(router)
//   })
  
//   // Add properties to the wrapper
//   config.plugins.VueWrapper.install(VueRouterMock)
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';
import Framework7Styles from 'framework7/dist/css/framework7.css';
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

import App from './App'
import router from './router'

Vue.use(Framework7Vue, Framework7)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    //routes: Routes,
  },

  router,
  components: { App },
  template: '<App/>'
})

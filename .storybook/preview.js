// .storybook/preview.js

import {app} from '@storybook/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
app.component('font-awesome-icon', FontAwesomeIcon);

// import Vue from 'vue';
// import { library, config } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fa } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
// config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
// library.add(fas)
// library.add(fa)
// library.add(fab)

// Vue.component('font-awesome-icon', FontAwesomeIcon);

import '../assets/styles/globals.css';
import '../assets/styles/buttons.css';
import '../assets/styles/toggles.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

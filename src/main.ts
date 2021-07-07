import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import * as apolloClient from './apollo-client';
import App from './App.vue'
import router from './router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
app.use(router).mount('#app')

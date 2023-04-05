/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Store
import store from './store'



const app = createApp(App)

app.config.productionTip = false

app.mixin({
    methods: {
      checkLogin() {
        if (!localStorage.getItem('login')) {
          this.$router.push('login');
          return;
        }
  
        if (!this.$store.state.username && localStorage.getItem('login')) {
          this.$store.dispatch('update_user_name', 123);
          this.$router.push('/');
          return;
        }
  
        if (this.$store.state.username && localStorage.getItem('login')) {
          this.$router.push('/');
          return;
        }
      }
    }
  })


registerPlugins(app)


app.use(store)
app.mount('#app')

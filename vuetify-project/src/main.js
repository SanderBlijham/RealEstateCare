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

//Buffer
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const app = createApp(App)

app.config.productionTip = false

registerPlugins(app)

app.use(store)
app.mount('#app')

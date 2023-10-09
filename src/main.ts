import 'uno.css';
import Vant from 'vant'
import 'vant/lib/index.css'
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from '@/store';
export function createApp() {
  const app = createSSRApp(App).use(store);
  app.use(Vant)
  return {
    app
  };
}

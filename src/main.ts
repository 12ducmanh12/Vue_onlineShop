import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router';
import CKEditor from '@ckeditor/ckeditor5-vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './style.css';

const pinia = createPinia()

const app = createApp(App)
app.use(pinia);
app.use(Antd);
app.use(router);
app.use(CKEditor);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');

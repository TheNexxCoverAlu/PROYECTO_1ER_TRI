import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve} from 'path';

const htmlFiles = {
  main: resolve(__dirname, 'index.html'),
  login: resolve(__dirname, 'login.html'),
  register: resolve(__dirname, 'register.html'),
  newProperty: resolve(__dirname, 'new-property.html'),
  propertyDetail: resolve(__dirname, 'property-detail.html'),
  profile: resolve(__dirname, 'profile.html'),
};

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
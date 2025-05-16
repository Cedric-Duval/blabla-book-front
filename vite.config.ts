import { defineConfig, loadEnv  } from 'vite';
import react from '@vitejs/plugin-react';

 
// https://vite.dev/config/
export default ({ mode }) => {
  // Charger les variables d'environnement en fonction du mode
  const env = loadEnv(mode, process.cwd());

  const portDev = Number(env.VITE_DEV_PORT); // Type: number
  const portProd = Number(env.VITE_PROD_PORT); // Type: number


  return defineConfig({
    plugins: [react()],
    server: {
      port: portProd || portDev || 5173, // Port souhaité
    },
  });
};

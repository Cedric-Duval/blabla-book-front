import { defineConfig, loadEnv  } from 'vite';
import react from '@vitejs/plugin-react';

 
// https://vite.dev/config/
export default ({ mode }) => {
  // Charger les variables d'environnement en fonction du mode
  const env = loadEnv(mode, process.cwd());

  const portDev = Number(env.VITE_DEV_PORT); // Type: number
  const portProd = Number(env.VITE_PROD_PORT); // Type: number


  switch (mode) {
    case "development": {
      return defineConfig({
        plugins: [react()],
          server: {
            port: portDev || 5173, // Port souhaité
          },
        });
      }
    case "production": {
      return defineConfig({
        plugins: [react()],
          server: {
            port: portProd || 5173, // Port souhaité
          },
        });
      }
  }



};

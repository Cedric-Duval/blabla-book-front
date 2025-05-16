import react from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
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

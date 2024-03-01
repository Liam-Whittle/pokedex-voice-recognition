import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pokedexai.app',
  appName: 'app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

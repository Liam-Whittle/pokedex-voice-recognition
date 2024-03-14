import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pokedexai.app',
  appName: 'Pokédex',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

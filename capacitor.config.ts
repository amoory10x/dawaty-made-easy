
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.56f8b1766fef4cf0b401ae70cb30bee3',
  appName: 'dawaty-made-easy',
  webDir: 'dist',
  server: {
    url: 'https://56f8b176-6fef-4cf0-b401-ae70cb30bee3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#22c55e',
      showSpinner: true,
      androidSpinnerStyle: 'large',
    },
  },
};

export default config;

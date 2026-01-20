import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.huastream.app',
  appName: 'HuaStream',
  webDir: 'dist',
  server: {
    url: 'https://streaming-app-plum-ten.vercel.app',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;

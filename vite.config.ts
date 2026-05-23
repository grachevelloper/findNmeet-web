import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server:
    command === 'serve'
      ? {
          host: '0.0.0.0',
          port: 5173,
          strictPort: true,
          allowedHosts: ['local.findnmeet.ru'],
          hmr: {
            host: 'local.findnmeet.ru',
            protocol: 'wss',
            clientPort: 443,
          },
        }
      : undefined,
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@widgets': resolve(__dirname, 'src/widgets'),
      '@features': resolve(__dirname, 'src/features'),
      '@entities': resolve(__dirname, 'src/entities'),
      '@shared': resolve(__dirname, 'src/shared'),
    },
  },
}))

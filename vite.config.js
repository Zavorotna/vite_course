import { defineConfig } from 'vite'
import { resolve } from 'path'
import pugPlugin from '@macropygia/vite-plugin-pug-static'

export default defineConfig({
  root: 'src',

  plugins: [
    pugPlugin({
      buildLocals: {
        siteName: 'Мій сайт',
        currentYear: new Date().getFullYear(),
      },
      buildOptions: {
        basedir: resolve(process.cwd(), 'src'),
        pretty: true,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@components': resolve(process.cwd(), 'src/components'),
      '@styles': resolve(process.cwd(), 'src/styles'),
      '@assets': resolve(process.cwd(), 'src/assets'),
      '@scripts': resolve(process.cwd(), 'src/scripts'),
      '@fonts': resolve(process.cwd(), 'src/fonts'),
    },
  },

  build: {
    outDir: '../docs',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.pug'),
      },
      output: {
        assetFileNames: (assetInfo) => {
        if (assetInfo.name && assetInfo.name.endsWith('.css')) {
          return 'assets/styles.css' // 👈 завжди одне ім’я
        }
        if (assetInfo.name && /\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
          return 'assets/fonts/[name][extname]'
        }
        if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
          return 'assets/images/[name][extname]'
        }
        return 'assets/[name][extname]'
      },
      chunkFileNames: 'assets/js/[name].js',
      entryFileNames: 'assets/js/[name].js',
      },
    },
  },

  server: {
    port: 3000,
    host: true,
    open: true,
  },

  css: {
    preprocessorOptions: {
      sass: {
        // additionalData: `@import "@styles/base/_variables.sass"\n`,
      },
    },
  },
})

/*---------------------------------------------------------
* Wild Media Server
* File: nuxt.config.ts
* Author: Micha "Vyx" Janssen
* Created: 2025-04-10
* Project: WMS Frontend
*-------------------------------------------------------*/

import { defineNuxtConfig } from 'nuxt/config'

// Temporary type declaration for image module
declare module 'nuxt/schema' {
  interface NuxtConfig {
    image?: {
      dir?: string
      domains?: string[]
      presets?: Record<string, {
        modifiers: {
          fit?: string
          format?: string
          quality?: number
        }
      }>
    }
  
    ui?: {
      icons?: string[]
    }
  }
}

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  
  // Verified working modules
  modules: [
    '@nuxt/content',
    '@nuxt/image-nightly', // Using edge channel
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  // HTTPS configuration
  devServer: {
    https: {
      key: './localhost.key',
      cert: './localhost.crt'
    },
    host: 'localhost',
    port: 3000
  },

  // Image module configuration
  image: {
    dir: 'public/images',
    domains: ['localhost'],
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 80
        }
      }
    }
  },

  // Security headers
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "connect-src 'self' https://localhost:3000",
            "media-src 'self' blob:",
            "frame-src 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests"
          ].join('; '),
          'Strict-Transport-Security': 'max-age=63072000; includeSubdomains; preload',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        }
      }
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://localhost:3000'
    }
  },

  // UI configuration
  ui: {
    icons: ['heroicons']
  },

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/_variables.scss" as *; @use "@/assets/scss/_mixins.scss" as *;`
        }
      }
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  }
})
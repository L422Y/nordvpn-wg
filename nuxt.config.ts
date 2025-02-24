// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    nordvpnAccessToken: process.env.NORDVPN_ACCESS_TOKEN,
    public: {
    }
  }
})

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Jan Czizikow // Web Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is the site of Jan Czizikow, a Web Developer. The site is just a list of things he\'s been up to including blog and projects.' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'mask-icon', sizes: 'any', href: '/favicon.svg', color: "#313237" },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#277cea' },
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      /*
      ** Vue SVG Loader
      */
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        exclude: /node_modules/
      })
    },
    vendor: [
      // 'axios',
      'vuelidate',
      'vue-headroom',
      'lazysizes',
    ]
  },
  plugins: [ '~/plugins/vuelidate'],
  generate: {
    fallback: true // custom 404.html pages
  },
  modules: [
    ['nuxt-sass-resources-loader', '@@/assets/shared.scss'],
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-NBBVPGQ',
      pageTracking: true,
     }
    ],
    ['nuxt-social-meta', {
      url: 'https://www.janczizikow.com',
      title: 'Jan Czizikow // Web Developer',
      description: 'This is the site of Jan Czizikow, a Web Developer. The site is just a list of things he\'s been up to including blog and projects.',
      img: 'https://www.janczizikow.com/images/open_graph.jpg',
      locale: 'en_US',
      twitter: '@jan_czizikow',
      themeColor: '#277cea'
    }],
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    hostname: 'https://www.janczizikow.com',
    generate: true,
    exclude: [
      '/login',
      '/dashboard/**',
    ],
    // FIXME: Make this dynamic
    // https://www.npmjs.com/package/@nuxtjs/sitemap
    routes:[
      '/projects/skatespots',
      '/projects/jekyll-sleek',
      '/projects/blanccstate',
      '/projects/the-clinic',
      '/projects/minimal-portfolio',
    ]
  }
}

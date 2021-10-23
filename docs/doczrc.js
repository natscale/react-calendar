const pkgName = 'React Calendar';

export default {
  lang: 'en',
  files: '**/*.mdx',
  ignore: ['./*.md'],
  title: pkgName,
  description: `${pkgName}.`,
  base: `/${pkgName}/`,
  menu: ['Introduction', 'Installation', { name: 'API', menu: [] }, { name: 'Examples', menu: [] }],
  menuDisplayName: {
    API: 'API Reference',
    Examples: 'Examples',
  },
  themeConfig: {
    search: true,
    mainContainer: {
      fullscreen: false,
      align: 'center',
    },
    header: {
      icons: 'minimal',
      fixed: false,
    },
    footer: {
      navigation: true,
    },
    logo: {
      src: {
        light: '/public/assets/logo.png',
        dark: '/public/assets/logo.png',
      },
      width: 45,
    },
    menu: {
      search: false,
      headings: {
        rightSide: true,
        scrollspy: true,
        depth: 3,
      },
    },
  },
  docgenConfig: {
    searchPatterns: [
      '../**/*.{ts,tsx,js,jsx,mjs}',
      '../theme/src/gatsby-theme-docz/custom-components/**/*.{ts,tsx,js,jsx,mjs}',
      '!**/node_modules',
      '!../**/node_modules',
      '!**/doczrc.js',
      '!../**/doczrc.js',
    ],
  },
  filterComponents: (files) => files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
};

const pkgName = 'react-calendar';

export default {
  lang: 'en',
  files: '**/*.mdx',
  ignore: ['./*.md'],
  title: 'React Calendar',
  description: 'A no dependency, lightweight and feature-rich calendar component for react.',
  base: `/${pkgName}/`,
  menu: ['Introduction', 'Installation', { name: 'API', menu: [] }, { name: 'Examples', menu: [] }],
  menuDisplayName: {
    API: 'API Reference',
    Examples: 'Examples',
  },
  themeConfig: {
    colors: {
      // https://github.com/doczjs/docz/blob/main/core/gatsby-theme-docz/src/theme/modes.js
      primary: '#1c7ed4',
      link: '#1c7ed4',
      header: {
        button: {
          bg: '#1c7ed4',
        },
      },
      props: {
        highlight: '#1c7ed4',
      },
      sidebar: {
        navLinkActive: '#1c7ed4',
      },
    },
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

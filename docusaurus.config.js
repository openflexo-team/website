// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Openflexo',
  tagline: "You're at the right place to discover Openflexo technical infrastructure and research project. You will find here support, documentation and resources.",
  url: 'https://openflexo.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'openflexo', // Usually your GitHub org/user name.
  // projectName: 'website', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // includeCurrentVersion:false,
        },
        blog: {
          blogTitle: 'Downloads',
          blogDescription: 'DOWNLOAD OPENFLEXO INFRASTRUCTURE',
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Openflexo',
        logo: {
          alt: 'Openflexo Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/ModelFederation', 
            label: 'Model Federation', 
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'documentation',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/contributors', 
            label: 'Contributors', 
            position: 'left'
          },
          {
            to: '/downloads', 
            label: 'Downloads', 
            position: 'left'
          },
          // {
          //   type: 'docsVersionDropdown',
          //   position: 'right'
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Production tools',
            items: [
              {
                label: 'Jenkins production environment',
                to: 'https://jenkins.openflexo.org',
              },
              {
                label: 'Continuous/nightly builds',
                to: 'https://downloads.openflexo.org/openflexo/',
              },
              {
                label: 'Openflexo artifactory',
                to: 'https://maven.openflexo.org/artifactory',
              },
              {
                label: 'Sonar',
                to: 'https://sonar.openflexo.org/',
              },
            ],
          },
          {
            title: 'Generic Components',
            items: [
              {
                label: 'Pamela framework',
                to: 'http://pamela.openflexo.org/SNAPSHOT',
              },
              {
                label: 'Gina framework',
                to: 'http://gina.openflexo.org/SNAPSHOT',
              },
              {
                label: 'Diana framework',
                to: 'http://diana.openflexo.org/SNAPSHOT',
              },
              {
                label: 'Connie framework',
                to: 'http://connie.openflexo.org/SNAPSHOT',
              },
            ],
          },
          {
            title: 'Openflexo Core Components',
            items: [
              {
                label: 'Openflexo FML-Core framework',
                to: 'http://openflexo-core.openflexo.org/SNAPSHOT',
              },
              {
                label: 'Openflexo utils',
                to: 'https://openflexo-utils.openflexo.org/SNAPSHOT/',
              },
              {
                label: 'Openflexo Production Environment',
                to: 'https://openflexo-production.openflexo.org/SNAPSHOT/',
              },
              {
                label: 'Openflexo Packaging Environment',
                to: 'https://openflexo-packaging.openflexo.org/SNAPSHOT/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Openflexo.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [
      require.resolve('docusaurus-lunr-search'),
    ]
    // themes: [
    //   // ... Your other themes.
    //   [
    //     require.resolve("@easyops-cn/docusaurus-search-local"),
    //     {
    //       // ... Your options.
    //       // `hashed` is recommended as long-term-cache of index file is possible.
    //       hashed: true,
    //       // For Docs using Chinese, The `language` is recommended to set to:
    //       // ```
    //       // language: ["en", "zh"],
    //       // ```
    //     },
    //   ],
    // ],
};

module.exports = config;
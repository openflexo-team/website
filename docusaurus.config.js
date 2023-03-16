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
            type: 'doc',
            docId: '/category/research',
            position: 'left',
            label: 'Research',
          },
          {
            to: 'docs/components', 
            label: 'Components', 
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
            ],
          },
          {
            title: 'Generic Components',
            items: [
              {
                label: 'Pamela framework',
                to: 'http://openflexo.org/pamela',
              },
              {
                label: 'Gina framework',
                to: 'http://openflexo.org/gina',
              },
              {
                label: 'Diana framework',
                to: 'http://openflexo.org/diana',
              },
              {
                label: 'Connie framework',
                to: 'http://openflexo.org/connie',
              },
            ],
          },
          {
            title: 'Research',
            items: [
              {
                label: 'Formose Project',
                to: 'http://formose.lacl.fr/',
              },
              {
                label: 'Download Formose prototype',
                to: 'http://downloads.openflexo.org/Formose',
              },
              {
                label: 'Cyber Threat Application',
                to: '/Docs/Research/cta',
              },
              {
                label: 'Download CTA Application',
                to: 'http://downloads.openflexo.org/CTA',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                to: '/contributors', 
                label: 'Contributors', 
              },
              {
                label: 'Contact us',
                to: 'mailto:contact@openflexo.org',
              },
              {
                html: `
                  <div class="tagline">
                  <p>Something is broken? let us know</p>
                    <a class="githubButton" href="https://github.com/openflexo-team/website/issues" target="_blank">
                      <img alt="GitHub logo" height="22" src="/img/github.svg" title="GitHub" width="22">  Create an issue
                    </a>
                  </div>
                  `,
              },
              
            ]
          }
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
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const fs = require('fs');
const path = require('path');
const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/**
 * Serves the redirect map without an npm dependency: at postBuild time, writes one static
 * `<from>/index.html` per {from, to} entry — a meta-refresh + JS `location.replace` fallback,
 * the same shape @docusaurus/plugin-client-redirects itself generates. Apache's default
 * DirectorySlash + DirectoryIndex serve it for both `/from` and `/from/`, matching how every
 * other page on this site is already served.
 * @param {{redirects: Array<{from: string, to: string}>}} options
 */
function localRedirectsPlugin(context, options) {
  return {
    name: 'local-redirects-plugin',
    async postBuild({outDir}) {
      for (const {from, to} of options.redirects) {
        const relDir = from.replace(/^\/+/, '').replace(/\/+$/, '');
        const dir = path.join(outDir, relDir);
        fs.mkdirSync(dir, {recursive: true});
        fs.writeFileSync(
          path.join(dir, 'index.html'),
          `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${to}">
<link rel="canonical" href="${to}">
<title>Redirecting…</title>
</head>
<body>
Redirecting to <a href="${to}">${to}</a>…
<script>location.replace(${JSON.stringify(to)});</script>
</body>
</html>
`,
        );
      }
    },
  };
}

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
            type: 'docSidebar',
            sidebarId: 'discoverSidebar',
            position: 'left',
            label: 'Discover',
          },
          {
            type: 'docSidebar',
            sidebarId: 'getStartedSidebar',
            position: 'left',
            label: 'Get started',
          },
          {
            type: 'docSidebar',
            sidebarId: 'guideSidebar',
            position: 'left',
            label: 'User guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developSidebar',
            position: 'left',
            label: 'Develop',
          },
          {
            type: 'docSidebar',
            sidebarId: 'researchSidebar',
            position: 'left',
            label: 'Research',
          },
          {
            type: 'docSidebar',
            sidebarId: 'communitySidebar',
            position: 'left',
            label: 'Community',
          },
          {
            to: '/downloads',
            label: 'Downloads',
            position: 'right',
            className: 'navbar__downloads-button',
          },
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
                label: 'Papers',
                to: '/papers',
              },
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
                to: '/docs/research/projects/cta',
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
      [
        // Local plugin, not an npm package: the build machine's package-lock.json cannot be
        // regenerated here (no npm install), so redirects are served without adding a
        // dependency. Writes one static `<from>/index.html` per entry at postBuild time — the
        // same meta-refresh + JS fallback shape @docusaurus/plugin-client-redirects itself
        // produces. See localRedirectsPlugin below.
        localRedirectsPlugin,
        /** @type {{redirects: Array<{from: string, to: string}>}} */
        ({
          // Explicit only — no wildcards — generated from the mapping table in
          // .claude/epics/WebSiteRefactoring/IA-Proposal.md §3, so it cannot silently drift from
          // the actual move. Keep it in sync by hand when a page moves again.
          redirects: [
            {from: '/ModelFederation', to: '/docs/discover/model-federation'},
            {from: '/docs/documentation', to: '/docs/guide/'},
            {from: '/docs/F.A.Q/WhatIsModelFederation', to: '/docs/discover/model-federation'},
            {from: '/docs/F.A.Q/HowToTestOpenflexo', to: '/docs/discover/faq'},
            {from: '/docs/F.A.Q/WhatAreRequiredComputerSkills', to: '/docs/discover/faq'},
            {from: '/docs/GettingStarted/ComponentsAndVersionsManagement', to: '/docs/get-started/'},
            {from: '/docs/GettingStarted/GettingStartedUsingEclipse', to: '/docs/develop/setup'},
            {from: '/docs/GettingStarted/GettingStartedUsingIntellij', to: '/docs/develop/setup'},
            {from: '/docs/GettingStarted/UsingModuleCreationArchetype', to: '/docs/develop/'},
            {
              from: '/docs/GettingStarted/UsingTechnologyAdapterCreationArchetype',
              to: '/docs/develop/guides/write-a-technology-adapter',
            },
            {
              from: '/docs/Tutorials/Tutorial1-GettingStartedWithFreeModelingEditor',
              to: '/docs/guide/tutorials/first-free-model',
            },
            {
              from: '/docs/Tutorials/Tutorial2-CreateDiagramEditorUsingFreeModellingEditor',
              to: '/docs/guide/tutorials/diagram-editor-without-code',
            },
            {from: '/docs/Tutorials/Tutorial3-BuildingADiagramEditor', to: '/docs/guide/tutorials/'},
            {
              from: '/docs/Tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor',
              to: '/docs/guide/tutorials/petri-net-editor',
            },
            {
              from: '/docs/Tutorials/Tutorial5-FederatingExcelDocuments',
              to: '/docs/guide/tutorials/federating-spreadsheets',
            },
            {
              from: '/docs/Tutorials/Tutorial7-WorkingOnModelMapping',
              to: '/docs/guide/tutorials/model-mapping-and-sync',
            },
            {from: '/docs/howto/HowTo-TechnologyAdapters', to: '/docs/guide/concepts/technology-adapters'},
            {from: '/docs/howto/HowTo-ResourceCenters', to: '/docs/guide/cookbook/resource-centers'},
            {from: '/docs/howto/HowTo-BuildingApps', to: '/docs/develop/guides/build-standalone-app'},
            {from: '/docs/howto/HowTo-EditLocales', to: '/docs/guide/cookbook/edit-locales'},
            {from: '/docs/howto/HowTo-PackageEMFMetaModel', to: '/docs/guide/cookbook/package-emf-metamodel'},
            {from: '/docs/research/overview', to: '/docs/research/'},
            {from: '/docs/research/cta', to: '/docs/research/projects/cta'},
            {from: '/docs/research/MLMChallenge', to: '/docs/research/challenges/multi-process-challenge'},
            {from: '/docs/research/Oneway', to: '/docs/research/'},
            {
              from: '/docs/Contribute/DeveloppingTechnologyAdapter',
              to: '/docs/develop/guides/write-a-technology-adapter',
            },
            {from: '/docs/Contribute/DevelopmentGuidelines', to: '/docs/develop/code-standards'},
            {from: '/docs/Contribute/GetInvolved', to: '/docs/community/get-involved'},
            {from: '/docs/Contribute/ProductionProcess', to: '/docs/develop/release-engineering'},
            {from: '/docs/Contribute/CreateANewInstallableDistro', to: '/docs/develop/release-engineering'},
            {from: '/docs/Contribute/WebSiteProduction..', to: '/docs/develop/release-engineering'},
          ],
        }),
      ],
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
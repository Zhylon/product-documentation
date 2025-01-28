const {description} = require('../../package')

module.exports = {

    title: 'Zhylon Docs 🚀',
    description: 'The documentation for our server management tool.',
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    locales: {
        /*
        '/en/': {
            lang: '🇺🇸',
            title: 'Zhylon Docs 🚀',
            description: 'Die API Dokumentation zu unserem Server Management Tool.'
        },
        */
        '/': {
            lang: '🇩🇪',
            title: 'Zhylon Docs 🚀',
            description: 'Die API Dokumentation zu unserem Server Management Tool.'
        }
    },

    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,

        locales: {
            '/en': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                // text for the edit-on-github link
                editLinkText: 'Edit this page on GitHub',
                // config for Service Worker
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                // algolia docsearch options for current locale
                algolia: {},
                nav: [
                    {text: 'Nested', link: '/nested/', ariaLabel: 'Nested'}
                ],
                sidebar: {
                    '/features/': [
                        {
                            title: 'Features',
                            collapsable: false,
                            children: [
                                '',
                                'monitoring',
                            ]
                        }
                    ],
                }
            },
            '/': {
                selectText: 'Sprachen',
                label: '🇩🇪',
                ariaLabel: 'Sprachen',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                nav: [
                    {text: 'Allgemein', link: '/general/'},
                    {text: 'Account', link: '/accounts/'},
                    {text: 'Server', link: '/servers/providers'},
                    {text: 'Seiten', link: '/sites/'},
                    {text: 'Projekte', link: '/projects/'},
                    {text: 'Ressourcen', link: '/resources/'},
                    {text: 'API', link: '/api/'},
                ],
                algolia: {},
                sidebar: {
                    '/general/': [
                        {
                            title: 'Allgemein',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                                'cli',
                                'sdk',
                            ]
                        }
                    ],
                    '/accounts/': [
                        {
                            title: 'Account',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                                'teams',
                                'source-control',
                                'ssh',
                                'api',
                                'tags',
                            ]
                        }
                    ],
                    '/servers/': [
                        {
                            title: 'Servers',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                'providers',
                                'types',
                                'management',
                            ]
                        }
                    ],
                    '/api/': [
                        {
                            title: 'API',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                            ]
                        }
                    ],
                }
            }
        },
    },

    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}

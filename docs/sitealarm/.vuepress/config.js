const {description} = require('../../package')

module.exports = {

    title: 'Sitealarm Docs ⏰',
    description: 'The documentation for our monitoring services.',
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    locales: {
        // The key is the path for the locale to be nested under.
        // As a special case, the default locale can use '/' as its path.
        '/en/': {
            lang: '🇺🇸',
            title: 'Sitealarm Docs ⏰',
            description: 'Die API Dokumentation zu unserem Monitoring Service.'
        },
        '/': {
            lang: '🇩🇪',
            title: 'Sitealarm Docs ⏰',
            description: 'Die API Dokumentation zu unserem Monitoring Service.',
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
                    {text: 'Features', link: '/features/'},
                    {text: 'FAQ', link: '/faq/'},
                    {text: 'API', link: '/api/'},
                ],
                algolia: {},
                sidebar: {
                    '/features/': [
                        {
                            title: 'Features',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                                'monitoring',
                                'certificates',
                                'mixed-content',
                                'broken-links',
                                'heartbeats',
                                'app-health',
                            ]
                        }
                    ],
                    '/faq/': [
                        {
                            title: 'FAQ',
                            collapsable: false,
                            children: [
                                '',
                                'robots-txt',
                                'domain-verification',
                                'migrate-from-others',
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
                                'self-hosted-location',
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

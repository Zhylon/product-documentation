const {description} = require('../../package')

module.exports = {

    title: 'Zhylon Docs 🚀',
    description: 'Die API Dokumentation zu unserem Server Management Tool.',
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    locales: {
        '/en/': {
            lang: '🇺🇸',
            title: 'Zhylon Docs 🚀',
            description: 'The documentation for our server management tool.'
        },
        '/': {
            lang: '🇩🇪',
            title: 'Zhylon Docs 🚀',
            description: 'Die API Dokumentation zu unserem Server Management Tool.'
        }
    },

    themeConfig: {
        repo: 'zhylon/issues',
        docsRepo: 'zhylon/zhylon-docs',
        docsDir: 'docs/zhylon',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '',
        lastUpdated: false,

        locales: {
            '/en/': {
                selectText: 'Languages',
                label: '🇺🇸',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this site on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                nav: [
                    {text: 'General', link: '/en/general/'},
                    {text: 'Accounts', link: '/en/accounts/'},
                    {text: 'Servers', link: '/en/servers/providers'},
                    {text: 'Sites', link: '/en/sites/'},
                    {text: 'Projects', link: '/en/projects/'},
                    {text: 'Resources', link: '/en/resources/daemons'},
                    {text: 'API', link: '/en/api/'},
                ],
                algolia: {},
                sidebar: {
                    '/en/general/': [
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
                    '/en/accounts/': [
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
                    '/en/servers/': [
                        {
                            title: 'Servers',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                'providers',
                                'types',
                                'management',
                                'provisioning-process',
                                'ssh',
                                'php',
                                'packages',
                                //'recipes',
                                'load-balancing',
                                'nginx-templates',
                                'backups',
                                'monitoring',
                                'cookbook',
                            ]
                        }
                    ],
                    '/en/sites/': [
                        {
                            title: 'Seiten',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                'the-basics',
                                'applications',
                                'deployments',
                                'commands',
                                'packages',
                                'queues',
                                'security-rules',
                                'redirects',
                                'ssl',
                                'user-isolation',
                                'monitoring',
                                //'cookbook',
                            ]
                        }
                    ],
                    '/en/projects/': [
                        {
                            title: 'Projekte',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                            ]
                        }
                    ],
                    '/en/api/': [
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
            },
            '/': {
                selectText: 'Sprachen',
                label: '🇩🇪',
                ariaLabel: 'Sprachen',
                editLinkText: 'Bearbeite diese Seite auf GitHub',
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
                    {text: 'Seiten', link: '/sites/the-basics'},
                    {text: 'Projekte', link: '/projects/'},
                    {text: 'Ressourcen', link: '/resources/daemons'},
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
                                'provisioning-process',
                                'ssh',
                                'php',
                                'packages',
                                //'recipes',
                                'load-balancing',
                                'nginx-templates',
                                'backups',
                                'monitoring',
                                'cookbook',
                            ]
                        }
                    ],
                    '/sites/': [
                        {
                            title: 'Seiten',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                'the-basics',
                                'applications',
                                'deployments',
                                'commands',
                                'packages',
                                'queues',
                                'security-rules',
                                'redirects',
                                'ssl',
                                'user-isolation',
                                'monitoring',
                                //'cookbook',
                            ]
                        }
                    ],
                    '/projects/': [
                        {
                            title: 'Projekte',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                '',
                            ]
                        }
                    ],
                    '/resources/': [
                        {
                            title: 'Ressourcen',
                            collapsable: false,
                            sidebarDepth: 2,
                            children: [
                                'daemons',
                                'databases',
                                'caches',
                                'network',
                                'scheduler',
                                'integrations',
                                'cookbook',
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

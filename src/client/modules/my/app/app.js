import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track activeTab = 'portfolio';
    @track projects = [];
    @track blogs = [];
    isLoading = true;

    // Tab Getters
    get isPortfolio() { return this.activeTab === 'portfolio'; }
    get isBlog() { return this.activeTab === 'blog'; }
    get isAbout() { return this.activeTab === 'about'; }

    // Dynamic Greeting
    get greeting() {
        const hour = new Date().getHours();
        return hour < 12 ? 'Good Morning' : 'Good Evening';
    }

    connectedCallback() {
        // Simulate API Fetch
        setTimeout(() => {
            this.loadData();
            this.isLoading = false;
        }, 1000);
    }

    handleTab(event) {
        this.activeTab = event.target.dataset.tab;
    }

    loadData() {
        this.projects = [
            {
                id: 1,
                title: 'SFDX-CI-PIPELINE',
                desc: 'Modular YAML config for GitHub Actions to automate Salesforce deployments.',
                lang: 'Apex',
                stars: 12,
                icon: 'fa-brands fa-salesforce', // FontAwesome Class
                cssClass: 'badge badge-blue'
            },
            {
                id: 2,
                title: 'IOS-T9-KEYBOARD',
                desc: 'Nostalgic T9 keyboard implementation for iOS using SwiftUI.',
                lang: 'Swift',
                stars: 45,
                icon: 'fa-brands fa-app-store-ios',
                cssClass: 'badge badge-orange'
            },
            {
                id: 3,
                title: 'OPENAI-APEX-WRAPPER',
                desc: 'Connects Salesforce to OpenAI API to generate code comments.',
                lang: 'AI / Apex',
                stars: 22,
                icon: 'fa-solid fa-robot',
                cssClass: 'badge badge-purple'
            }
        ];

        this.blogs = [
            {
                id: 1,
                title: 'Dungeon Master Your Data',
                desc: 'Governance lessons from running a chaotic D&D campaign.',
                date: 'Nov 15, 2025',
                readTime: '6 min'
            },
            {
                id: 2,
                title: 'Refactoring Legacy Apex',
                desc: 'Strategies for breaking down God Classes without breaking Prod.',
                date: 'Oct 28, 2025',
                readTime: '12 min'
            }
        ];
    }
}
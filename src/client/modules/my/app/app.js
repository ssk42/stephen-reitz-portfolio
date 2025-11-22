import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track activeTab = 'portfolio';
    @track projects = [];
    @track blogs = [];
    isLoading = true;
    error;

    // 1. Tab Boolean Getters
    get isPortfolio() { return this.activeTab === 'portfolio'; }
    get isBlog() { return this.activeTab === 'blog'; }
    get isAbout() { return this.activeTab === 'about'; }

    // 2. Tab CSS Class Getters
    get portfolioClass() {
        return this.activeTab === 'portfolio' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-blue-400 transition-colors';
    }
    get blogClass() {
        return this.activeTab === 'blog' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-blue-400 transition-colors';
    }
    get aboutClass() {
        return this.activeTab === 'about' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-blue-400 transition-colors';
    }

    get greeting() {
        const hour = new Date().getHours();
        return hour < 12 ? 'Good Morning' : 'Good Evening';
    }

    connectedCallback() {
        this.loadData();
    }

    handleTab(event) {
        this.activeTab = event.target.dataset.tab;
    }

    async loadData() {
        try {
            // 1. FETCH REAL DATA FROM GITHUB
            // sort=updated ensures your latest work always shows first
            const response = await fetch('https://api.github.com/users/ssk42/repos?sort=updated&per_page=6');
            
            if (!response.ok) {
                throw new Error('GitHub API unavailable');
            }

            const repos = await response.json();

            // 2. MAP API RESPONSE TO UI CARD FORMAT
            this.projects = repos.map(repo => {
                return {
                    id: repo.id,
                    title: repo.name.toUpperCase().replace(/-/g, ' '), // Formats "my-repo" to "MY REPO"
                    desc: repo.description || 'No description provided.',
                    lang: repo.language || 'Code',
                    stars: repo.stargazers_count,
                    url: repo.html_url,
                    // Dynamic Styling Helpers
                    icon: this.getIconForLang(repo.language),
                    cssClass: this.getBadgeForLang(repo.language)
                };
            });

        } catch (err) {
            console.error('Error fetching repos:', err);
            // Fallback if API fails (e.g. rate limit)
            this.projects = [{ id: 0, title: 'API LIMIT REACHED', desc: 'Could not fetch latest repos.', lang: 'Error', cssClass: 'badge badge-orange' }];
        } finally {
            // 3. LOAD BLOGS (Still static for now) & STOP LOADING
            this.blogs = [
                {
                    id: 1,
                    title: 'Dungeon Master Your Data',
                    desc: 'Governance lessons from running a chaotic D&D campaign.',
                    date: 'Nov 15, 2025',
                    readTime: '6 min',
                    url: '#'
                },
                {
                    id: 2,
                    title: 'Refactoring Legacy Apex',
                    desc: 'Strategies for breaking down God Classes without breaking Prod.',
                    date: 'Oct 28, 2025',
                    readTime: '12 min',
                    url: '#'
                }
            ];
            this.isLoading = false;
        }
    }

    // Helper: Choose FontAwesome Icon based on Language
    getIconForLang(lang) {
        if (!lang) return 'fa-solid fa-code';
        const l = lang.toLowerCase();
        if (l === 'apex') return 'fa-brands fa-salesforce';
        if (l === 'swift') return 'fa-brands fa-app-store-ios';
        if (l === 'javascript') return 'fa-brands fa-js';
        if (l === 'html') return 'fa-brands fa-html5';
        if (l === 'css') return 'fa-brands fa-css3-alt';
        if (l === 'java') return 'fa-brands fa-java';
        return 'fa-solid fa-terminal';
    }

    // Helper: Choose Badge Color based on Language
    getBadgeForLang(lang) {
        if (!lang) return 'badge badge-blue';
        const l = lang.toLowerCase();
        if (l === 'apex') return 'badge badge-blue';
        if (l === 'swift') return 'badge badge-orange';
        if (l === 'javascript') return 'badge badge-purple'; // Reusing purple for JS
        return 'badge badge-blue'; // Default
    }
}
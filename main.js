/**
 * main.js - Точка входу SPA-застосунку LimbBot
 * Адаптовано для GitHub Pages (/7webdesign/)
 */

// Імпорт системних модулів
import { appState } from './store/state.js';
import { appRouter } from './services/router.js';
import { fetchBotReviews } from './services/api.js';

// Імпорт UI-компонентів
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

// Імпорт сторінок-контейнерів
import { HomePage } from './pages/Home.js';
import { AboutPage } from './pages/About.js';
import { ContactPage } from './pages/Contact.js';
import { ReviewsPage } from './pages/Reviews.js';

const appRoot = document.getElementById('app');

/**
 * Головна функція рендеру
 */
const renderApp = async (state) => {
    let pageContent = '';

    let activePath = state.currentPath; 
    
    if (activePath.startsWith('/7webdesign')) {
        activePath = activePath.replace('/7webdesign', '');
    }
    
    if (activePath === '') {
        activePath = '/';
    }

    switch (activePath) {
        case '/':
            pageContent = HomePage();
            break;
        case '/about':
            pageContent = AboutPage(); 
            break;
        case '/reviews':
            pageContent = ReviewsPage(state); 
            break;
        case '/contact':
            pageContent = ContactPage(state);
            break;
        default:
            pageContent = `
                <section class="content-block">
                    <h2>404 - Сторінку не знайдено</h2>
                    <p>Шлях "${activePath}" (оригінал: ${state.currentPath}) не існує.</p>
                </section>`;
    }

    // Збірка інтерфейсу
    appRoot.innerHTML = `
        ${Header()} 
        <main>
            ${pageContent}
        </main>
        ${Footer()}
    `;


    attachPageListeners(activePath, state); 
};

// Онови також функцію обробників, щоб вона приймала activePath
const attachPageListeners = (activePath, state) => {
    if (activePath === '/contact') {
        const form = document.getElementById('ideaForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const newIdea = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                appState.setState({ ideas: [newIdea, ...state.ideas] });
            });
        }
    }

    if (activePath === '/reviews' && state.reviews.length === 0 && !state.isReviewsLoading && !state.reviewsError) {
        handleApiLoading();
    }
};

/**
 * Обробники подій для динамічних елементів
 */
const attachPageListeners = (state) => {
    // Перевірка шляху для контактної форми
    if (state.currentPath === '/7webdesign/contact') {
        const form = document.getElementById('ideaForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const newIdea = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                appState.setState({ ideas: [newIdea, ...state.ideas] });
            });
        }
    }

    // Перевірка шляху для завантаження відгуків
    if (state.currentPath === '/7webdesign/reviews' && state.reviews.length === 0 && !state.isReviewsLoading && !state.reviewsError) {
        handleApiLoading();
    }
};

const handleApiLoading = async () => {
    appState.setState({ isReviewsLoading: true });
    try {
        const data = await fetchBotReviews(); 
        appState.setState({ reviews: data, isReviewsLoading: false });
    } catch (error) {
        appState.setState({ reviewsError: error.message, isReviewsLoading: false });
    }
};

// Підписка на оновлення
appState.subscribe(renderApp);

// Початковий рендер
renderApp(appState.getState());
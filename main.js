import { appState } from './store/state.js';
import { appRouter } from './services/router.js';
import { fetchBotReviews } from './services/api.js';

import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/Home.js';
import { AboutPage } from './pages/About.js';
import { ContactPage } from './pages/Contact.js';
import { ReviewsPage } from './pages/Reviews.js';

const appRoot = document.getElementById('app');

// Запобігає надмірному виклику функцій (наприклад, при швидкому кліканні)
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// Супер-функція очищення адреси для GitHub Pages
const getCleanPath = (rawPath) => {
    let clean = rawPath;
    if (clean.startsWith('http')) clean = new URL(clean).pathname;
    if (clean.startsWith('/7webdesign')) clean = clean.replace('/7webdesign', '');
    if (clean.endsWith('/') && clean.length > 1) clean = clean.slice(0, -1);
    return clean === '' ? '/' : clean;
};

const renderApp = async (state) => {
    let pageContent = '';
    const activePath = getCleanPath(state.currentPath);

    // Роутинг базується виключно на чистому шляху
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
                    <p>Шлях <b>${activePath}</b> не існує.</p>
                </section>`;
    }

    // Збірка (без God Component) [cite: 95]
    appRoot.innerHTML = `
        ${Header()} 
        <main>${pageContent}</main>
        ${Footer()}
    `;

    attachPageListeners(activePath, state);
};

const attachPageListeners = (activePath, state) => {
    if (activePath === '/contact') {
        const form = document.getElementById('ideaForm');
        if (form) {
            // ОПТИМІЗАЦІЯ 2: Використання debounce для обробки форми
            const handleFormSubmit = debounce((e) => {
                const newIdea = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                appState.setState({ ideas: [newIdea, ...state.ideas] });
                // Очищаємо форму після відправки (мінімізація пошуку в DOM)
                form.reset();
            }, 500); // Функція виконається лише через 500мс після останнього кліку

            form.addEventListener('submit', (e) => {
                e.preventDefault(); 
                handleFormSubmit(e);
            });
        }
    }

    if (activePath === '/reviews' && state.reviews.length === 0 && !state.isReviewsLoading && !state.reviewsError) {
        appState.setState({ isReviewsLoading: true });
        fetchBotReviews()
            .then(data => appState.setState({ reviews: data, isReviewsLoading: false }))
            .catch(error => appState.setState({ reviewsError: error.message, isReviewsLoading: false }));
    }
};

appState.subscribe(renderApp);
renderApp(appState.getState());
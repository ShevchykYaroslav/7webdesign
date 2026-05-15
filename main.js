/**
 * main.js - Точка входу SPA-застосунку LimbBot
 * Реалізує компонентний підхід та ієрархію модулів
 */

// Імпорт системних модулів
import { appState } from './store/state.js';
import { appRouter } from './services/router.js';
import { fetchBotReviews } from './services/api.js';

// Імпорт UI-компонентів (Presentational)
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

// Імпорт сторінок-контейнерів (Container/Logic)
import { HomePage } from './pages/Home.js';
import { AboutPage } from './pages/About.js';
import { ContactPage } from './pages/Contact.js';
import { ReviewsPage } from './pages/Reviews.js';

const appRoot = document.getElementById('app');

/**
 * Головна функція рендеру
 * Збирає сторінку з компонентів залежно від поточного стану
 */
const renderApp = async (state) => {
    let pageContent = '';

    // Клієнтський роутинг: вибір контенту сторінки
    switch (state.currentPath) {
        case '/':
            pageContent = HomePage();
            break;
        case '/about':
            pageContent = AboutPage(); // Використовує перевикористовуваний компонент Card
            break;
        case '/reviews':
            pageContent = ReviewsPage(state); // Передача даних (Props) у сторінку-контейнер
            break;
        case '/contact':
            pageContent = ContactPage(state);
            break;
        default:
            pageContent = `<section class="content-block"><h2>404 - Сторінку не знайдено</h2></section>`;
    }

    // Формування фінальної структури DOM
    appRoot.innerHTML = `
        ${Header()} 
        <main>
            ${pageContent}
        </main>
        ${Footer()}
    `;

    // Життєвий цикл: Логіка після рендеру для конкретних сторінок
    attachPageListeners(state);
};

/**
 * Додаткові обробники подій для сторінок
 */
const attachPageListeners = (state) => {
    // Логіка форми на сторінці контактів
    if (state.currentPath === '/contact') {
        const form = document.getElementById('ideaForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const newIdea = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                // Оновлення стану (One-way data flow)
                appState.setState({ ideas: [newIdea, ...state.ideas] });
            });
        }
    }

    // Логіка завантаження даних API для сторінки відгуків
    if (state.currentPath === '/reviews' && state.reviews.length === 0 && !state.isReviewsLoading && !state.reviewsError) {
        handleApiLoading();
    }
};

/**
 * Асинхронна логіка завантаження даних із зовнішнього API
 */
const handleApiLoading = async () => {
    appState.setState({ isReviewsLoading: true });
    try {
        const data = await fetchBotReviews(); 
        appState.setState({ reviews: data, isReviewsLoading: false });
    } catch (error) {
        appState.setState({ reviewsError: error.message, isReviewsLoading: false });
    }
};

// Підписка на зміну стану: автоматичне перемальовування при будь-яких змінах
appState.subscribe(renderApp);

// Перший запуск застосунку
renderApp(appState.getState());
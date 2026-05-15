import { appState } from '../store/state.js';

class AppRouter {
    constructor(stateStore) {
        this.store = stateStore;
        this.init();
    }

    init() {
        // 1. Обробка кнопок "Вперед/Назад" у браузері
        window.addEventListener('popstate', () => {
            this.store.setState({ currentPath: window.location.pathname });
        });

        // 2. Перехоплення кліків по навігації
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault(); // Зупиняємо стандартний перехід
                const url = e.target.getAttribute('href');
                this.navigateTo(url);
            }
        });
    }

    navigateTo(url) {
        // Зміна URL без перезавантаження
        window.history.pushState(null, null, url);
        // Оновлюємо стан, що автоматично викличе перемальовування UI
        this.store.setState({ currentPath: url });
    }
}

// Ініціалізуємо роутер, передавши йому наш State
export const appRouter = new AppRouter(appState);
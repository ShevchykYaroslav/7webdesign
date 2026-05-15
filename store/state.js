class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = []; // Масив функцій, які чекають на оновлення
    }

    // Отримати поточний стан
    getState() {
        return this.state;
    }

    // Оновити стан і повідомити всіх "підписників" (перемалювати UI)
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    // Підписатись на зміни (сюди ми передамо функцію рендеру)
    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Ініціалізуємо глобальний стан із двома змінними (як у завданні)
export const appState = new Store({
    currentPath: window.location.pathname,
    ideas: [
        { name: "Адмін", email: "admin@limb.bot", message: "Перша тестова ідея в системі!" }
    ],

    reviews: [],
    isReviewsLoading: false,
    reviewsError: null
});
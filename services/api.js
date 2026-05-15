// api.js

const API_URL = 'https://jsonplaceholder.typicode.com';

// Асинхронна функція для отримання відгуків
export async function fetchBotReviews() {
    try {
        // GET-запит до API, обмежуємо до 6 елементів (мінімум 5 за завданням)
        const response = await fetch(`${API_URL}/comments?_limit=6`);
        
        // Перевіряємо, чи успішний запит (статус 200-299)
        if (!response.ok) {
            throw new Error(`Сталася помилка при завантаженні: ${response.status}`);
        }
        
        // Отримуємо JSON-дані
        const data = await response.json();
        return data;
        
    } catch (error) {
        // Перехоплюємо помилки мережі або помилки парсингу
        console.error("Помилка API:", error);
        throw error; // Перекидаємо помилку далі, щоб обробити її в інтерфейсі
    }
}
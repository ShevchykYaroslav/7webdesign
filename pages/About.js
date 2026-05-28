import { Card } from '../components/Card.js';

export const AboutPage = () => {
    const features = [
        { title: "Модерація", content: "Автоматичний захист від спаму.", subtitle: "🛡️" },
        { title: "Музика", content: "Найвища якість без затримок.", subtitle: "🎵" }
    ];
    // Передаємо дані в компонент (Props)
    const cardsHTML = features.map(feature => Card(feature)).join('');

    return `<section class="content-block"><h2>Про продукт</h2>${cardsHTML}</section>`;
};
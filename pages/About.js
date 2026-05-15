import { Card } from '../components/Card.js';

export const AboutPage = () => {
    // Дані для карток (замінюють жорсткий HTML)
    const features = [
        { title: "Модерація", content: "Автоматичний захист від спаму.", subtitle: "🛡️" },
        { title: "Музика", content: "Найвища якість без затримок.", subtitle: "🎵" },
        { title: "Економіка", content: "Вбудована система рівнів.", subtitle: "💰" }
    ];

    // Рендеримо список карток, передаючи Props у компонент Card
    const cardsHTML = features.map(feature => Card(feature)).join('');

    return `
        <section class="content-block">
            <h2>Про продукт</h2>
            <div class="cards-container">
                ${cardsHTML}
            </div>
        </section>
    `;
};
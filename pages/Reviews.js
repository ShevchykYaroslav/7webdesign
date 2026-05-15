import { Card } from '../components/Card.js';

export const ReviewsPage = (state) => {
    if (state.isReviewsLoading) return `<div class="content-block">Завантаження...</div>`;
    if (state.reviewsError) return `<div class="content-block">Помилка: ${state.reviewsError}</div>`;

    // ТУТ ВІДБУВАЄТЬСЯ ПОВТОРНЕ ВИКОРИСТАННЯ КОМПОНЕНТА!
    const reviewsHTML = state.reviews.map(review => Card({
        subtitle: `Користувач: ${review.email}`,
        title: `Тема: ${review.name}`,
        content: `"${review.body}"`
    })).join('');

    return `
        <section class="content-block">
            <h2>Що кажуть про LimbBot</h2>
            <div class="cards-container">
                ${reviewsHTML}
            </div>
        </section>
    `;
};
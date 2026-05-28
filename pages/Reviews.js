import { Card } from '../components/Card.js';

export const ReviewsPage = (state) => {
    if (state.isReviewsLoading) return `<section class="content-block">Завантаження...</section>`;
    if (state.reviewsError) return `<section class="content-block">Помилка: ${state.reviewsError}</section>`;

    // Повторне використання компонента!
    const reviewsHTML = state.reviews.map(review => Card({
        subtitle: `Від: ${review.email}`,
        title: review.name,
        content: review.body
    })).join('');

    return `<section class="content-block"><h2>Відгуки користувачів</h2>${reviewsHTML}</section>`;
};
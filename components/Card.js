// Приймає об'єкт props із даними для відображення
export const Card = ({ title, subtitle, content }) => {
    return `
        <div class="card">
            ${subtitle ? `<h4 style="color: #5865F2;">${subtitle}</h4>` : ''}
            <h5 style="margin: 0.5rem 0;">${title}</h5>
            <p style="font-size: 0.9rem;">${content}</p>
        </div>
    `;
};
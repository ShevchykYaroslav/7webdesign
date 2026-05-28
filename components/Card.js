export const Card = ({ title, subtitle, content }) => {
    return `
        <div class="card" style="margin-bottom: 1rem;">
            ${subtitle ? `<h4 style="color: #5865F2;">${subtitle}</h4>` : ''}
            <h5 style="margin: 0.5rem 0;">${title}</h5>
            <p>${content}</p>
        </div>
    `;
};
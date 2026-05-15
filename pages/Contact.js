export const ContactPage = (state) => {
    // Генеруємо HTML для збережених ідей
    const ideasHTML = state.ideas.map(idea => `
        <div class="card" style="margin-top: 1rem; text-align: left;">
            <h4 style="color: #2ecc71;">💡 ${idea.name}</h4>
            <p>${idea.message}</p>
        </div>
    `).join('');

    return `
        <section class="content-block" style="animation: fadeIn 0.5s;">
            <h2>Контактна форма</h2>
            <form id="ideaForm" class="contact-form">
                <div class="form-group">
                    <input type="text" id="name" placeholder="Ім'я" required>
                </div>
                
                <div class="form-group">
                    <input type="email" id="email" placeholder="Email" required>
                </div>
                
                <div class="form-group">
                    <textarea id="message" rows="3" placeholder="Ваша ідея" required></textarea>
                </div>
                <button type="submit">Надіслати</button>
            </form>
            <div style="margin-top: 2rem;">
                <h3>Залишені пропозиції:</h3>
                ${ideasHTML}
            </div>
        </section>
    `;
};
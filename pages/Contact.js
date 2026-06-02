export const ContactPage = (state) => {
    const ideasHTML = state.ideas.map(idea => `
        <article class="card" style="margin-top: 1rem; text-align: left;">
            <h4 style="color: #5865F2;">💡 ${idea.name}</h4>
            <p>${idea.message}</p>
        </article>
    `).join('');

    return `
        <section class="content-block" style="animation: fadeIn 0.5s;">
            <h2>Контактна форма</h2>
            <form id="ideaForm" class="contact-form">
                <div class="form-group">
                    <label for="name" style="display: block; margin-bottom: 0.5rem;">Ваше ім'я</label>
                    <input type="text" id="name" placeholder="Введіть ім'я" required aria-required="true">
                </div>
                
                <div class="form-group">
                    <label for="email" style="display: block; margin-bottom: 0.5rem;">Ваш Email</label>
                    <input type="email" id="email" placeholder="Введіть email" required aria-required="true">
                </div>
                
                <div class="form-group">
                    <label for="message" style="display: block; margin-bottom: 0.5rem;">Ваша ідея</label>
                    <textarea id="message" rows="3" placeholder="Опишіть вашу ідею" required aria-required="true"></textarea>
                </div>
                <button type="submit" aria-label="Надіслати ідею розробникам">Надіслати</button>
            </form>
            
            <div style="margin-top: 2rem;" aria-live="polite">
                <h3>Залишені пропозиції:</h3>
                ${ideasHTML}
            </div>
        </section>
    `;
};
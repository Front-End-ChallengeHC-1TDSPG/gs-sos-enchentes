document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.textContent = isExpanded ? '☰' : '✕';
        });
    }

    // FAQ 
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('active');
            
            // Fecha todas as respostas
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
                item.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
            });
            
            // Se não estiver aberta, abre a resposta clicada
            if (!isOpen) {
                answer.classList.add('active');
                this.querySelector('.toggle-icon').textContent = '-';
            }
        });

        // Adiciona ícone de toggle
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '+';
        question.appendChild(toggleIcon);
    });

    // Validação de Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Limpa erros anteriores
            document.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validação do nome
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome');
                isValid = false;
            }
            
            // Validação do email
            if (email.value.trim() === '' || !isValidEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }
            
            // Validação da mensagem
            if (message.value.trim() === '') {
                showError(message, 'Por favor, insira sua mensagem');
                isValid = false;
            }
            
            if (isValid) {
                    
                showSuccess('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                this.reset();
            }
        });
    }
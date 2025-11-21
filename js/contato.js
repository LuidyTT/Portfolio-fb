// Script específico para a página Contato
document.addEventListener('DOMContentLoaded', function () {
    console.log('Script de contato carregado!');

    // ========== DARK MODE ==========
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        // Verificar preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-moon';
        }

        // Alternar tema
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');

            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Inicializar mapa
    function initMap() {
        // Verifica se o elemento mapa existe
        if (!document.getElementById('map')) {
            console.log('Mapa não encontrado');
            return;
        }

        try {
            const map = L.map('map').setView([-23.5632, -46.6544], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Marcador personalizado
            const customIcon = L.divIcon({
                html: '<i class="fas fa-map-marker-alt" style="color: #2c5aa0; font-size: 30px;"></i>',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                className: 'custom-marker'
            });

            L.marker([-23.5632, -46.6544], { icon: customIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="text-align: center;">
                        <h3 style="margin: 0 0 10px 0; color: #2c5aa0;">Cadesnet</h3>
                        <p style="margin: 0;">Av. Paulista, 1000<br>São Paulo - SP</p>
                    </div>
                `)
                .openPopup();

            console.log('Mapa inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar mapa:', error);
        }
    }

    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log(`Encontrados ${faqItems.length} itens FAQ`);

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            if (question) {
                question.addEventListener('click', function () {
                    const isActive = item.classList.contains('active');
                    
                    // Fechar todos os itens
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Se não estava ativo, ativar
                    if (!isActive) {
                        item.classList.add('active');
                        question.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }

    // Validação do formulário
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) {
            console.log('Formulário não encontrado');
            return;
        }

        const submitBtn = form.querySelector('.btn-submit');
        const successMessage = document.getElementById('formSuccess');

        // Máscara de telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
                e.target.value = value;
            });
        }

        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clearError(this);
            });
        });

        function validateField(field) {
            const value = field.value.trim();

            // Limpar erro anterior
            clearError(field);

            // Validações específicas
            if (field.required && !value) {
                showError(field, 'Este campo é obrigatório');
                return false;
            }

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, 'Por favor, insira um e-mail válido');
                    return false;
                }
            }

            if (field.id === 'phone' && value) {
                const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    showError(field, 'Por favor, insira um telefone válido');
                    return false;
                }
            }

            return true;
        }

        function showError(field, message) {
            field.style.borderColor = '#dc3545';
            const errorElement = document.getElementById(field.id + 'Error');
            if (errorElement) errorElement.textContent = message;
        }

        function clearError(field) {
            field.style.borderColor = '';
            const errorElement = document.getElementById(field.id + 'Error');
            if (errorElement) errorElement.textContent = '';
        }

        function validateForm() {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        // Envio do formulário
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                // Simular envio
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                    form.reset();
                    if (successMessage) {
                        successMessage.style.display = 'block';

                        // Rolagem suave para a mensagem de sucesso
                        successMessage.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });

                        // Esconder mensagem após alguns segundos
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    }
                }, 2000);
            }
        });

        console.log('Validação do formulário inicializada');
    }

    // Menu mobile
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            mobileMenuBtn.addEventListener('click', function () {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                navMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', (!isExpanded).toString());
                
                // Alterar ícone do menu
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
                }
            });

            // Fechar menu ao clicar em um link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                });
            });
        }
    }

    // Cookies
    function initCookies() {
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptCookies = document.getElementById('acceptCookies');
        const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
        
        if (!cookieConsent) return;

        // Verificar se já aceitou cookies
        if (!localStorage.getItem('cookies-accepted')) {
            setTimeout(() => {
                cookieConsent.style.display = 'block';
            }, 1000);
        }

        if (acceptCookies) {
            acceptCookies.addEventListener('click', function () {
                localStorage.setItem('cookies-accepted', 'true');
                cookieConsent.style.display = 'none';
            });
        }

        if (cookieSettingsBtn) {
            cookieSettingsBtn.addEventListener('click', function () {
                // Aqui você pode implementar configurações de cookies mais detalhadas
                alert('Configurações de cookies - Em desenvolvimento');
            });
        }
    }

    // Animação de entrada para elementos
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.form-content, .sidebar-card, .info-card, .faq-item, .map-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Inicializar todos os componentes
    try {
        initMap();
        initFAQ();
        initFormValidation();
        initMobileMenu();
        initCookies();
        initAnimations();

        // Adicionar classe de carregamento ao body
        document.body.classList.add('loaded');
        
        console.log('Todos os componentes inicializados com sucesso');
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    }
});

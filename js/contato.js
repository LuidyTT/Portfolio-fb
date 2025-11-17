// Script específico para a página Contato
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Inicializar mapa
    function initMap() {
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
    }
    
    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Fechar outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar item atual
                item.classList.toggle('active');
            });
        });
    }
    
    // Validação do formulário
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.btn-submit');
        const successMessage = document.getElementById('formSuccess');
        
        // Máscara de telefone
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            e.target.value = value;
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const errorElement = document.getElementById(field.id + 'Error');
            
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
            errorElement.textContent = message;
        }
        
        function clearError(field) {
            field.style.borderColor = '';
            const errorElement = document.getElementById(field.id + 'Error');
            errorElement.textContent = '';
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
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simular envio
                submitBtn.classList.add('loading');
                
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    form.reset();
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
                }, 2000);
            }
        });
    }
    
    // Animação de entrada para elementos
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.contact-method, .contact-form-container, .faq-item, .map-container');
        const fadeInObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(element);
        });
    }
    
    // Inicializar componentes
    initMap();
    initFAQ();
    initFormValidation();
    animateOnScroll();
    
    // Efeito de digitação no header
    function typeWriterEffect() {
        const subtitle = document.querySelector('.page-header p');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.unobserve(subtitle);
                }
            });
            
            observer.observe(subtitle);
        }
    }
    
    typeWriterEffect();
    
    // Adicionar classe de carregamento ao body
    document.body.classList.add('loaded');
});
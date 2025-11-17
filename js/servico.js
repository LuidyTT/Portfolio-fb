// Script específico para a página Serviços
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
    
    // Animação de entrada para elementos
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .advantage-card');
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
    
    // Botões de contratação
    const contractButtons = document.querySelectorAll('.pricing-cta .btn');
    contractButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planTitle = this.closest('.pricing-card').querySelector('h3').textContent;
            const planPrice = this.closest('.pricing-card').querySelector('.amount').textContent;
            
            // Simulação de contratação - na implementação real, isso redirecionaria para um formulário
            alert(`Você selecionou o plano ${planTitle} no valor de R$ ${planPrice}/mês\n\nEm breve você será redirecionado para o formulário de contratação.`);
        });
    });
    
    // Smooth scroll para âncoras
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contador de serviços (para demonstração)
    function initServiceCounters() {
        const counters = document.querySelectorAll('.plan-speed');
        counters.forEach(counter => {
            if (counter.textContent.includes('Mbps')) {
                const speed = counter.textContent.match(/\d+/)[0];
                counter.textContent = `${speed} Mbps`;
            }
        });
    }
    
    // Inicializar animações
    animateOnScroll();
    initServiceCounters();
    
    // Efeito de digitação no header (opcional)
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
            
            // Iniciar efeito quando a seção estiver visível
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.unobserve(subtitle);
                }
            });
            
            observer.observe(subtitle);
        }
    }
    
    // Iniciar efeito de digitação
    typeWriterEffect();
    
    // Newsletter form (se houver)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Obrigado por se inscrever com o email: ${email}`);
            this.reset();
        });
    }
});
// Aguarda o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do carrossel no HTML
    const carousel = document.querySelector('#carousel-section');
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    // Variáveis de controle
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 segundos

    // Função para mostrar um slide específico
    const showSlide = (index) => {
        // Move o container dos slides para a esquerda/direita
        container.style.transform = `translateX(-${index * 100}%)`;
    };

    // Função para avançar para o próximo slide
    const nextSlide = () => {
        // Se estiver no último slide, volta para o primeiro. Senão, avança.
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Função para voltar para o slide anterior
    const prevSlide = () => {
        // Se estiver no primeiro slide, vai para o último. Senão, volta.
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // --- REGRAS DE IMPLEMENTAÇÃO ---

    // 1. Início Automático e 4. Reinício do Temporizador
    const startTimer = () => {
        // Limpa qualquer temporizador anterior para evitar múltiplos timers rodando
        clearInterval(slideInterval);
        // Inicia um novo temporizador
        slideInterval = setInterval(nextSlide, slideDuration);
    };

    // 3. Pausa Inteligente (Hover)
    const stopTimer = () => {
        clearInterval(slideInterval);
    };

    // 2. Navegação Manual
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer(); // Reinicia o temporizador após o clique manual
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer(); // Reinicia o temporizador após o clique manual
    });

    // 3. Pausa Inteligente (Hover)
    carousel.addEventListener('mouseenter', stopTimer);
    // 4. Reinício do Temporizador (quando o mouse sai)
    carousel.addEventListener('mouseleave', startTimer);

    // Inicia o carrossel assim que a página carrega
    startTimer();
});
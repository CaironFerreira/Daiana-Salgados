// js/ui-enhancements.js

// IIFE (Immediately Invoked Function Expression) para aplicar o tema salvo imediatamente
// Isso evita o "flash" da tela com o tema padrão antes da troca.
(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    // Se não houver tema salvo ou for 'light', não faz nada, pois o light é o padrão.
})();


// Adiciona os event listeners após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO ALTERNADOR DE TEMA ---
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Verifica se o botão de tema existe na página atual
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // 1. Alterne a classe .dark-theme no body
            document.body.classList.toggle('dark-theme');

            // 2. Verifique qual tema está ativo AGORA e salva no localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark'); // Salva a preferência
            } else {
                localStorage.setItem('theme', 'light'); // Salva a preferência
            }
        });
    }

    // --- LÓGICA DO BOTÃO "VOLTAR AO TOPO" --- (Exemplo de como adicionar mais funcionalidades a este arquivo)
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// Adiciona os event listeners após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

   

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Adiciona/remove a classe 'active' para mostrar/esconder o menu
            navLinks.classList.toggle('active');
            // Adiciona/remove a classe 'active' para animar o botão
            hamburger.classList.toggle('active');
        });
    }

});
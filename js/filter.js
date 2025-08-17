// js/filter.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de filtro e todos os cards de projeto
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMessage = document.getElementById('no-projects-message');

    // Adiciona um evento de clique para cada botão de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Atualiza o botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            let visibleCards = 0;

            // Percorre todos os cards para exibir ou esconder
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Se a categoria for "todos" ou se a categoria do card for a mesma do botão
                if (category === 'todos' || cardCategory === category) {
                    card.classList.remove('hidden'); // Mostra o card
                    visibleCards++;
                } else {
                    card.classList.add('hidden'); // Esconde o card
                }
            });

            // Mostra a mensagem "Nenhum produto" se nenhum card estiver visível
            if (visibleCards === 0) {
                noProjectsMessage.classList.remove('hidden');
            } else {
                noProjectsMessage.classList.add('hidden');
            }
        });
    });
});
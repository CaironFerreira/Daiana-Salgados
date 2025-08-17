
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleção de Elementos do DOM
    // =========================================================================
    // Pega todos os elementos da página que o script irá manipular.
    
    const loginLink = document.getElementById('login-link');
    const userProfile = document.getElementById('user-profile');
    const logoutLink = document.getElementById('logout-link');
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    
    const modalOverlay = document.getElementById('login-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginForm = document.getElementById('login-form');
    

    // 2. Lógica de Estado e Eventos
    // =========================================================================
    // Define o comportamento da página com base no estado de login e nos eventos do usuário.

    // Verifica se o usuário já está logado ao carregar a página.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        if (loginLink) loginLink.classList.add('hidden');
        if (userProfile) userProfile.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.textContent = username;
        if (userAvatar) userAvatar.src = 'images/icon_perfil.png';
    }

    // Evento para o botão de Logout.
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.reload();
        });
    }

    // Evento para abrir o Modal de Login.
    if (loginLink) {
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (modalOverlay) modalOverlay.classList.remove('hidden');
        });
    }

    // Eventos para fechar o Modal de Login (no botão 'X', clique fora ou tecla Esc).
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Evento para validar e submeter o formulário de Login.
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const emailInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value;
            
            clearErrors();
            let isValid = true;

            // Validação do campo de E-mail.
            if (emailValue === '') {
                showError(emailInput, 'O campo E-mail é obrigatório.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, 'Por favor, digite um formato de e-mail válido.');
                isValid = false;
            }

            // Validação do campo de Senha.
            if (passwordValue === '') {
                showError(passwordInput, 'O campo Senha é obrigatório.');
                isValid = false;
            } else if (passwordValue.length < 8) {
                showError(passwordInput, 'A senha deve ter no mínimo 8 caracteres.');
                isValid = false;
            }

            // Se o formulário for válido, simula o login.
            if (isValid) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', emailValue);
                closeModal();
                window.location.reload();
            }
        });
    }


    // 3. Funções Auxiliares (Helpers)
    // =========================================================================
    // Funções reutilizáveis que dão suporte à lógica principal.

    // Função para fechar o modal.
    function closeModal() {
        if (modalOverlay) modalOverlay.classList.add('hidden');
    }

    // Função que valida o formato do e-mail usando Regex.
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para exibir uma mensagem de erro abaixo de um campo do formulário.
    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        const errorElement = document.createElement('small');
        errorElement.className = 'form-error-message';
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }

    // Função para limpar todas as mensagens de erro antes de uma nova validação.
    function clearErrors() {
        document.querySelectorAll('.form-error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    }

});
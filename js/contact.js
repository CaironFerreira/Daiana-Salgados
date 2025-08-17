/*
    Arquivo: js/contact.js
    Projeto: Daiana Salgados
    Descrição: Controla a validação do formulário de contato, o contador 
               de caracteres e a funcionalidade de copiar e-mail.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleção de Elementos do DOM
    // =========================================================================
    // Armazena todos os elementos HTML que o script irá manipular.
    
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const charCounter = document.getElementById('char-counter');
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailSpan = document.getElementById('contact-email');
    
    const toastElement = document.getElementById('custom-toast');
    const toastMessage = document.getElementById('toast-message');
    
    const MAX_CHARS = 500;


    // 2. Lógica de Eventos
    // =========================================================================
    // Define o que acontece quando o usuário interage com a página.

    // Atualiza o contador de caracteres da mensagem em tempo real.
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            const currentLength = messageInput.value.length;
            charCounter.textContent = `${currentLength}/${MAX_CHARS}`;
            charCounter.classList.toggle('error', currentLength > MAX_CHARS);
        });
    }

    // Valida o formulário de contato ao tentar enviar.
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            if (validateContactForm()) {
                showToast('Mensagem enviada com sucesso!');
                contactForm.reset();
                charCounter.textContent = `0/${MAX_CHARS}`;
                charCounter.classList.remove('error');
            }
        });
    }
    
    // Copia o e-mail para a área de transferência ao clicar no botão.
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailSpan.textContent).then(() => {
                showToast('Email copiado com sucesso!');
                updateCopyButtonState();
            }).catch(err => {
                console.error('Falha ao copiar o e-mail: ', err);
                showToast('Falha ao copiar o e-mail.', 'error');
            });
        });
    }


    // 3. Funções Auxiliares (Helpers)
    // =========================================================================
    // Funções reutilizáveis que dão suporte à lógica principal.

    // Valida todos os campos do formulário de contato.
    function validateContactForm() {
        clearErrors();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'O campo Nome é obrigatório.');
            isValid = false;
        }
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'O campo E-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um endereço de e-mail válido.');
            isValid = false;
        }
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'O campo Assunto é obrigatório.');
            isValid = false;
        }
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'A mensagem deve ter no mínimo 10 caracteres.');
            isValid = false;
        }
        if (messageInput.value.length > MAX_CHARS) {
            showError(messageInput, `A mensagem não pode exceder ${MAX_CHARS} caracteres.`);
            isValid = false;
        }
        return isValid;
    }

    // Exibe a notificação personalizada (toast).
    function showToast(message, type = 'success') {
        if (!toastElement || !toastMessage) return;
        toastMessage.textContent = message;
        toastElement.className = 'custom-toast'; // Reseta as classes
        toastElement.classList.add(type, 'show');

        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000);
    }
    
    // Altera o estado do botão 'Copiar E-mail' temporariamente.
    function updateCopyButtonState() {
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copiado!';
        copyEmailBtn.disabled = true;

        setTimeout(() => {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.disabled = false;
        }, 2000);
    }

    // Valida o formato de e-mail usando Regex.
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Exibe uma mensagem de erro abaixo de um campo do formulário.
    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        const errorElement = document.createElement('small');
        errorElement.className = 'form-error-message';
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
    }

    // Limpa todas as mensagens de erro antes de uma nova validação.
    function clearErrors() {
        document.querySelectorAll('.form-error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    }

});
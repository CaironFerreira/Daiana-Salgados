// js/search.js

document.addEventListener('DOMContentLoaded', async () => {
    // Seleciona os elementos da página
    const resultsContainer = document.getElementById('results-container');
    const searchTermSpan = document.getElementById('search-term');

    // 1. Captura de Termo: Pega o termo de busca da URL
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('q');

    // Limpa o container e exibe o termo buscado
    resultsContainer.innerHTML = '';
    searchTermSpan.textContent = searchTerm;

    if (!searchTerm) {
        resultsContainer.innerHTML = '<p>Por favor, digite um termo para a busca.</p>';
        return;
    }

    // Lista de páginas do site para pesquisar
    const pagesToSearch = [
        { url: 'index.html', title: 'Início' },
        { url: 'portfolio.html', title: 'Cardápio' },
        { url: 'contato.html', title: 'Contato' }
    ];

    let resultsFound = false;

    // 2. Busca Assíncrona: Usa fetch() para carregar cada página
    for (const page of pagesToSearch) {
        try {
            const response = await fetch(page.url);
            if (!response.ok) continue; // Pula para a próxima página se houver erro

            const htmlText = await response.text();

            // 3. Análise do DOM: Converte o texto HTML em um documento pesquisável
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            // 4. Busca de Conteúdo: Busca em tags de texto como h1, h2, p, etc.
            const contentElements = doc.querySelectorAll('h1, h2, h3, p, a, li, span');
            
            contentElements.forEach(element => {
                if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                    resultsFound = true;
                    
                    // 5. Exibição de Resultados
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';

                    // Pega um trecho do texto (contexto)
                    let context = element.textContent;
                    if (context.length > 150) {
                        context = context.substring(0, 150) + '...';
                    }

                    // Destaca o termo encontrado no contexto
                    const highlightedContext = context.replace(
                        new RegExp(searchTerm, 'gi'),
                        (match) => `<mark>${match}</mark>`
                    );

                    resultItem.innerHTML = `
                        <h3><a href="${page.url}">${page.title}</a></h3>
                        <p>${highlightedContext}</p>
                    `;
                    
                    resultsContainer.appendChild(resultItem);
                }
            });

        } catch (error) {
            console.error(`Erro ao buscar na página ${page.url}:`, error);
        }
    }

    if (!resultsFound) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado para o termo buscado.</p>';
    }
});
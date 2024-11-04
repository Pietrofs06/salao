document.addEventListener('DOMContentLoaded', function() {
    const municipioInput = document.getElementById('insiraLocalidade'); // ID do input
    const municipioSuggestionsContainer = document.createElement('div'); // Cria o container de sugestões
    municipioSuggestionsContainer.setAttribute('id', 'municipio-suggestions-container'); // Define o ID
    municipioSuggestionsContainer.className = 'autocomplete-items'; // Define a classe para estilo

    // Insere o container diretamente abaixo do campo de input
    municipioInput.parentNode.insertBefore(municipioSuggestionsContainer, municipioInput.nextSibling);

    // Função para renderizar a lista de municípios filtrados
    function renderMunicipioList(municipios) {
        municipioSuggestionsContainer.innerHTML = ''; // Limpa a lista existente

        municipios.forEach(municipio => {
            const div = document.createElement('div');
            div.className = 'suggestion-item'; // Classe para cada item de sugestão
            div.textContent = municipio.nome;

            // Evento para preencher o input ao clicar na sugestão
            div.addEventListener('click', function() {
                municipioInput.value = municipio.nome; // Preenche o input com o município escolhido
                municipioSuggestionsContainer.innerHTML = ''; // Limpa as sugestões
            });

            municipioSuggestionsContainer.appendChild(div);
        });
    }

    // Função para buscar todos os municípios e filtrar conforme a pesquisa
    async function searchMunicipios(query) {
        const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar municípios');
            }
            const data = await response.json();
            const filteredMunicipios = data.filter(municipio =>
                municipio.nome.toLowerCase().includes(query.toLowerCase())
            );
            renderMunicipioList(filteredMunicipios);
        } catch (error) {
            console.error(error);
            municipioSuggestionsContainer.innerHTML = 'Erro ao buscar municípios.';
        }
    }

    // Função para retornar uma lista padrão de cidades
    function getDefaultCities() {
        return [
            { nome: "São Paulo" },
            { nome: "Rio de Janeiro" },
            { nome: "Belo Horizonte" },
            { nome: "Curitiba" },
            { nome: "Salvador" },
            { nome: "Fortaleza" },
            { nome: "Manaus" },
            { nome: "Brasília" },
            { nome: "Recife" },
            { nome: "Porto Alegre" }
        ];
    }

    // Evento de entrada para buscar municípios conforme o usuário digita
    municipioInput.addEventListener('input', function() {
        const query = municipioInput.value.trim(); // Remove espaços
        if (query.length > 0) { // Busca apenas se houver algo digitado
            searchMunicipios(query); // Busca municípios
        } else {
            // Exibe sugestões padrão se o input estiver vazio
            const defaultCities = getDefaultCities();
            renderMunicipioList(defaultCities);
        }
    });

    // Fecha a lista de sugestões quando o usuário clica fora
    document.addEventListener('click', function(event) {
        if (event.target !== municipioInput) {
            municipioSuggestionsContainer.innerHTML = ''; // Limpa as sugestões
        }
    });
});

const input = document.getElementById("insiraLocalidade");
const temperatura = document.getElementById("temperatura");
const umidade = document.getElementById("umidade");
const descricao = document.getElementById("descricao");
const infos = document.getElementById("infos");
const historico = document.getElementById("historico");
const whichIcon = document.getElementById("whichIcon");

//API
const apiKey = "56d8fdb9ee5a41c3c40c148c17dc73c8";

//Funções
const checarAlteracao = async () => {
    const cidadeDigitada = input.value;
    if (cidadeDigitada === "") {
        alert("Por favor, digite uma cidade válida.");
        return;
    }
    try {
        //faz a chamada para a API
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidadeDigitada}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao obter previsão do tempo!");
        }

        const dataTempo = await resposta.json();

        exibirInformacoes(dataTempo);
    } catch (error) {
        // Exibe uma mensagem de erro caso algo dê errado
        //infos.innerHTML = `<p>Erro: ${error.message}</p>`;
        alert(`Erro: ${error.message}`)
    }
};

const exibirInformacoes = (dataTempo) => {
    // Captura as informações do tempo da API
    const temperaturaData = dataTempo.main.temp;
    const descricaoData = dataTempo.weather[0].description || "Descrição não disponível";
    const umidadeData = dataTempo.main.humidity;
    const cidadeNomeData = dataTempo.name;

    // Altera os Ícones
    const icon = getWeatherIcon(descricaoData);

    // Exibe as informações no HTML
    infos.textContent = `Previsão do tempo em: ${cidadeNomeData}`
    temperatura.textContent = `Temperatura: ${temperaturaData}°C`
    descricao.textContent = `Descrição: ${descricaoData}`
    umidade.textContent = `Umidade: ${umidadeData}%`

    if (icon != null){
        whichIcon.src = icon
    }
};

function getWeatherIcon(description) {
    // Mapear descrições de clima para ícones
    const iconMapping = {
        "céu limpo": "static/svgs/ensolarado.svg",
        "poucas nuvens": "static/svgs/nublado.svg",
        "nublado": "static/svgs/nublado.svg",
        "chuva": "static/svgs/chuva.svg",
        "chuva com sol": "static/svgs/chuva-sol.svg",
        "trovoadas": "static/svgs/trovões.svg",
        "neve": "static/svgs/neve.svg",
        "névoa": "static/svgs/névoa.svg",
        "chuva leve": "static/svgs/chuva-leve.svg",
        "chuva moderada": "static/svgs/chuva-leve.svg",
        // Adicione outros mapeamentos conforme necessário
    };

    // Retorna o ícone correspondente ou um ícone padrão
    return iconMapping[description.toLowerCase()] || "static/svgs/default.svg";
}

//Checa o que foi digitado
input.addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === "Enter") {
        checarAlteracao();
    }
});

function displayError(message) {
    forecastInfo.innerHTML = ''; // Limpa a previsão anterior em caso de erro
}
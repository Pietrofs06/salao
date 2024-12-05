document.addEventListener('DOMContentLoaded', function () {
    // Função para enviar dados do formulário para o Formspree
    function enviarFormulario(form, formspreeURL) {
        const formData = new FormData(form); // Passa o formulário como argumento
        const data = {};

        // Converte os dados do FormData para um objeto simples
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Envia os dados usando fetch
        fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' // Define o Content-Type como application/json
            },
            body: JSON.stringify(data) // Converte os dados para JSON
        })
        .then(response => {
            if (response.ok) {
                alert('Mensagem enviada com sucesso!');
                form.reset(); // Reseta o formulário em caso de sucesso
            } else {
                alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar a mensagem.');
        });
    }

    // Verifica se o formulário de contato está na página
    const contatoForm = document.getElementById('submit');

    if (contatoForm) {
        const formspreeURLContato = 'https://formspree.io/f/mrbgpnea'; // URL para o Formspree de contato
        contatoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            enviarFormulario(contatoForm, formspreeURLContato);
        });
    }
        
        // Verifica se o formulário de contato está na página
        const contatoForm2 = document.getElementById('submit');

        if (contatoForm2) {
            const formspreeURLContato = 'https://formspree.io/f/mldejqjy'; // URL para o Formspree de contato
            contatoForm2.addEventListener('submit', function (event) {
                event.preventDefault();
                enviarFormulario(contatoForm2, formspreeURLContato);
            });
        }
});

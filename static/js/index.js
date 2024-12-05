// Função para alternar o menu de navegação
function toggleMenu() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}

// Adiciona evento de clique ao botão de toggle do menu 
document.querySelector('.toggle-menu-btn').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
});

// Fecha o menu ao clicar em um dos itens
document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('active');
    });
});

// --- MENU COM ROLAGEM SUAVE ---

// Selecionar todos os links do menu que começam com #
document.querySelectorAll('.menu a[href^="#"]').forEach(anchor => {
    
    // Adicionar um ouvinte de evento para o clique
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Pegar o ID do elemento alvo a partir do href do link
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Verificar se o elemento alvo existe antes de rolar
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // O 70 é um ajuste para a altura do menu fixo
                behavior: 'smooth'
            });
        }
    });
});


// --- BOTÃO VOLTAR AO TOPO ---

// Selecionar o botão
const backToTopButton = document.querySelector("#back-to-top");

// Mostrar ou esconder o botão baseado na rolagem
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // Se a rolagem passar de 300px
        backToTopButton.classList.add("show");
    } else {
        // Se estiver no topo, esconder o botão
        backToTopButton.classList.remove("show");
    }
});

/* Quando o botão for clicado, rolar suavemente para o topo */
backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- EFEITO DE DIGITAÇÃO NO TÍTULO ---

// Selecionar o elemento do título
const titleElement = document.querySelector('#typing-effect');

// Guardar o texto original que está no HTML
const textToType = titleElement.innerHTML;

// Limpar o título para começar o efeito
titleElement.innerHTML = '';

// Função principal para o efeito de digitação
function startTypingLoop(element, text) {
    let index = 0;
    let isDeleting = false;

    // Função que faz o efeito de digitar e apagar
    function type() {
        // Pegar o texto atual que será digitado ou apagado
        const currentText = text;
        
        if (isDeleting) {
            // Se estiver apagando, remove uma letra
            element.innerHTML = currentText.substring(0, index - 1);
            index--;
        } else {
            // Se estiver digitando, adiciona uma letra
            element.innerHTML = currentText.substring(0, index + 1);
            index++;
        }

        // Lógica para alternar entre digitar e apagar
        if (!isDeleting && index === currentText.length) {
            // Se terminou de digitar, começa a apagar
            isDeleting = true;
            setTimeout(type, 2000); // Pausa de 2 segundos com o texto completo
        } else if (isDeleting && index === 0) {
            // Se terminou de apagar, começa a digitar de novo
            isDeleting = false;
            setTimeout(type, 500); // Pausa de 0.5 segundos antes de recomeçar
        } else {
            // Continuar o processo (digitando ou apagando)
            const typingSpeed = isDeleting ? 70 : 120; // Apaga mais rápido do que digita
            setTimeout(type, typingSpeed);
        }
    }

    // Iniciar o ciclo pela primeira vez
    type();
}

// Chamar a função principal para iniciar o loop
startTypingLoop(titleElement, textToType);


// --- DESTAQUE DO LINK DO MENU COM INTERSECTION OBSERVER ---

// Selecionar todas as seções e links do menu
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.menu a');

// Configurações do Intersection Observer
const observerOptions = {
    root: null, // Observa em relação à viewport (a tela inteira)
    rootMargin: '0px',
    threshold: 0.3 // A mágica acontece aqui!
};

// Criar o Intersection Observer
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Se a seção está visível na tela (de acordo com o threshold)
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Remover a classe 'active' de todos os links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Adicionar a classe 'active' apenas ao link correto
            const activeLink = document.querySelector(`.menu a[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Colocar o observador para "vigiar" cada seção
sections.forEach(section => {
    sectionObserver.observe(section);
});


// --- INTERATIVIDADE ENTRE TEXTO E IMAGENS DA SEÇÃO "SOBRE MIM" ---

// Selecionar todos os elementos que vamos manipular
const keywordDados = document.querySelector('#keyword-dados');
const keywordMusculacao = document.querySelector('#keyword-musculacao');
const keywordBahia = document.querySelector('#keyword-bahia');
const imgDados = document.querySelector('#img-dados');
const imgMusculacao = document.querySelector('#img-musculacao');
const imgBahia = document.querySelector('#img-bahia');

// Criar uma função reutilizável para o efeito
function linkKeywordToImage(keyword, image) {
    // Quando o mouse ENTRA na palavra...
    keyword.addEventListener('mouseover', () => {
        image.classList.add('highlighted');
    });

    // Quando o mouse SAI da palavra...
    keyword.addEventListener('mouseout', () => {
        image.classList.remove('highlighted');
    });
}

// Chamar a função para criar as conexões
linkKeywordToImage(keywordDados, imgDados);
linkKeywordToImage(keywordMusculacao, imgMusculacao);
linkKeywordToImage(keywordBahia, imgBahia);


// --- CURSOR PERSONALIZADO ---

// Selecionar os elementos do cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Ouvir o evento de movimento do mouse na janela inteira
window.addEventListener('mousemove', function (e) {
    // Pegar a posição X e Y do mouse
    const posX = e.clientX;
    const posY = e.clientY;

    // Mover o ponto central instantaneamente para a posição do mouse
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Mover o contorno com uma animação suave
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Lógica para o efeito de "crescer" ao passar por links
const links = document.querySelectorAll('a');

// Adicionar ouvintes de evento para cada link
links.forEach(link => {

    /* Adiciona a classe quando o mouse entra no link */
    link.addEventListener('mouseover', () => {
        cursorOutline.classList.add('grow'); /* Adiciona a classe para crescer o cursor */
    });

    /* Remove a classe quando o mouse sair do link */
    link.addEventListener('mouseout', () => {
        cursorOutline.classList.remove('grow'); /* Remove a classe para voltar ao tamanho normal */
    });
});
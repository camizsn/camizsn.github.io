// --- MENU COM ROLAGEM SUAVE ---
document.querySelectorAll('.menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Fecha o menu mobile ao clicar em um link (se estiver aberto)
        if (navMenu.classList.contains('active')) {
            toggleMenu({ currentTarget: btnMobile }); // Simula um evento de clique para fechar
        }
        
        // Rola suavemente para a seção correspondente
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Verifica se o elemento alvo existe antes de rolar
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


// --- BOTÃO VOLTAR AO TOPO ---
const backToTopButton = document.querySelector("#back-to-top");
// Verifica se o botão existe antes de adicionar o evento
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// Adiciona o evento de clique para rolar suavemente para o topo
backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- EFEITO DE DIGITAÇÃO NO TÍTULO ---
const titleElement = document.querySelector('#typing-effect');
const textToType = titleElement.innerHTML;
titleElement.innerHTML = '';
// Função para criar o efeito de digitação
function startTypingLoop(element, text) {
    let index = 0;
    let isDeleting = false;
    function type() {
        const currentText = text; // Texto completo a ser digitado
        // Verifica se está deletando ou digitando
        if (isDeleting) { // Se estiver deletando, remove o último caractere
            element.innerHTML = currentText.substring(0, index - 1);
            index--;
        } else { // Se estiver digitando, adiciona o próximo caractere
            element.innerHTML = currentText.substring(0, index + 1);
            index++;
        }
        // Verifica se chegou ao final do texto ou se está deletando
        if (!isDeleting && index === currentText.length) { // Se chegou ao final do texto, inicia a deleção
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && index === 0) { // Se terminou de deletar, reinicia o processo de digitação
            isDeleting = false;
            setTimeout(type, 500);
        } else { // Continua digitando ou deletando
            const typingSpeed = isDeleting ? 70 : 120;
            setTimeout(type, typingSpeed); // Define a velocidade de digitação ou deleção
        }
    }
    type();
}

// Inicia o loop de digitação
startTypingLoop(titleElement, textToType);

// --- DESTAQUE DO LINK DO MENU COM INTERSECTION OBSERVER ---
const sections = document.querySelectorAll('main section[id]'); // Seleciona todas as seções com ID
const navLinks = document.querySelectorAll('.menu a'); // Seleciona todos os links do menu

// Configurações do Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

// Cria o Intersection Observer para observar as seções
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Se a seção está visível
            const sectionId = entry.target.id;
            navLinks.forEach(link => { // Remove a classe 'active' de todos os links
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.menu a[data-section="${sectionId}"]`);
            if (activeLink) { // Adiciona a classe 'active' ao link correspondente
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observa cada seção
sections.forEach(section => {
    sectionObserver.observe(section);
});


// --- INTERATIVIDADE ENTRE TEXTO E IMAGENS DA SEÇÃO "SOBRE MIM" ---

// Seleciona os elementos de texto e imagem
const keywordDados = document.querySelector('#keyword-dados');
const keywordMusculacao = document.querySelector('#keyword-musculacao');
const keywordBahia = document.querySelector('#keyword-bahia');

// Seleciona os elementos de imagem correspondentes
const imgDados = document.querySelector('#img-dados').parentElement;
const imgMusculacao = document.querySelector('#img-musculacao').parentElement;
const imgBahia = document.querySelector('#img-bahia').parentElement;

// Função para adicionar interatividade entre o texto e a imagem
function linkKeywordToImage(keyword, image) { // Seleciona o elemento de texto e a imagem correspondente
    keyword.addEventListener('mouseover', () => {
        image.classList.add('highlighted');
    });
    keyword.addEventListener('mouseout', () => { // Remove o destaque quando o mouse sai do texto
        image.classList.remove('highlighted');
    });
}

// Adiciona a interatividade para cada par de texto e imagem
linkKeywordToImage(keywordDados, imgDados);
linkKeywordToImage(keywordMusculacao, imgMusculacao);
linkKeywordToImage(keywordBahia, imgBahia);


// --- CURSOR PERSONALIZADO ---

const cursorDot = document.querySelector('.cursor-dot'); // Seleciona o elemento do cursor personalizado
const cursorOutline = document.querySelector('.cursor-outline'); // Seleciona o elemento do contorno do cursor

// Verifica se o cursor personalizado existe antes de adicionar os eventos
window.addEventListener('mousemove', function (e) { // Atualiza a posição do cursor personalizado
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ // Animação para o contorno do cursor
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" }); // Define a duração da animação e o preenchimento
});

// Adiciona eventos de mouseover e mouseout para links, aumentando o tamanho do cursor ao passar o mouse
const links = document.querySelectorAll('a');
links.forEach(link => { // Seleciona todos os links na página
    link.addEventListener('mouseover', () => { // Aumenta o tamanho do cursor ao passar o mouse sobre um link
        cursorOutline.classList.add('grow');
    });
    link.addEventListener('mouseout', () => { // Remove o aumento do tamanho do cursor ao sair do link
        cursorOutline.classList.remove('grow');
    });
});


// --- MENU MOBILE ---
// Seleciona o botão do menu mobile e o menu de navegação
const btnMobile = document.getElementById('btn-mobile');
const navMenu = document.querySelector('.menu');

// Função para alternar o menu mobile
function toggleMenu(event) { // Função para alternar a visibilidade do menu mobile
    if (event.type === 'touchstart') event.preventDefault();

    // Verifica se o evento é de toque e previne o comportamento padrão
    navMenu.classList.toggle('active');
    
    // Alterna a classe 'active' no menu de navegação
    const active = navMenu.classList.contains('active');
    
    // Atualiza os atributos ARIA do botão mobile
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) { // Se o menu está ativo, atualiza o atributo aria-label
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else { // Se o menu não está ativo, atualiza o atributo aria-label
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Adiciona os eventos de clique e toque ao botão mobile
btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);
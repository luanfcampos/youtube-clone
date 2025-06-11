document.addEventListener('DOMContentLoaded', function() {
    // 1. Trocar vídeo quando clicar nos recomendados
    const recommendedVideos = document.querySelectorAll('.recommended-video');
    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const viewsElement = document.querySelector('.views');
    
    recommendedVideos.forEach(video => {
        video.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const title = this.getAttribute('data-title');
            const views = this.getAttribute('data-views');
            
            // Atualiza o vídeo principal
            mainVideo.src = `https://www.youtube.com/embed/${videoId}`;
            
            // Atualiza o título e as visualizações
            videoTitle.textContent = title;
            viewsElement.textContent = views;
            
            // Scroll para o topo do player (útil em mobile)
            document.querySelector('.video-player').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // 2. Menu responsivo
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const sidebar = document.getElementById('sidebar');
    const desktopMenuButton = document.querySelector('.desktop-only.menu-icon');
    
    // Função para alternar o menu
    function toggleMenu() {
        sidebar.classList.toggle('visible');
    }
    
    // Evento para o botão mobile
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }
    
    // Evento para o botão desktop (em telas médias)
    if (desktopMenuButton) {
        desktopMenuButton.addEventListener('click', function() {
            if (window.innerWidth <= 1200) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }
    
    // Fechar menu quando clicar fora (para mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            event.target !== mobileMenuButton && 
            !mobileMenuButton.contains(event.target)) {
            sidebar.classList.remove('visible');
        }
    });
    
    // Verificar tamanho da tela ao carregar e redimensionar
    function handleResponsive() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('collapsed');
        } else if (window.innerWidth <= 1200) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('hidden');
            sidebar.classList.remove('collapsed');
        }
    }
    
    // Executar ao carregar e redimensionar
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});
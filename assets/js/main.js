document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    let sidebarOpen = window.innerWidth > 768;

    function addGlitchEffectToSections() {
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                if (Math.random() < 0.3) {
                    section.style.animation = 'glitchEffect 0.3s ease-in-out';
                    setTimeout(() => {
                        section.style.animation = '';
                    }, 300);
                }
            });
        });
    }

    function updateSidebarTogglePosition() {
        if (sidebarToggle) {
            const menuIcon = sidebarToggle.querySelector('.menu-icon');
            if (sidebarOpen && window.innerWidth > 768) {
                sidebarToggle.style.left = '296px';
                if (menuIcon) menuIcon.style.transform = 'rotate(0deg)';
            } else {
                sidebarToggle.style.left = '2rem';
                if (menuIcon) menuIcon.style.transform = 'rotate(180deg)';
            }
        }
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
        
        if (sidebarOpen) {
            sidebar.classList.remove('closed');
            mainContent.classList.remove('sidebar-closed');
            if (window.innerWidth <= 768) {
                sidebar.classList.add('open');
            }
        } else {
            sidebar.classList.add('closed');
            mainContent.classList.add('sidebar-closed');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        }
        
        updateSidebarTogglePosition();
        
        if (typeof updateSidebarState === 'function') {
            updateSidebarState(sidebarOpen);
        }
    }

    function updateActiveSection() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollTop >= sectionTop - 160 && scrollTop < sectionTop + sectionHeight - 160) {
                currentSection = sectionId;
            }
        });
        
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }

    function scrollToSection(targetSection) {
        const target = document.getElementById(targetSection);
        if (target) {
            const targetPosition = target.offsetTop - 80;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === targetSection) {
                    link.classList.add('active');
                }
            });
        }
        
        if (window.innerWidth <= 768 && sidebarOpen) {
            toggleSidebar();
        }
    }

    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebarOpen = false;
            sidebar.classList.add('closed');
            sidebar.classList.remove('open');
            mainContent.classList.add('sidebar-closed');
        } else {
            if (sidebarOpen) {
                sidebar.classList.remove('closed', 'open');
                mainContent.classList.remove('sidebar-closed');
            } else {
                sidebar.classList.add('closed');
                mainContent.classList.add('sidebar-closed');
            }
        }
        updateSidebarTogglePosition();
        
        if (typeof updateSidebarState === 'function') {
            updateSidebarState(sidebarOpen && window.innerWidth > 768);
        }
    }

    function addSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                scrollToSection(targetSection);
                
                if (history.pushState) {
                    history.pushState(null, null, window.location.pathname);
                }
            });
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggleMobile) {
        sidebarToggleMobile.addEventListener('click', toggleSidebar);
    }

    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', handleResize);

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebarOpen && 
            !sidebar.contains(e.target) && 
            sidebarToggle && 
            !sidebarToggle.contains(e.target) &&
            sidebarToggleMobile &&
            !sidebarToggleMobile.contains(e.target)) {
            toggleSidebar();
        }
    });

    addSmoothScrolling();
    handleResize();
    updateActiveSection();
    updateSidebarTogglePosition();
    addGlitchEffectToSections();
});
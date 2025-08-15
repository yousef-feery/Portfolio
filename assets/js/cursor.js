document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);

    function updateCursor(e) {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
    }

    function handleHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .nav-link, .social-link, .action-btn, .stat-item, .resume-btn, .sidebar-toggle');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    document.addEventListener('mousemove', updateCursor);
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    handleHoverEffects();

    const observer = new MutationObserver(() => {
        handleHoverEffects();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
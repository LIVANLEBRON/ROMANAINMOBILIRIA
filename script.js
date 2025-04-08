document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const contactForm = document.getElementById('contact-form');
    
    // Índice actual del carrusel
    let currentIndex = 0;
    let itemWidth;
    let itemsPerView;
    
    // Función para calcular el ancho de los elementos del carrusel
    function calculateCarouselDimensions() {
        const carouselWidth = carousel.offsetWidth;
        if (window.innerWidth >= 992) {
            itemsPerView = 3;
        } else if (window.innerWidth >= 768) {
            itemsPerView = 2;
        } else {
            itemsPerView = 1;
        }
        itemWidth = carouselWidth / itemsPerView;
        
        // Ajustar el ancho de los elementos del carrusel
        carouselItems.forEach(item => {
            item.style.minWidth = `${itemWidth}px`;
        });
        
        // Actualizar la posición del carrusel
        updateCarouselPosition();
    }
    
    // Función para actualizar la posición del carrusel
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        if (currentIndex < carouselItems.length - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarouselPosition();
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carouselItems.length - itemsPerView;
        }
        updateCarouselPosition();
    }
    
    // Evento para el botón siguiente
    nextBtn.addEventListener('click', nextSlide);
    
    // Evento para el botón anterior
    prevBtn.addEventListener('click', prevSlide);
    
    // Cambiar slide automáticamente cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Evento para el menú móvil
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Cambiar el estilo de la navegación al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Manejar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se puede agregar la lógica para enviar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simulación de envío
            setTimeout(() => {
                alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Animación de elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .about-content, .carousel-container, .trust-indicators, .contact-container, .map-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Evento de scroll para animaciones
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar dimensiones del carrusel
    calculateCarouselDimensions();
    
    // Recalcular dimensiones al cambiar el tamaño de la ventana
    window.addEventListener('resize', calculateCarouselDimensions);
    
    // Ejecutar animación inicial
    animateOnScroll();
});
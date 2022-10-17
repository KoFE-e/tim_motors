//get_language_page
const page_language = document.getElementsByTagName('html')[0].getAttribute('lang');

//animations

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `all ${timeout}ms`;
    setTimeout(() => {
      el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `all ${timeout}ms`;
    el.style.opacity = 0;
  
    setTimeout(() => {
      el.style.display = 'none';
    }, timeout);
};

//jquery scripts
$(document).ready(function(){
    // scroll_icon
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#up']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});

//mobile_menu

const hamburger = document.querySelector('.hamburger'),
        mobilemenu = document.querySelector('.menu-mobile'),
        overlay = document.querySelector('.overlay'),
        menulinks = document.querySelectorAll('.menu-mobile-link');

hamburger.addEventListener('click', () => {
    if(!mobilemenu.classList.contains('menu-mobile_active')) {
        mobilemenu.classList.add('menu-mobile_active');
        fadeIn(overlay, 600);
        hamburger.classList.add('expanded');
    }
    else {
        mobilemenu.classList.remove('menu-mobile_active');
        fadeOut(overlay, 600);
        hamburger.classList.remove('expanded');
    }
});

overlay.addEventListener('click', () => {
    if(!mobilemenu.classList.contains('menu-mobile_active')) {
        mobilemenu.classList.remove('menu-mobile_active');
        fadeOut(overlay, 600);
        hamburger.classList.remove('expanded');
    }
});

menulinks.forEach(item => {
    item.addEventListener('click', () => {
        mobilemenu.classList.remove('menu-mobile_active');
        fadeOut(overlay, 600);
        hamburger.classList.remove('expanded');
    });
});


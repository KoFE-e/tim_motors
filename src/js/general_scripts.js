//animations

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
      el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
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
    if(getComputedStyle(mobilemenu).display == 'none') {
        fadeIn(mobilemenu, 600);
        fadeIn(overlay, 600);
        hamburger.classList.add('expanded');
    }
    else {
        fadeOut(mobilemenu, 600);
        fadeOut(overlay, 600);
        hamburger.classList.remove('expanded');
    }
});

overlay.addEventListener('click', () => {
    fadeOut(mobilemenu, 600);
    fadeOut(overlay, 600);
    hamburger.classList.remove('expanded');
});

menulinks.forEach(item => {
    item.addEventListener('click', () => {
        fadeOut(mobilemenu, 600);
        fadeOut(overlay, 600);
        hamburger.classList.remove('expanded');
    });
});


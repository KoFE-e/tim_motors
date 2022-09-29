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

//dropdown_menu

const dropdowns = document.querySelectorAll('.promo__search__item');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.promo__search__category');
    const menu = dropdown.querySelector('.dropdown__list');
    const options = dropdown.querySelectorAll('.dropdown__item');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        if (getComputedStyle(menu).display == "none") {
            fadeIn(menu, 300);
        }
        else {
            fadeOut(menu, 300);
        };
    });

    document.addEventListener('click', event => {
        if (event.target != select) {
            fadeOut(menu, 300);
        };
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.innerHTML;
            fadeOut(menu, 300);
        });
    });
});

//questions_expand

const questions = document.querySelectorAll('.questions__item');

questions.forEach(question => {
    const answer = question.querySelector('.questions__answer');
    const vertical = question.querySelector('.vertical');
    const horizontal = question.querySelector('.horizontal');
    const title = question.querySelector('.questions__title');
    const questionMaxHeight = getComputedStyle(question).maxHeight;
    console.log(questionMaxHeight);

    title.addEventListener('click', () => {
        if (!answer.classList.contains('expanded')) {
            answer.classList.add('expanded');
            fadeIn(answer, 500);
            fadeOut(vertical, 500);
            horizontal.style.transform = "rotate(180deg)";
            question.style.maxHeight = "500px";
        }
        else {
            answer.classList.remove('expanded');
            fadeOut(answer, 500);
            fadeIn(vertical, 500);
            horizontal.style.transform = "rotate(-180deg)";
            question.style.maxHeight = questionMaxHeight;
        };
    });
});

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
    
    //slider

    $('.news__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        arrows: true,
        autoplay: true,
        swipe: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/right.png"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                swipe: true,
                arrows: false,
                dots: true
            }
        }]
    });
});
//dropdown_menu

const dropdowns = document.querySelectorAll('.promo__search__item');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.promo__search__select');
    const menu = dropdown.querySelector('.dropdown__list');
    const options = dropdown.querySelectorAll('.dropdown__item');
    const selected = dropdown.querySelector('.selected_dropdown');

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
    //slider_news

    $('.news__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        arrows: true,
        autoplay: false,
        swipe: false,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/home/slider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/home/slider/right.png"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                swipe: true,
            }
        }]
    });

    $('.deals__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        swipe: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipe: true,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000
                }
            }
        ]
    });
});

var searchParams = new URLSearchParams('?');

//search
const dropdownBrands = document.querySelectorAll('.dropdown__brand'),
      dropdownYears = document.querySelectorAll('.dropdown__year');

dropdownBrands.forEach(item => {
    item.addEventListener('click', () => {
        searchParams.delete('data-brand');
        if(!searchParams.has('data-brand')) {
            searchParams.append('data-brand', item.getAttribute('data-brand'));
        }
    });
});

dropdownYears.forEach(item => {
    item.addEventListener('click', () => {
        searchParams.delete('min-year');
        if(!searchParams.has('min-year')) {
            searchParams.append('min-year', parseInt(item.innerHTML));
        }
    });
});

const searchBtn = document.querySelector('.promo__search__btn');

if (page_language == 'ru') {
    searchBtn.addEventListener('click', () => {
        window.location.href = '/catalog.html' + '?' + searchParams;
    });
}
else {
    searchBtn.addEventListener('click', () => {
        window.location.href = '/catalog_en.html' + '?' + searchParams;
    });
}
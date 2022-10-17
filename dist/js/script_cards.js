const more_btns = document.querySelectorAll('.catalog__card-more');
const card_info = document.querySelectorAll('.catalog__card__info');
const close_btns = document.querySelectorAll('.catalog__card__info-close');
const card_img = document.querySelectorAll('.catalog__card-img');

more_btns.forEach((item, index) => {
    item.addEventListener('click', () => {
        fadeIn(card_info[index], 300);
        if (getComputedStyle(overlay).display == 'none')
            fadeIn(overlay, 300);
    });
});

card_img.forEach((item, index) => {
    item.addEventListener('click', () => {
        fadeIn(card_info[index], 300);
        if (getComputedStyle(overlay).display == 'none')
            fadeIn(overlay, 300);
    });
});

close_btns.forEach((item, index) => {
    item.addEventListener('click', () => {
        fadeOut(card_info[index], 300);
        if (getComputedStyle(overlay).display != 'none')
            fadeOut(overlay, 300);
    });
});

overlay.addEventListener('click', () => {
    card_info.forEach(item => {
        if (getComputedStyle(item).display != 'none') {
            fadeOut(item, 300);
            fadeOut(overlay, 300);
        };
    });
});

$(document).ready(function() {
    if(page_language == 'ru') {
        card_info.forEach(item => {
            $(item).magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Загрузка изображения #%curr%...',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.',
                }
            });
        });
    }
    else {
        card_info.forEach(item => {
            $(item).magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                }
            });
        });
    }
});
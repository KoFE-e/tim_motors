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


const dropdowns = document.querySelectorAll('.promo__search__dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.promo__search__category');
    const menu = dropdown.querySelector('.dropdown__list');
    const options = dropdown.querySelectorAll('.dropdown__item');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        if (menu.style.display == "none") {
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

const questions = document.querySelectorAll('.questions__item');

questions.forEach(question => {
    const answer = question.querySelector('.questions__answer');
    const vertical = question.querySelector('.vertical');
    const horizontal = question.querySelector('.horizontal');
    const title = question.querySelector('.questions__title');

    title.addEventListener('click', () => {
        if (!answer.classList.contains('expanded')) {
            answer.classList.add('expanded');
            fadeOut(vertical, 500);
            horizontal.style.transform = "rotate(180deg)";
            question.style.maxHeight = "500px";
        }
        else {
            answer.classList.remove('expanded');
            fadeIn(vertical, 500);
            horizontal.style.transform = "rotate(-180deg)";
            question.style.maxHeight = "125px";
        };
    });
});
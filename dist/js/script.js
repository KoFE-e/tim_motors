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
        menu.classList.add('active');
    });

    document.addEventListener('click', event => {
        if (event.target != select) {
            menu.classList.remove('active');
        };
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.innerHTML;
            menu.classList.remove('active');
        });
    });
});

const questions = document.querySelectorAll('.questions__item');

questions.forEach(question => {
    const answer = question.querySelector('.questions__answer');
    const icon = question.querySelector('.questions__icon');
    const vertical = question.querySelector('.vertical');
    const horizontal = question.querySelector('.horizontal');
    const title = question.querySelector('.questions__title');

    title.addEventListener('click', () => {
        if (!answer.classList.contains('expanded')) {
            answer.classList.add('expanded');
            icon.classList.add('questions__icon_expanded');
            fadeOut(vertical, 500);
        }
        else {
            answer.classList.remove('expanded');
            fadeIn(vertical, 500);
        };
    });
});
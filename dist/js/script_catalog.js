const allCars = document.querySelectorAll('.catalog__card');

//create_sliders

var costSlider = document.getElementById('cost-range');

noUiSlider.create(costSlider, {
    start: [0, 1000000],
    connect: true,
    step: 1,
    range: {
        'min': [0],
        'max': [1000000]
    }
});


const url = new URL(location.href);
var searchParams = new URLSearchParams(url.search);

var beginCategory = searchParams.get('data-category'),
      beginBrand = searchParams.get('data-brand'),
      beginYear = parseInt(searchParams.get('min-year'));

//create_arrays_for_filters

var costValues = [
    document.getElementById('cost-range-min'),
    document.getElementById('cost-range-max')
];

var costRange = [
    parseInt(costValues[0].innerHTML.slice(4).replace(/\s+/g, '')),
    parseInt(costValues[1].innerHTML.slice(4).replace(/\s+/g, ''))
];

var yearValues = [
    document.getElementById('year-range-min'),
    document.getElementById('year-range-max')
];

var yearRange = [
    parseInt(yearValues[0].innerHTML),
    parseInt(yearValues[1].innerHTML)
];

const allCategories = document.querySelectorAll('.catalog__categories-btn');
const allBrands = document.querySelectorAll('.catalog__models-item');
var selectedCategories = [];
var selectedBrands = [];

//search_values

if (!isNaN(beginYear)) {
    yearRange[0] = beginYear;
}

if (beginCategory !== null) {
    selectedCategories.push(beginCategory);
    allCategories.forEach(item => {
        if (item.getAttribute('data-category') == beginCategory) {
            item.classList.add('selected');
        }
    });
}

if (beginBrand !== null) {
    selectedBrands.push(beginBrand);
    allBrands.forEach(item => {
        if (item.getAttribute('data-brand') == beginBrand) {
            item.classList.add('selected');
        }
    });
}

filter(costRange, yearRange, selectedCategories, selectedBrands);

var yearSlider = document.getElementById('year-range');

noUiSlider.create(yearSlider, {
    start: [yearRange[0], 2023],
    connect: true,
    step: 1,
    range: {
        'min': [2005],
        'max': [2023]
    }
});

//filter

function filter(costRange, yearRange, selectedCategories, selectedBrands) {
    allCars.forEach(item => {
        let carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
        let carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
        let carBrand = item.getAttribute('data-brand');
        let carCategory = item.getAttribute('data-category');
        if (selectedBrands.length != 0 && selectedCategories.length != 0) {
            if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1] 
                && selectedCategories.includes(carCategory) && selectedBrands.includes(carBrand))) {
                fadeOut(item, 300);
            }
            else {
                if(getComputedStyle(item).display == 'none')
                    fadeIn(item, 300);
            }
        }
        else if (selectedBrands.length != 0) {
            if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1] 
                && selectedBrands.includes(carBrand))) {
                fadeOut(item, 300);
            }
            else {
                if(getComputedStyle(item).display == 'none')
                    fadeIn(item, 300);
            }
        }
        else if (selectedCategories.length != 0) {
            if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1] 
                && selectedCategories.includes(carCategory))) {
                fadeOut(item, 300);
            }
            else {
                if(getComputedStyle(item).display == 'none')
                    fadeIn(item, 300);
            }
        }
        else {
            if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
                fadeOut(item, 300);
            }
            else {
                if(getComputedStyle(item).display == 'none')
                    fadeIn(item, 300);
            }
        }
    });
};

//refresh_cost_range

costSlider.noUiSlider.on('update', function (values, handle) {
    if (handle == 0) {
        costValues[handle].innerHTML = 'От $' + parseInt(values[handle]).toLocaleString();
    }
    else {
        costValues[handle].innerHTML = 'До $' + parseInt(values[handle]).toLocaleString();
    }
});

//refresh_years_range

yearSlider.noUiSlider.on('update', function (values, handle) {
    if (handle == 0) {
        yearValues[handle].innerHTML = parseInt(values[handle]);
    }
    else {
        yearValues[handle].innerHTML = parseInt(values[handle]);
    }
});

//updating_sliders

costSlider.noUiSlider.on('set', function (values, handle) {
    costRange[handle] = parseInt(values[handle]);
    filter(costRange, yearRange, selectedCategories, selectedBrands);
});

yearSlider.noUiSlider.on('set', function (values, handle) {
    yearRange[handle] = parseInt(values[handle]);
    filter(costRange, yearRange, selectedCategories, selectedBrands);
});


//adding_selected_classes

allCategories.forEach(item => {
    item.addEventListener('click', () => {
        var category = item.getAttribute('data-category');
        if(!item.classList.contains('selected')) {
            item.classList.add('selected');
            if (!selectedCategories.includes(category)) {
                selectedCategories.push(category);
            }
            console.log(selectedCategories);
        }
        else {
            let index = selectedCategories.indexOf(category);
            if (index != -1) {
                selectedCategories.splice(index, 1);
            }
            console.log(selectedCategories);
            item.classList.remove('selected');
        }
        filter(costRange, yearRange, selectedCategories, selectedBrands);
    });
});

allBrands.forEach(item => {
    item.addEventListener('click', () => {
        var brand = item.getAttribute('data-brand');
        if(!item.classList.contains('selected')) {
            item.classList.add('selected');
            if (!selectedBrands.includes(brand)) {
                selectedBrands.push(brand);
            }
            console.log(selectedBrands);
        }
        else {
            let index = selectedBrands.indexOf(brand);
            if (index != -1) {
                selectedBrands.splice(index, 1);
            }
            console.log(selectedBrands);
            item.classList.remove('selected');
        }
        filter(costRange, yearRange, selectedCategories, selectedBrands);
    });
});

//dropdown_menu

const dropdowns = document.querySelectorAll('.promo__search__item');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.promo__search__select');
    const menu = dropdown.querySelector('.dropdown__list');
    const options = dropdown.querySelectorAll('.dropdown__item');

    select.addEventListener('click', () => {
        if (getComputedStyle(menu).display == "none") {
            fadeIn(menu, 300);
        }
        else {
            fadeOut(menu, 300);
        };
    });

    document.addEventListener('click', event => {
        if (event.target != select && event.target != menu && !Array.from(options).includes(event.target)) {
            fadeOut(menu, 300);
        };
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            filter(costRange, yearRange, selectedCategories, selectedBrands);
        });
    });
});






const url = new URL(location.href);
var searchParams = new URLSearchParams(url.search);

var   beginBrand = searchParams.get('data-brand'),
      beginYear = parseInt(searchParams.get('min-year'));

if (page_language == "ru") {
    window.history.pushState(null, null, '/catalog.html');
}
else {
    window.history.pushState(null, null, '/catalog_en.html');
}

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

var mobileCostSlider = document.getElementById('mobile-cost-range');

noUiSlider.create(mobileCostSlider, {
    start: [0, 1000000],
    connect: true,
    step: 1,
    range: {
        'min': [0],
        'max': [1000000]
    }
});

//create_arrays_for_filters

var costValues = [
    document.getElementById('cost-range-min'),
    document.getElementById('cost-range-max')
];

var costRange = [
    parseInt(costValues[0].innerHTML.slice(4).replace(/\s+/g, '')),
    parseInt(costValues[1].innerHTML.slice(4).replace(/\s+/g, ''))
];

if (page_language == "en") {
    costRange[0] = parseInt(costValues[0].innerHTML.slice(6).replace(/\s+/g, ''));
}

var mobileCostValues = [
    document.getElementById('mobile-cost-range-min'),
    document.getElementById('mobile-cost-range-max')
];

var mobileCostRange = [
    parseInt(costValues[0].innerHTML.slice(4).replace(/\s+/g, '')),
    parseInt(costValues[1].innerHTML.slice(4).replace(/\s+/g, ''))
];

if (page_language == "en") {
    mobileCostRange[0] = parseInt(mobileCostValues[0].innerHTML.slice(6).replace(/\s+/g, ''));
}

var yearValues = [
    document.getElementById('year-range-min'),
    document.getElementById('year-range-max')
];

var yearRange = [
    parseInt(yearValues[0].innerHTML),
    parseInt(yearValues[1].innerHTML)
];

var mobileYearValues = [
    document.getElementById('mobile-year-range-min'),
    document.getElementById('mobile-year-range-max')
];

var mobileYearRange = [
    parseInt(mobileYearValues[0].innerHTML),
    parseInt(mobileYearValues[1].innerHTML)
];

const allBrands = document.querySelectorAll('.catalog__models-item');
var selectedBrands = [];

//search_values

if (!isNaN(beginYear)) {
    yearRange[0] = beginYear;
    mobileYearRange[0] = beginYear;
}

if (beginBrand !== null) {
    selectedBrands.push(beginBrand);
    allBrands.forEach(item => {
        if (item.getAttribute('data-brand') == beginBrand) {
            item.classList.add('selected');
        }
    });
}

filter(costRange, yearRange, selectedBrands);

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

var mobileYearSlider = document.getElementById('mobile-year-range');

noUiSlider.create(mobileYearSlider, {
    start: [mobileYearRange[0], 2023],
    connect: true,
    step: 1,
    range: {
        'min': [2005],
        'max': [2023]
    }
});

//filter

function filter(costRange, yearRange, selectedBrands) {
    allCars.forEach(item => {
        let carCost;
        if(item.querySelector('.cost-rf') !== null) {
            carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
        }
        let carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
        let carBrand = item.getAttribute('data-brand');
        if (carCost !== undefined) {
            if (selectedBrands.length != 0) {
                if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1] 
                    && selectedBrands.includes(carBrand))) {
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
        }
        else {
            if (selectedBrands.length != 0) {
                if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && selectedBrands.includes(carBrand))) {
                    fadeOut(item, 300);
                }
                else {
                    if(getComputedStyle(item).display == 'none')
                        fadeIn(item, 300);
                }
            }
            else {
                if (!(carYear >= yearRange[0] && carYear <= yearRange[1])) {
                    fadeOut(item, 300);
                }
                else {
                    if(getComputedStyle(item).display == 'none')
                        fadeIn(item, 300);
                }
            }
        }
    });
};

//refresh_cost_range

costSlider.noUiSlider.on('update', function (values, handle) {
    if (page_language == "ru") {
        if (handle == 0) {
            costValues[handle].innerHTML = 'От $' + parseInt(values[handle]).toLocaleString();
        }
        else {
            costValues[handle].innerHTML = 'До $' + parseInt(values[handle]).toLocaleString();
        }
    }
    else {
        if (handle == 0) {
            costValues[handle].innerHTML = 'From $' + parseInt(values[handle]).toLocaleString();
        }
        else {
            costValues[handle].innerHTML = 'To $' + parseInt(values[handle]).toLocaleString();
        }
    }
});

mobileCostSlider.noUiSlider.on('update', function (values, handle) {
    if (page_language == "ru") {
        if (handle == 0) {
            mobileCostValues[handle].innerHTML = 'От $' + parseInt(values[handle]).toLocaleString();
        }
        else {
            mobileCostValues[handle].innerHTML = 'До $' + parseInt(values[handle]).toLocaleString();
        }
    }
    else {
        if (handle == 0) {
            mobileCostValues[handle].innerHTML = 'From $' + parseInt(values[handle]).toLocaleString();
        }
        else {
            mobileCostValues[handle].innerHTML = 'To $' + parseInt(values[handle]).toLocaleString();
        }
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

mobileYearSlider.noUiSlider.on('update', function (values, handle) {
    if (handle == 0) {
        mobileYearValues[handle].innerHTML = parseInt(values[handle]);
    }
    else {
        mobileYearValues[handle].innerHTML = parseInt(values[handle]);
    }
});

//updating_sliders

costSlider.noUiSlider.on('set', function (values, handle) {
    costRange[handle] = parseInt(values[handle]);
    filter(costRange, yearRange, selectedBrands);
});

mobileCostSlider.noUiSlider.on('set', function (values, handle) {
    mobileCostRange[handle] = parseInt(values[handle]);
    filter(mobileCostRange, mobileYearRange, selectedBrands);
});

yearSlider.noUiSlider.on('set', function (values, handle) {
    yearRange[handle] = parseInt(values[handle]);
    filter(costRange, yearRange, selectedBrands);
});

mobileYearSlider.noUiSlider.on('set', function (values, handle) {
    mobileYearRange[handle] = parseInt(values[handle]);
    filter(mobileCostRange, mobileYearRange, selectedBrands);
});

//getting_width_of_screen

const windowInnerWidth = document.documentElement.clientWidth;

//adding_selected_classes

allBrands.forEach(item => {
    item.addEventListener('click', () => {
        var brand = item.getAttribute('data-brand');
        if(!item.classList.contains('selected')) {
            item.classList.add('selected');
            if (!selectedBrands.includes(brand)) {
                selectedBrands.push(brand);
            }
        }
        else {
            let index = selectedBrands.indexOf(brand);
            if (index != -1) {
                selectedBrands.splice(index, 1);
            }
            item.classList.remove('selected');
        }
        if (windowInnerWidth >= 576) {
            filter(costRange, yearRange, selectedBrands);
        }
        else {
            filter(mobileCostRange, mobileYearRange, selectedBrands);
        } 
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
            if (windowInnerWidth >= 576) {
                filter(costRange, yearRange, selectedBrands);
            }
            else {
                filter(mobileCostRange, mobileYearRange, selectedBrands);
            } 
        });
    });
});


const params = document.querySelectorAll('.catalog__search__select'),
      lists = document.querySelectorAll('.catalog__search__list');

params.forEach((item, index) => {
    item.addEventListener('click', () => {
        lists.forEach(list => {
            list.classList.remove('catalog__search_selected');
        });
        lists[index].classList.add('catalog__search_selected');
    })
});








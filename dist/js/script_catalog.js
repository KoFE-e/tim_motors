const allCars = document.querySelectorAll('.catalog__card');
var carYear, carCost;

//cost_filter

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

//refresh_cost_range

costSlider.noUiSlider.on('update', function (values, handle) {
    if (handle == 0) {
        costValues[handle].innerHTML = 'От $' + parseInt(values[handle]).toLocaleString();
    }
    else {
        costValues[handle].innerHTML = 'До $' + parseInt(values[handle]).toLocaleString();
    }
});

//year_filter

var yearSlider = document.getElementById('year-range');

noUiSlider.create(yearSlider, {
    start: [2018, 2023],
    connect: true,
    step: 1,
    range: {
        'min': [2018],
        'max': [2023]
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

//filtering_mixitup

var mixer = mixitup('.catalog__list', {
    selectors: {
        target: '.catalog__card'
    },
    animation: {
        effectsIn: 'fade',
        effectsOut: 'fade',
        duration: 300
    },
    multifilter: {
        enable: true
    }
});

costSlider.noUiSlider.on('set', function (values, handle) {
    costRange[handle] = parseInt(values[handle]);
    allCars.forEach(item => {
        carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
        carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
        if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
            fadeOut(item, 300);
        }
        else {
            fadeIn(item, 300);
        }
    });
});

yearSlider.noUiSlider.on('set', function (values, handle) {
    yearRange[handle] = parseInt(values[handle]);
    allCars.forEach(item => {
        carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
        carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
        if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
            fadeOut(item, 300);
        }
        else {
            if(getComputedStyle(item).display == 'none'){
                fadeIn(item, 300);
            }
        }
    });
});
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

//create_arrays_for_range_sliders

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


const allCategories = document.querySelectorAll('.catalog__categories-btn');
const allBrands = document.querySelectorAll('.catalog__models-item');
var selectedCategories = [];
var selectedBrands = [];

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






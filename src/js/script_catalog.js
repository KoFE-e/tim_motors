const allCars = document.querySelectorAll('.catalog__card');
var carYear, carCost;
const beginUrl = new URL('http://localhost:3000/catalog.html');
var url = new URL('http://localhost:3000/catalog.html');
var params = new URLSearchParams(url.search);
const allCategories = document.querySelectorAll('.catalog__categories-btn');
const allBrands = document.querySelectorAll('.catalog__models-item');
var selectedCategories = [];
var selectedBrands = [];

//select_filters

allCategories.forEach(item => {
    item.addEventListener('click', () => {
        if(!item.classList.contains('selected')) {
            item.classList.add('selected');
        }
        else {
            item.classList.remove('selected');
        }
    });
});


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

//filter_function

// var filteredItems = [];

// var mixer = mixitup('.catalog__list', {
//     animation: {
//         effectsIn: 'fade',
//         effectsOut: 'fade',
//         duration: 300
//     },
//     callbacks: {
//         onMixStart: function(state) {
//             filteredItems = state.show;
            
//         },
//         onMixEnd: function(state) {
//             filteredItems = state.show;
//             filtercostandyear(filteredItems, yearRange, costRange);
//         }
//     },
//     multifilter: {
//         enable: true
//     }
// });

// function filtercostandyear(arr, params) {
//     arr.forEach(item => {
//         carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
//         carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
//         if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
//             fadeOut(item, 300);
//         }
//         else {
//             if(getComputedStyle(item).display == 'none')
//                 fadeIn(item, 300);
//         }
//     });
//     console.log(arr);
// };



//updating_filters

costSlider.noUiSlider.on('set', function (values, handle) {
    costRange[handle] = parseInt(values[handle]);
    if (handle == 0) {
        params.delete('min-cost');
        params.append('min-cost', costRange[handle]);
    }
    else {
        params.delete('max-cost');
        params.append('max-cost', costRange[handle]);
    }
    url = beginUrl + '?' + params;
    window.history.pushState("", "", url);
    // filteredItems = mixer.getState().show;
    // console.log(filteredItems);
    // filteredItems.forEach(item => {
    //     carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
    //     carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
    //     if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
    //         fadeOut(item, 300);
    //     }
    //     else {
    //         if(getComputedStyle(item).display == 'none')
    //             fadeIn(item, 300);
    //     }
    // });
});

yearSlider.noUiSlider.on('set', function (values, handle) {
    yearRange[handle] = parseInt(values[handle]);
    // filteredItems = mixer.getState().show;
    if (handle == 0) {
        params.delete('min-year');
        params.append('min-year', yearRange[handle]);
    }
    else {
        params.delete('max-year');
        params.append('max-year', yearRange[handle]);
    }
    url = beginUrl + '?' + params;
    window.history.pushState("", "", url);

    // filteredItems.forEach(item => {
    //     carCost = parseInt(item.querySelector('.cost-rf').innerHTML.replace(/\s+/g, ''));
    //     carYear = parseInt(item.querySelector('.catalog__card-year').innerHTML);
    //     if (!(carYear >= yearRange[0] && carYear <= yearRange[1] && carCost >= costRange[0] && carCost <= costRange[1])) {
    //         fadeOut(item, 300);
    //     }
    //     else {
    //         if(getComputedStyle(item).display == 'none')
    //             fadeIn(item, 300);
    //     }
    // });
});




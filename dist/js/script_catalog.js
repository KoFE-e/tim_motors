//cost_filter

var costSlider = document.getElementById('cost-range');

noUiSlider.create(costSlider, {
    start: [7200, 10000],
    connect: true,
    step: 1,
    range: {
        'min': [7200],
        'max': [10000]
    }
});

var costValues = [
    document.getElementById('cost-range-min'),
    document.getElementById('cost-range-max')
];

//refresh_cost_range

costSlider.noUiSlider.on('update', function (values, handle) {
    if (handle == 0) {
        costValues[handle].innerHTML = 'От $' + parseInt(values[handle]);
    }
    else {
        costValues[handle].innerHTML = 'До $' + parseInt(values[handle]);
    }
});

//year_filter

var yearSlider = document.getElementById('year-range');

noUiSlider.create(yearSlider, {
    start: 2018,
    connect: [true, false],
    step: 1,
    range: {
        'min': [2018],
        'max': [2023]
    }
});

//selected_year

var yearSelected = 2018;

yearSlider.noUiSlider.on('update', function (value) {
    yearSelected = parseInt(value);
});

//models__filter

const models = document.querySelectorAll('.catalog__models-item');

models.forEach(model => {
    model.addEventListener('click', () => {
        if(!model.classList.contains("catalog__models-item_selected")) {
            model.classList.add("catalog__models-item_selected");
            //console.log(model.dataset.model);
        }
        else {
            model.classList.remove("catalog__models-item_selected");
        }
    });
});
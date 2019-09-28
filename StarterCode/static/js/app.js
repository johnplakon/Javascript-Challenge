var shape = document.querySelector("#shape");
var state = document.querySelector("#state");
var t_body = document.querySelector("tbody");
var city = document.querySelector("#city");
var prev = document.querySelector("#prev");
var load = document.querySelector("#load");
var country = document.querySelector("#country");
var datetime = document.querySelector("#date_time");
var search = document.querySelector("#search");
var records = document.querySelector("#recordCounter");
var pages = document.querySelector("#pages");

var next = document.querySelector("#next");
load.addEventListener("click", handleReloadButtonClick);
search.addEventListener("click", handleSearchButtonClick);
prev.addEventListener("click", handlePrevButtonClick);
pages.addEventListener("change", handlePagesChange);
next.addEventListener("click", handleNextButtonClick);

var fdata = data;
var count = 0;
function handleNextButtonClick() {
    count++;
    rENDerTable();
}
function handlePrevButtonClick() {
    count--;
    rENDerTable();
}
function handlePagesChange() {
    rENDerTable();
}
function handleSearchButtonClick() {
    var fdate = datetime.value.trim();
    var fcity = city.value.trim().toLowerCase();
    var fstate = state.value.trim().toLowerCase();
    var fcountry = country.value.trim().toLowerCase();
    var fshape = shape.value.trim().toLowerCase();

    if (fcity != "") {
        fdata = fdata.filter(function (city) {
        var dataCity = city.city;
        return dataCity === fcity;
    });
    }

    if (fdate != "") {
        fdata = fdata.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === fdate;
    });

    }

    if (fcountry != "") {
        fdata = fdata.filter(function (country) {
            var dataCountry = country.country;
            return dataCountry === fcountry;
        });
    }

    if (fstate != "") {
        fdata = fdata.filter(function (state) {
            var dataState = state.state;
            return dataState === fstate;
        });
    }


    if (fshape != "") {
        fdata = fdata.filter(function (shape) {
            var dataShape = shape.shape;
            return dataShape === fshape;
        });
    }

    rENDerTable();
}
function handleReloadButtonClick() {
    count = 0;
    fdata = data;
    datetime.value = '';
    city.value = '';
    state.value = '';
    country.value = '';
    shape.value = '';

    rENDerTable();
}
function rENDerTable() {

    t_body.innerHTML = "";


    var pages = Number(document.getElementById("pages").value);


    var START = count * pages + 1;
    var END = START + pages - 1;
    var btn;

    if (START == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }


    if (END > fdata.length) {
      END = fdata.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }




    records.innerText = "From Record: " + START + " to: " + END + " of " + fdata.length;

    for (var i = 0; i < pages; i++) {
        var items = fdata[i+(count * pages)];
        var Field = Object.keys(items);
        var Row = t_body.insertRow(i);

        for (var j = 0; j < Field.length; j++) {
            var field = Field[j];
            var Cell = Row.insertCell(j);
            Cell.innerText = items[field];
        }
    }
}


rENDerTable();

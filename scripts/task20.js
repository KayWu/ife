$ = function (element) {
    return document.querySelector(element);
};

function init() {
    $('#insert').addEventListener('click', function () {
        insert();
    });

    $('#query').addEventListener('click', function () {
        query();
    });
}

function insert() {
    var input = $('textarea').value.trim();
    var array = input.split(/[ \n,，、]+/);
    elements = elements.concat(array);
    render(elements);
}

function query() {
    var input = $('input').value.trim();
    var re = new RegExp(input, 'g');
    var map_ele = elements.map(function (x) {
        return x.replace(re, '<span>' + input + '</span>');
    });
    render(map_ele);
}

var elements = [];

function render(arr) {
    var s = '';
    for (var i = 0; i < arr.length; i++) {
        s += '<div>' + arr[i] + '</div>'
    }
    $('#queue').innerHTML = s;
}


init();
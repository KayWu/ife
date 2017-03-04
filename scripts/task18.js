var numbers = [];

$ = function (element) {
    return document.querySelector(element);
};

function init() {
    $('#left-in').addEventListener('click', function () {
        var number = getNumber();
        if (!isNaN(number)) {
            leftIn(number);
        }
    });
    $('#right-in').addEventListener('click', function () {
        var number = getNumber();
        if (!isNaN(number)) {
            rightIn(number);
        }
    });
    $('#left-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            leftOut();

        }
    });
    $('#right-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            rightOut();
        }
    });
}

function leftIn(number) {
    numbers.unshift(number);
    var $queue = $('#queue');
    $queue.insertBefore(createNumberNode(number), $queue.firstChild);
}

function rightIn(number) {
    numbers.push(number);
    var $queue = $('#queue');
    $queue.appendChild(createNumberNode(number));
}

function leftOut() {
    alert('向左弹出: ' + numbers.shift());
    var $queue = $('#queue');
    $queue.removeChild($queue.firstElementChild);
}

function rightOut() {
    alert('向右弹出: ' + numbers.pop());
    var $queue = $('#queue');
    $queue.removeChild($queue.lastElementChild);
}


function createNumberNode(number) {
    var div = document.createElement('div');
    div.textContent = number;
    return div;
}


function getNumber() {
    return parseInt($('#number').value);
}

init();
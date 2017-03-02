var numbers = [];

function init() {
    document.getElementById('left-in').addEventListener('click', function () {
        var number = getNumber();
        if (!isNaN(number)) {
            numbers.unshift(number);
            render();
        }
    });
    document.getElementById('right-in').addEventListener('click', function () {
        var number = getNumber();
        if (!isNaN(number)) {
            numbers.push(number);
            render();
        }
    });
    document.getElementById('left-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            var number = numbers.shift();
            alert('向左弹出: ' + number);
            render();
        }
    });
    document.getElementById('right-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            var number = numbers.pop();
            alert('向右弹出: ' + number);
            render();
        }
    });
}

function getNumber() {
    return parseInt(document.getElementById('number').value);
}

function render() {
    var queue = document.getElementById('queue');
    var s = '';
    for (var i = 0; i < numbers.length; i++) {
        s += "<div>" + numbers[i] + "</div>";
    }
    queue.innerHTML = s;
}

init();
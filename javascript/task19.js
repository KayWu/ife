var numbers = [];

function init() {
    document.getElementById('left-in').addEventListener('click', function () {
        var number = getNumber();
        if (isValid(number) && checkLength()) {
            numbers.unshift(number);
            render();
        }
    });
    document.getElementById('right-in').addEventListener('click', function () {
        var number = getNumber();
        if (isValid(number) && checkLength()) {
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
    document.getElementById('sort').addEventListener('click', function () {
        sort();
    });
    document.getElementById('shuffle').addEventListener('click', function () {
        shuffle(numbers);
        render();
    });


}

function getNumber() {
    return parseInt(document.getElementById('number').value);
}

function isValid(number) {
    if (isNaN(number)) {
        alert('请输入数字');
        return false;
    }
    if (number >= 10 && number <= 100) {
        return true;
    } else {
        alert('输入数字必须在 10 和 100 之间');
        return false;
    }

}

function checkLength() {
    if (numbers.length < 60) {
        return true;
    } else {
        alert('队列中元素最多为 60 个。');
        return false;
    }
}

function render() {
    var queue = document.getElementById('queue');
    var s = '';
    for (var i = 0; i < numbers.length; i++) {
        s += "<div style='height: " + numbers[i] + "px;'></div>";
    }
    queue.innerHTML = s;
}

function sort() {
    if (numbers.length <= 1) return;
    for (var i = 0; i < numbers.length; i++) {
        for (var j = i + 1; j < numbers.length; j++) {
            if (numbers[i] > numbers[j]) {
                swap(numbers, i, j);
                render();
                setTimeout(sort, 100);
                return;
            }
        }
    }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        swap(array, i, j)
    }
    return array;
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

init();
var numbers = [];

$ = function (element) {
    return document.querySelector(element);
};
$$ = function (element) {
    return document.querySelectorAll(element);
};

function init() {
    $('#left-in').addEventListener('click', function () {
        var number = getNumber();
        if (isValid(number) && checkLength()) {
            numbers.unshift(number);
            render();
        }
    });
    $('#right-in').addEventListener('click', function () {
        var number = getNumber();
        if (isValid(number) && checkLength()) {
            numbers.push(number);
            render();
        }
    });
    $('#left-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            var number = numbers.shift();
            alert('向左弹出: ' + number);
            render();
        }
    });
    $('#right-out').addEventListener('click', function () {
        if (numbers.length > 0) {
            var number = numbers.pop();
            alert('向右弹出: ' + number);
            render();
        }
    });
    $('#sort').addEventListener('click', function () {
        sort();
    });
    $('#shuffle').addEventListener('click', function () {
        shuffle(numbers);
        render();
    });


}

function getNumber() {
    return parseInt($('#number').value);
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
    var queue = $('#queue');
    var s = '';
    for (var i = 0; i < numbers.length; i++) {
        s += "<div style='height: " + numbers[i] + "px;'></div>";
    }
    queue.innerHTML = s;
}

function initQueue() {
    // private instance variables
    var queue = [], self, timer;

    function schedule(fn, t) {
        timer = setTimeout(function () {
            timer = null;
            fn();
            if (queue.length) {
                var item = queue.shift();
                schedule(item.fn, item.t);
            }
        }, t);
    }

    self = {
        delay: function (fn, t) {
            // if already queuing things or running a timer,
            //   then just add to the queue
            if (queue.length || timer) {
                queue.push({fn: fn, t: t});
            } else {
                // no queue or timer yet, so schedule the timer
                schedule(fn, t);
            }
            return self;
        },
        cancel: function () {
            clearTimeout(timer);
            queue = [];
        }
    };
    return self;
}


function sort() {
    var queue = initQueue();
    if (numbers.length <= 1) return;
    for (var i = 0; i < numbers.length; i++) {
        for (var j = i + 1; j < numbers.length; j++) {
            if (numbers[i] > numbers[j]) {
                swap(numbers, i, j);
                queue.delay(wrapperStep(i, j), 100);
            }
        }
    }

    function step(i, j) {
        var elements = $$('#queue div');
        var temp = elements[i].style.height;
        elements[i].style.height = elements[j].style.height;
        elements[j].style.height = temp;
    }

    function wrapperStep(i, j) {
        return function () {
            step(i, j);
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
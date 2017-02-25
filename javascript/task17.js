/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var wrapper = document.getElementById('aqi-chart-wrap');
    var s = '';
    for (var key in chartData) {
        var title = key + ': ' + chartData[key];
        s += '<div title="{0}" style="height: {1}px;background-color: {2}"></div>'.format(title, chartData[key], randomColor());
    }
    wrapper.innerHTML = s;
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
    // 确定是否选项发生了变化
    if (pageState.nowGraTime !== value) {
        // 设置对应数据
        pageState.nowGraTime = value;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    if (pageState.nowSelectCity !== city) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementById('form-gra-time').addEventListener('change', function (event) {
        graTimeChange(event.target.value);
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById('city-select');
    var current_option;
    var s = '';
    for (var key in aqiSourceData) {
        if (current_option === undefined) {
            current_option = key;
        }
        s += '<option>' + key + '</option>';
    }
    pageState.nowSelectCity = current_option;
    select.innerHTML = s;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener('change', function (event) {
        var option = event.target.options[event.target.selectedIndex];
        citySelectChange(option.textContent);
    });

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    switch (pageState.nowGraTime) {
        case 'day':
            chartData = aqiSourceData[pageState.nowSelectCity];
            break;
        case 'week':
            chartData = weekAverage();
            break;
        case 'month':
            chartData = monthAverage();
            break;
    }
}

function weekAverage() {
    var data = aqiSourceData[pageState.nowSelectCity];
    var dateByWeek = {};
    var weekSum = 0;
    var dayCount = 0;
    var weekCount = 0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var date = new Date(key);
            var day = date.getDay();
            weekSum += data[key];
            dayCount += 1;
            if (day == 0) {
                weekCount++;
                var average = weekSum / dayCount;
                var title = '第' + weekCount + '周';
                dateByWeek[title] = average;
                weekSum = 0;
                dayCount = 0;
            }
        }
    }
    return dateByWeek;
}

function monthAverage() {
    var data = aqiSourceData[pageState.nowSelectCity];
    var monthSum = {};

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var date = new Date(key);
            var month = date.getMonth();
            if (monthSum[month] === undefined) {
                monthSum[month] = {sum: 0, count: 0}
            }
            monthSum[month].sum += data[key];
            monthSum[month].count += 1;
        }
    }
    var dataByMonth = {};
    for (var month in monthSum) {
        if (monthSum.hasOwnProperty(month)) {
            var average = monthSum[month].sum / monthSum[month].count;
            var monthPresent = parseInt(month) + 1;
            var title = monthPresent + '月';
            dataByMonth[title] = average;
        }
    }
    return dataByMonth;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();

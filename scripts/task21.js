$ = function (element) {
    return document.querySelector(element);
};
function LabelGroup(input, output, button) {
    this.$input = $(input);
    this.$output = $(output);
    this.$button = $(button);
    this.labels = [];
    this.init();
}

LabelGroup.prototype = {
    init: function () {
        var self = this;
        this.$output.addEventListener('mouseover', function (event) {
            if (event.target.nodeName.toLowerCase() == 'span') {
                event.target.textContent = '删除: ' + event.target.dataset.origin;
            }
        });
        this.$output.addEventListener('mouseout', function (event) {
            if (event.target.nodeName.toLowerCase() == 'span') {
                event.target.textContent = event.target.dataset.origin;
            }

        });
        this.$output.addEventListener('click', function (event) {
            if (event.target.nodeName.toLowerCase() == 'span') {
                self.removeLabel(event.target);
            }
        });
    },
    checkValid: function (text) {
        if (text == null || text.length == 0) return false;
        var trimText = text.trim();
        if (trimText.length == 0) return false;
        return true;
    },
    removeFirstLabel: function () {
        this.labels.shift();
        this.$output.removeChild(this.$output.firstElementChild);
    },
    addTag: function (text) {
        if (!this.checkValid(text)) return;
        var trimText = text.trim();
        this.$input.value = '';
        if (this.labels.indexOf(trimText) === -1) {
            this.labels.push(trimText);
            this.addTagLabel(trimText);
            while (this.labels.length > 10) this.removeFirstLabel();
        }
    },

    addTagLabel: function (text) {
        var ele = document.createElement('span');
        ele.textContent = text;
        ele.setAttribute('data-origin', text);
        this.$output.appendChild(ele);
    },
    removeLabel: function (ele) {
        var index = this.labels.indexOf(ele.dataset.origin);
        this.labels.splice(index, 1);
        this.$output.removeChild(ele);
    }

};


var tagLabel = new LabelGroup('#tag-input', '#tag-label');

tagLabel.initEvent = function () {
    var self = this;
    self.$input.addEventListener('keyup', function (event) {
        handleTagInput(event);
    });

    function handleTagInput(event) {
        var s = self.$input.value;
        if (event.keyCode == 13) {
            self.addTag(s);
        } else {
            var match = s.match(/(.+)[, ]$/);
            if (match !== null) self.addTag(match[1]);
        }
    }
};

tagLabel.initEvent();

var hobbyLabel = new LabelGroup('#hobby-input', '#hobby-label', '#confirm');
hobbyLabel.initEvent = function () {
    var self = this;
    self.$button.addEventListener('click', function (event) {
        var arr = self.$input.value.split(/[ \n,，、]+/);
        for (var i in arr) {
            self.addTag(arr[i]);
        }
    });
};
hobbyLabel.initEvent();
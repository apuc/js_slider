"use strict";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var slider = new Slider("mySlider");
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
    function Slider(selector) {
        _classCallCheck(this, Slider);

        this.sliderDom = document.getElementById(selector);
        this.initSlider();
    }

    _createClass(Slider, [{
        key: 'initSlider',
        value: function initSlider() {
            for (var i = 0; i < this.sliderDom.children.length; i++) {
                if (i != 0) {
                    if (!this.sliderDom.children[i].classList.contains('nav')) {
                        this.sliderDom.children[i].style.display = 'none';
                    }
                } else {
                    this.sliderDom.children[i].className += ' slideActive';
                }
                this.sliderDom.children[i].style.backgroundColor = this.sliderDom.children[i].getAttribute("data-color");
            }
            var item = document.createElement('div');
            this.sliderDom.appendChild(item);
            item.innerHTML = this.getNav();
            item.className += 'nav';

            var next = document.getElementById('next-slide');
            var prev = document.getElementById('prev-slide');

            next.addEventListener("click", this.nextSlide(this), false);
            prev.addEventListener("click", this.prevSlide(this), false);
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide(obj) {
            return function () {
                var active = document.getElementsByClassName('slideActive');
                for (var i = 0; i < obj.sliderDom.children.length; i++) {
                    if (!obj.sliderDom.children[i].classList.contains('nav')) {
                        if (obj.sliderDom.children[i].classList.contains('slideActive')) {
                            var next = obj.sliderDom.children[i + 1];
                            if (next.classList.contains('nav') || next === undefined) {
                                next = obj.sliderDom.children[0];
                            }
                        }
                    }
                }
                active[0].style.display = 'none';
                obj.removeCl(active[0], 'slideActive');
                next.className += ' slideActive';
                next.style.display = 'block';
            };
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide(obj) {
            return function () {
                var active = document.getElementsByClassName('slideActive');
                for (var i = 0; i < obj.sliderDom.children.length; i++) {
                    if (!obj.sliderDom.children[i].classList.contains('nav')) {
                        if (obj.sliderDom.children[i].classList.contains('slideActive')) {
                            var next = obj.sliderDom.children[i - 1];
                            if (next === undefined) {
                                next = obj.sliderDom.children[obj.sliderDom.children.length - 2];
                            }
                        }
                    }
                }
                active[0].style.display = 'none';
                obj.removeCl(active[0], 'slideActive');
                next.className += ' slideActive';
                next.style.display = 'block';
            };
        }
    }, {
        key: 'removeCl',
        value: function removeCl(obj, cls) {
            var classes = obj.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] == cls) {
                    classes.splice(i, 1); // удалить класс
                    i--; // (*)
                }
            }
            obj.className = classes.join(' ');
        }
    }, {
        key: 'getNav',
        value: function getNav() {
            return "<a href='#' id='prev-slide'>Назад</a> | <a href='#' id='next-slide'>Вперед</a>";
        }
    }]);

    return Slider;
}();
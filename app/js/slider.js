'use strict';

class Slider {
    constructor(selector) {
        this.sliderDom = document.getElementById(selector);
        this.initSlider();
    }

    initSlider() {
        for (var i = 0; i < this.sliderDom.children.length; i++) {
            if (i != 0) {
                if (!this.sliderDom.children[i].classList.contains('nav')) {
                    this.sliderDom.children[i].style.display = 'none';
                }
            }
            else {
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

    nextSlide(obj) {
        return function () {
            var active = document.getElementsByClassName('slideActive');
            for (var i = 0; i < obj.sliderDom.children.length; i++) {
                if (!obj.sliderDom.children[i].classList.contains('nav')) {
                    if (obj.sliderDom.children[i].classList.contains('slideActive')) {
                        var next = obj.sliderDom.children[i + 1];
                        if(next.classList.contains('nav') || next === undefined){
                            next = obj.sliderDom.children[0];
                        }
                    }
                }
            }
            active[0].style.display = 'none';
            obj.removeCl(active[0],'slideActive');
            next.className += ' slideActive';
            next.style.display = 'block';
        }
    }

    prevSlide(obj) {
        return function () {
            var active = document.getElementsByClassName('slideActive');
            for (var i = 0; i < obj.sliderDom.children.length; i++) {
                if (!obj.sliderDom.children[i].classList.contains('nav')) {
                    if (obj.sliderDom.children[i].classList.contains('slideActive')) {
                        var next = obj.sliderDom.children[i - 1];
                        if(next === undefined){
                            next = obj.sliderDom.children[obj.sliderDom.children.length - 2];
                        }
                    }
                }
            }
            active[0].style.display = 'none';
            obj.removeCl(active[0],'slideActive');
            next.className += ' slideActive';
            next.style.display = 'block';
        }
    }

    removeCl(obj, cls) {
        var classes = obj.className.split(' ');

        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == cls) {
                classes.splice(i, 1); // удалить класс
                i--; // (*)
            }
        }
        obj.className = classes.join(' ');

    }

    getNav() {
        return "<a href='#' id='prev-slide'>Назад</a> | <a href='#' id='next-slide'>Вперед</a>";
    }
}
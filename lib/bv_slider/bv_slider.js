function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

class bvslider {
    constructor(content) {
        this.content = content;
        this.content.classList.add("bv_content");

        this.slider = document.createElement("div");
        this.slider.classList.add("bv_slider");

        wrap(this.content, this.slider);

        Array.prototype.forEach.call(content.children, function (item) {
            var itemwrap = document.createElement("div");
            itemwrap.style.transform = "scale(0.85)";
            wrap(item, itemwrap);
            itemwrap.classList.add("bv_item");
        });
        
        this.currentSlide = 0;
        this.AddMoveButtons();
        this.changeSlideNumber(0);

        this.slider.addEventListener('touchstart', evt => this.touchXStart = evt.changedTouches[0].clientX);

        this.slider.addEventListener('touchend', evt => {
            var a = this.touchXStart;
            var b = evt.changedTouches[0].clientX;
            if (a == b)
                return;
            this.changeSlideNumber(this.currentSlide + (a < b ? -1 : 1))
        });
    }

    changeSlideNumber(newValue) {
        var items = this.content.children;
        if (newValue < 0 || newValue > items.length - 1)
            return;

        var lsd = this.leftBtn.style;
        var rsd = this.rightBtn.style;

        items[this.currentSlide].style.transform = "scale(0.85)";
        items[newValue].style.transform = "scale(1)";

        if (newValue == 0) {
            lsd.display = "none";
        } else if (newValue == items.length - 1) {
            rsd.display = "none";
        } else {
            lsd.display = rsd.display = "block";
        }
        this.currentSlide = newValue;
        this.MoveSlide();
    }

    AddMoveButtons() {
        this.rightBtn = document.createElement("div");
        this.rightBtn.classList.add("bv_right");

        this.leftBtn = document.createElement("div");
        this.leftBtn.classList.add("bv_left");

        this.slider.append(this.rightBtn);
        this.slider.prepend(this.leftBtn);

        this.rightBtn.addEventListener('click', () => this.changeSlideNumber(this.currentSlide + 1));
        this.leftBtn.addEventListener('click', () => this.changeSlideNumber(this.currentSlide - 1));
    }

    MoveSlide() {
        var step = this.content.children[0].offsetWidth / this.slider.offsetWidth * 100;
        this.content.style.transform = 'translateX(' + ((100 - step) / 2 - (step * this.currentSlide)) + '%)';
    }
}

new bvslider(document.getElementsByClassName("my_slider")[0]);

/*
Lightweight Swiper implementation
Usage example (add to your HTML):

<div class="swiper">
  <div class="swiper-track">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <!-- optional prev/next buttons (will be hooked automatically if present) -->
  <button class="swiper-prev">Prev</button>
  <button class="swiper-next">Next</button>
  <!-- optional pagination container -->
  <div class="swiper-pagination"></div>
</div>

Init:
<script>
  const swiper = new Swiper('.swiper', {
    perView: 1,
    loop: true,
    autoplay: 3000, // ms, or false
    speed: 300, // transition duration in ms
    pagination: true, // enable pagination
    arrows: true // if true will try to bind .swiper-prev/.swiper-next
  });
  swiper.init();
</script>

Notes:
- The implementation is deliberately small and dependency-free.
- Include this file after your DOM or call init after DOM ready.
*/

class Swiper {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) throw new Error('Swiper container not found');

    const defaults = {
      perView: 1,
      loop: false,
      autoplay: false,
      speed: 300,
      pagination: false,
      arrows: false,
      draggable: true,
      startIndex: 0
    };

    this.opts = Object.assign({}, defaults, options);
    this.track = this.container.querySelector('.swiper-track');
    this.slides = Array.from(this.track ? this.track.children : []);
    this.current = this.opts.startIndex || 0;
    this.timer = null;
    this.isAnimating = false;

    this._onResize = this._onResize.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this._touch = {startX:0, currentX:0, dragging:false};

    // optional elements
    this.prevBtn = this.container.querySelector('.swiper-prev');
    this.nextBtn = this.container.querySelector('.swiper-next');
    this.paginationEl = this.container.querySelector('.swiper-pagination');

    this._setupStyles();
  }

  _setupStyles(){
    if (!this.track) {
      // create a track and move slides inside if user provided direct slides
      const wrapper = document.createElement('div');
      wrapper.className = 'swiper-track';
      while (this.container.firstChild) {
        wrapper.appendChild(this.container.firstChild);
      }
      this.container.appendChild(wrapper);
      this.track = wrapper;
      this.slides = Array.from(this.track.children);
    }

    // ensure container styles
    this.container.style.overflow = 'hidden';
    this.track.style.display = 'flex';
    this.track.style.willChange = 'transform';
    this.track.style.transition = `transform ${this.opts.speed}ms ease`;

    this.slides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / this.opts.perView}%`;
      slide.style.boxSizing = 'border-box';
    });
  }

  init(){
    this._updateSizes();
    window.addEventListener('resize', this._onResize);

    if (this.opts.draggable) {
      this.track.addEventListener('pointerdown', this._onTouchStart);
      window.addEventListener('pointermove', this._onTouchMove);
      window.addEventListener('pointerup', this._onTouchEnd);
      this.track.addEventListener('pointercancel', this._onTouchEnd);
    }

    if (this.opts.arrows) this._bindArrows();
    if (this.opts.pagination) this._createPagination();

    this.goTo(this.current, {instant:true});
    if (this.opts.autoplay) this.startAutoplay();
  }

  _onResize(){
    this._updateSizes();
    this.goTo(this.current, {instant:true});
  }

  _updateSizes(){
    this.containerWidth = this.container.clientWidth;
    this.slideWidth = this.containerWidth / this.opts.perView;
    this.slides.forEach(slide => {
      slide.style.width = `${this.slideWidth}px`;
    });
  }

  _bindArrows(){
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    // if buttons absent, create them visually? we only bind if present.
  }

  _createPagination(){
    if (!this.paginationEl) {
      this.paginationEl = document.createElement('div');
      this.paginationEl.className = 'swiper-pagination';
      this.container.appendChild(this.paginationEl);
    }
    this.paginationEl.innerHTML = '';
    this._dots = [];
    for (let i = 0; i < this._maxIndex()+1; i++){
      const dot = document.createElement('button');
      dot.className = 'swiper-dot';
      dot.type = 'button';
      dot.addEventListener('click', () => this.goTo(i));
      this.paginationEl.appendChild(dot);
      this._dots.push(dot);
    }
    this._updatePagination();
  }

  _updatePagination(){
    if (!this._dots) return;
    this._dots.forEach((d,i) => d.classList.toggle('active', i === this.current));
  }

  _maxIndex(){
    return Math.max(0, Math.ceil(this.slides.length / this.opts.perView) - 1);
  }

  next(){
    if (this.isAnimating) return;
    let target = this.current + 1;
    if (target > this._maxIndex()) {
      if (this.opts.loop) target = 0; else target = this._maxIndex();
    }
    this.goTo(target);
  }

  prev(){
    if (this.isAnimating) return;
    let target = this.current - 1;
    if (target < 0){
      if (this.opts.loop) target = this._maxIndex(); else target = 0;
    }
    this.goTo(target);
  }

  goTo(index, {instant=false} = {}){
    const max = this._maxIndex();
    if (index < 0) index = 0;
    if (index > max) index = max;
    this.current = index;
    const offset = -(index * this.containerWidth);
    if (instant) {
      this.track.style.transition = 'none';
      this.track.style.transform = `translate3d(${offset}px,0,0)`;
      // force reflow then restore transition
      void this.track.offsetWidth;
      this.track.style.transition = `transform ${this.opts.speed}ms ease`;
    } else {
      this.isAnimating = true;
      this.track.style.transform = `translate3d(${offset}px,0,0)`;
      clearTimeout(this._animTimer);
      this._animTimer = setTimeout(()=>{ this.isAnimating = false; }, this.opts.speed + 20);
    }
    this._updatePagination();
  }

  startAutoplay(){
    if (!this.opts.autoplay) return;
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.opts.autoplay);
  }

  stopAutoplay(){
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  _onTouchStart(e){
    if (e.pointerType === 'mouse' && e.button !== 0) return; // left button only
    this._touch.startX = e.clientX;
    this._touch.currentX = e.clientX;
    this._touch.dragging = true;
    this.track.style.transition = 'none';
    if (this.opts.autoplay) this.stopAutoplay();
    this.track.setPointerCapture && this.track.setPointerCapture(e.pointerId);
  }

  _onTouchMove(e){
    if (!this._touch.dragging) return;
    this._touch.currentX = e.clientX;
    const dx = this._touch.currentX - this._touch.startX;
    const base = -(this.current * this.containerWidth);
    this.track.style.transform = `translate3d(${base + dx}px,0,0)`;
  }

  _onTouchEnd(e){
    if (!this._touch.dragging) return;
    this._touch.dragging = false;
    const dx = this._touch.currentX - this._touch.startX;
    this.track.style.transition = `transform ${this.opts.speed}ms ease`;
    if (Math.abs(dx) > this.containerWidth * 0.2) {
      if (dx < 0) this.next(); else this.prev();
    } else {
      this.goTo(this.current);
    }
    if (this.opts.autoplay) this.startAutoplay();
  }

  destroy(){
    window.removeEventListener('resize', this._onResize);
    if (this.opts.draggable) {
      this.track.removeEventListener('pointerdown', this._onTouchStart);
      window.removeEventListener('pointermove', this._onTouchMove);
      window.removeEventListener('pointerup', this._onTouchEnd);
      this.track.removeEventListener('pointercancel', this._onTouchEnd);
    }
    this.stopAutoplay();
    // remove created pagination if we created it
    if (this._dots && this.paginationEl && this.paginationEl.parentNode === this.container) {
      this.paginationEl.innerHTML = '';
    }
  }
}

// Export for common environments
if (typeof module !== 'undefined' && module.exports) module.exports = Swiper;
if (typeof window !== 'undefined') window.Swiper = Swiper;

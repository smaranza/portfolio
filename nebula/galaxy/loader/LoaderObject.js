import gsap from "@gsap";

export default class Loader {
  constructor(duration, complete) {
    this.$el = $('.animation-loader');
    this.$title = this.$el.find('.loader__title');
    this.$logo = this.$el.find('.loader__logo');
    this.$progress = this.$el.find('.loader__progress');

    this.duration = duration;
    this.complete = complete;

    this.timeline = gsap.timeline({
      defaults: {
          ease: 'power4',
          duration: this.duration,
      }, 
      paused: true
    })
    .addLabel('load')
    .from( [this.$title, this.$logo], {
      yPercent: '100',
      letterSpacing: '2px',
      opacity: 0
    }, 'load')
    .to( this.$progress, {
      width: '100%'
    }, 'load')
    .to( this.$el, {
      opacity: 0,
      display: 'none',
      duration: 1
    })
  }

  load() {
    this.timeline.eventCallback("onComplete", this.complete);
    this.timeline.play();
  }
}

function Scroller(options) {
  this.svg = options.el;
  //Animation will end when the end is at which point of othe page. .9 is at about 90% down the page/
  // .1 is 10% from the top of the page. Default is middle of the page.
  this.animationBounds = {};
  this.animationBounds.top = options.startPoint || .5;
  this.animationBounds.bottom = options.endPoint || .5;
  this.animationBounds.containerBounds = this.svg.getBoundingClientRect();
  this.start = this.getPagePosition('top');
  this.end = this.getPagePosition('bottom');
  this.svgLength = this.svg.getTotalLength();
  this.svg.style.strokeDasharray = this.svgLength;
  this.animateLine();
  window.addEventListener('scroll', this.animateLine.bind(this));
}

Scroller.prototype.getPagePosition = function (position) {
  //These positions are all relative to the current window. So they top of the page will be negative and thus need to be
  //subtracted to get a positive number
  var distanceFromPageTop = document.body.getBoundingClientRect().top;
  var divPosition = this.animationBounds.containerBounds[position];
  var startPointInCurrentWindow = window.innerHeight * this.animationBounds[position];
  return divPosition - distanceFromPageTop - startPointInCurrentWindow;
};

Scroller.prototype.animateLine = function () {
  this.currentVisiblePosition = window.pageYOffset;
  if (this.currentVisiblePosition < this.start) {
    this.svg.style.strokeDashoffset = this.svgLength;
  }

  if (this.currentVisiblePosition > this.end) {
    this.svg.style.strokeDashoffset = '0px';
  }

  if (this.currentVisiblePosition > this.start && this.currentVisiblePosition < this.end) {
    this.svg.style.strokeDashoffset = this.distanceRemaining() * this.pixelsPerVerticalScroll() + 'px';
  }
};

Scroller.prototype.distanceRemaining = function () {
  return this.end - this.currentVisiblePosition;
};

Scroller.prototype.pixelsPerVerticalScroll = function () {
  this.verticalDistance = this.end - this.start;
  return this.svgLength / this.verticalDistance;
};


# scroller
This is a very short script to create a self drawing line.

Basic usage: 
- Create an SVG with a path (other elements will not work e.g. polyline)
- Give the element an id.
- Add the following javascript.
``` javascript
new Scroller({
  'el': document.getElementById(svgID),
  'startPoint': .5,
  'endPoint': .5
}))
```

This will create an element where the scrolling starts when the top of the line
is in the middle of the page and will finish when the middle of the line is in
the middle of the page.

Check out my
[blogpost](http://www.thejoemorgan.com/blog/2015/09/03/creating-scrolling-self-drawing-lines/) for more:

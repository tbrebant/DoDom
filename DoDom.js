// Simple minimalist class to manipulate DOM objects

class DoDom {
  constructor (type, options) {
    options = options || {};
    if (isDomElement(type)) {
      this.dom = type;
    } else {
      type = type || 'div';
      this.dom = document.createElement(type);
    }
    this.name = options.name || null;
    this.children = [];
    this.parent = null;
    if (options.classes) { this.addClasses(options.classes); }
    if (options.class) { this.addClass(options.class); }
    if (options.styles) { this.setStyles(options.styles); }
    if (options.onClick) { this.onClick(options.onClick); }
    if (options.attachToBody) { document.body.appendChild(this.dom); }
    if (options.parent) { options.parent.appendChild(this); }
    if (options.text !== undefined) { this.setText(options.text); }
    if (options.html) { this.setHTML(options.html); }
    if (options.visible !== undefined && !options.visible) { this.hide(); }
    if (options.children) {
      options.children.forEach((dodom) => { this.appendChild(dodom); });
    }
    this.isDoDom = true;
    this.destroyed = false;
  }
  
  setStyles (styles) {
    for (var key in styles) {
      this.dom.style[key] = styles[key];
    }
  }
  
  setStyle (key, value) {
    this.dom.style[key] = value;
  }

  addClasses (classes) {
    for (var i = 0; i < classes.length; i++) {
      this.addClass(classes[i]);
    }
  }
  
  addClass (c) {
    this.dom.classList.add(c);
  }
  
  removeClass (c) {
    this.dom.classList.remove(c);
  }
  
  removeClasses (t) {
    for (let c of t) {
      this.removeClass(c);
    }
  }

  appendChild (doDomChild) {
    this.children.push(doDomChild);
    doDomChild.parent = this;
    this.dom.appendChild(doDomChild.dom);
    return doDomChild;
  }
  
  prependChild (doDomChild) {
    this.children.push(doDomChild);
    doDomChild.parent = this;
    this.dom.prepend(doDomChild.dom);
    return doDomChild;
  }

  setText (str) {
    this.destroyChildren();
    this.dom.innerText = str;
  }
  
  addText (str) {
    this.dom.innerText = this.dom.innerText + str;
  }
  
  addTextUp (str) {
    this.dom.innerText = str + this.dom.innerText;
  }
  
  setHTML (str) {
    this.destroyChildren();
    this.dom.innerHTML = str;
  }

  onClick (method) {
    if (isTouchDevice()) {
      this.dom.addEventListener('touchend', (event) => {
        if (DoDom.isMoving) { return; }
        method(event);
      }, false);
    } else {
      this.dom.addEventListener('click', method, false);
    }
  }
  
  removeFromParent () {
    if (this.parent) {
      let index = this.parent.children.indexOf(this);
      if (index > -1) {
        this.parent.children.splice(index, 1);
      }
    }
    this.dom.parentNode.removeChild(this.dom);
  }

  destroy () {
    this.removeFromParent();
    this.dom = null;
    this.destroyChildren();
    this.destroyed = true;
  }
  
  destroyChildren () {
    let toDelete = [];
    for (let i = 0; i < this.children.length; i++) {
      toDelete.push(this.children[i]);
    }
    for (let i = 0; i < toDelete.length; i++) {
      toDelete[i].destroy();
    }
    toDelete = null;
  }

  getChild (name) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name === name) {
        return this.children[i];
      }
    }
  }
  
  show () {
    this.dom.style.display = '';
  }
  
  hide () {
    this.dom.style.display = 'none';
  }

  setVisibility (shouldShow) {
    if (shouldShow) {
      this.show();
    } else {
      this.hide();
    }
  }

  reflow () {
    return this.dom.offsetHeight;
  }

  addDomText (text, options = {}) {
    if (options.parent) {
      console.warn('Cannot use `parent` parameter when using `addDomText`');
      delete options.parent;
    }
    options.text = text;
    return this.addDoDom('span', options);
  }
  
  addDomHtml (text, options = {}) {
    if (options.parent) {
      console.warn('Cannot use `parent` parameter when using `addDomHtml`');
      delete options.parent;
    }
    options.html = text;
    return this.addDoDom('div', options);
  }

  addDoDom (type, options) {
    if (options.parent) {
      console.warn('Cannot use `parent` parameter when using `addDoDom`');
      delete options.parent;
    }
    return this.appendChild(new DoDom(type, options));
  }

  attachToBody () {
    document.body.appendChild(this.dom);
  }
}

// from https://stackoverflow.com/a/53520657
function isTouchDevice () {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function (query) {
    return window.matchMedia(query).matches;
  };
  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
    return true;
  }
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

function isDomElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;  
}

DoDom.isMoving = false;
if (isTouchDevice()) {
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) { DoDom.isMoving = false; }
  });
  document.addEventListener('touchmove', () => {
    DoDom.isMoving = true;
  });
  document.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) { DoDom.isMoving = false; }
  });
  document.addEventListener('touchcancel', (e) => {
    if (e.touches.length === 0) { DoDom.isMoving = false; }
  });
}

module.exports = DoDom;

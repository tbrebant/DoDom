# DoDom [![npm](https://img.shields.io/npm/v/dodom)](https://www.npmjs.com/package/dodom) [![downloads](https://img.shields.io/npm/dm/dodom)](https://www.npmjs.com/package/dodom)

A simple minimalist class to manipulate DOM objects

```js
import DoDom from 'dodom';

let view = new DoDom('div', {
  class: 'view',
  attachToBody: true
});

let helloWorld = view.addDoDom('div', {
  text: 'Hello World!',
  styles: { fontStyle: 'italic', color: '#7777FF' }
});

view.addDoDom('div', {
  classes: ['button', 'pink'],
  text: 'Click me',
  onClick: () => {
    helloWorld.addText(' Bigger!');
  }
});
```

## Installation

Using npm:
```
npm install dodom
```
Or download the [DoDom.js](DoDom.js) file and place it somewhere in your project.

## Usage

Using webpack:
```js
import DoDom from 'dodom';
// or
const DoDom = require('dodom');
```

Using HTML's script tag:
```html
<script src="path/DoDom.js"></script>
```
Modern browser ESM import is not supported out of the box, to keep the repo simple. If you want to use this way, download the [DoDom.js](DoDom.js) file, open it, comment out the `module.exports = DoDom;` line and uncomment `export default DoDom;`. Then:
```html
<script type="module">
  import DoDom from 'path/DoDom.js';
</script>
```

## API

### Constructor
```js
new DoDom(type, options)
```
- **type**: The type of DOM element to create (e.g., `'div'`, `'input'`) or an existing DOM element to wrap.
- **options**: An object with the following optional properties:
  - `class`: A single CSS class to add.
  - `classes`: An array of CSS classes to add.
  - `styles`: An object of CSS styles to apply.
  - `onClick`: A function to execute on click/touch.
  - `attachToBody`: If `true`, appends the element to the document body.
  - `parent`: A parent DoDom instance to append this element to.
  - `text`: Text content for the element.
  - `html`: HTML content for the element.
  - `visible`: If `false`, hides the element.
  - `name`: A name for the DoDom instance.
  - `children`: An array of child DoDom instances to append.

### Methods & Properties

#### Properties
- `dom`: To access the original DOM element.
- `children`: Array containing all DoDom children instances.
- `parent`: DoDom parent (if any).
- `isDoDom`: flag containing `true`.
- `name`: the optional *name* value that was passed with the contructor.

#### Styling
- `setStyles(styles)`: Sets multiple CSS styles.
- `setStyle(key, value)`: Sets a single CSS style.
- `addClass(c)`: Adds a CSS class.
- `addClasses(classes)`: Adds multiple CSS classes.
- `removeClass(c)`: Removes a CSS class.
- `removeClasses(classes)`: Removes multiple CSS classes.

#### Content
- `setText(str)`: Sets the text content, removing all children.
- `addText(str)`: Appends text to the existing content.
- `addTextUp(str)`: Prepends text to the existing content.
- `setHTML(str)`: Sets the HTML content, removing all children.

#### Events
- `onClick(method)`: Adds a click event listener.

#### Adding children
- `addDoDom(type, options)`: Adds a child DoDom instance of the specified type.
- `addDomText(text, options)`: Adds a child DoDom instance with text content.
- `addDomHtml(html, options)`: Adds a child DoDom instance with HTML content.
- `addDomTexts(elements, options)`: Adds multiple inline text elements wrapped in a child DoDom instance. 

#### DOM Manipulation
- `appendChild(doDomChild)`: Appends a child DoDom instance.
- `prependChild(doDomChild)`: Prepends a child DoDom instance.
- `removeFromParent()`: Removes the element from its parent.
- `attachToBody()`: Appends the element to the document body.

#### Visibility
- `show()`: Makes the element visible.
- `hide()`: Hides the element.
- `setVisibility(shouldShow)`: Shows or hides the element based on the boolean value.

#### Utility
- `destroy()`: Removes the element and its children from the DOM and marks it as destroyed.
- `destroyChildren()`: Removes all child elements.
- `getChild(name)`: Retrieves a child DoDom instance by its name.
- `reflow()`: Forces a reflow.

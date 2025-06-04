# 3.0.0
- `onClick` now uses `pointerup` event (removed deprecated ways to detect mouse/touch devices)

# 2.1.0
- Added `setStyle()`
- Added `reflow()`

# 2.0.0
- Changed export format for npm package compatibility (breaking change)
- Published npm package
- Better `onClick` handling on mobile

# 1.2.0
- Added a flag `isDoDom` to determine if object is a DoDom instance
- Added a flag `destroyed` to determine if DoDom object has been destroyed
- Added a method `removeClasses()` to remove multiple CSS classes in one go
- Added a method `attachToBody()` to add a DoDom to document body
- Fixed a couple of corner case bugs

# 1.1.4
- Added a warning when using `parent` parameter with an `addDoDom` like method

# 1.1.3
- Added a way to init a DoDom with an existing DOM element

# 1.1.2
- Added `removeFromParent()`

# 1.1.1
- Added `prependChild()`

# 1.1.0
- `addDomText` is now using a span instead of a div

# 1.0.6
- Fixed critical bug in `destroyChildren`

# 1.0.5
- Added shortcuts: `addDomText()`, `addDomHtml()`, `addDoDom()`

# 1.0.4
- Added `destroyChildren` method

# 1.0.3
- Added `children` constructor option

# 1.0.2
- Added method `setVisibility`

# 1.0.1
- Fixed display `inherit` overwriting initial value when calling `.show()`
- Added `class` option in constructor

# 1.0.0
- Initial release

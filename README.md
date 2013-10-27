angular-multi-progressbar
=========================

Display multiple progress bars on screen. Built on bootstrap v3 progress bar CSS components.

Include a script and css, e.g.
```html
<script src="../multiProgress.js"></script>
<link rel="stylesheet" href="bootstrap-progress-bar.css" />
<link rel="stylesheet" href="multiProgress.css" />
```

(note if you are already using bootstrap v3 then the is no need to include 'bootstrap-progress-bar.css')

Inject 'multi-progress-bar' into your angular app e.g.

```javascript
angular.module('myModule', [ 'multi-progress-bar' ]);
```

Include a place to display the muti progress bars e.g.

```html
<div position="bottom" class="multi-progress"></div>
```

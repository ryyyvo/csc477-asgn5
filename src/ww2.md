---
title: WWII Casualties
toc: false
---

```js
import {renderWW2} from "./components/ww2Casualties.js";

const file = await FileAttachment("data/ww2-casualties.json").json();
display(renderWW2(file.countries));
```

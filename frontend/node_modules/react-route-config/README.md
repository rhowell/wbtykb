# Installation

`npm install react-router react-route-config`

## For react-router v2 and v3 

[documentation for react-route-config v1](https://github.com/ndufreche/react-route-config/tree/1.0.x)

# Usage

react-route-config help you to declare route into react-router and give you an helper to retrieve route pathname

[react-router DOC](https://reacttraining.com/react-router/)

## Declare route

To declare your route you need to use the defineRoute function.

`defineRoute(route-name, pathname)(component) => return { component, path }`

> in page.jsx
```js
import React from 'react'
import { defineRoute } from 'react-route-config'

const Page = () => (<div>My page</div>)

export default defineRoute('my-page', '/path/to/my/page')(Page)
```

> in pages/sub-page.jsx
```js
import React from 'react'
import { defineRoute } from 'react-route-config'

const SubPage = () => (<div>My Sub page</div>)

export default defineRoute('my-sub-page', '/path/to/my/page/sub')(SubPage)
```

## Route configuration 

### Automatically

Following on the [react-router documentation example](https://reacttraining.com/react-router/web/example/route-config)

exportRoutes return an array of routes. In our example the return value is equals to:

```json
[
  {
    "path": "/path/to/my/page",
    "component": "Page",
    "routes": [
      {
        "path": "/path/to/my/page/sub",
        "component": "SubPage",
      }
    ]
  }
]
```

> in index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import { exportRoutes } from 'react-route-config'

import './page'
import './sub-page'

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    <route.component {...props} routes={route.routes}/>
  )}/>
)

render(
  <Router>
    <div>
      {exportRoutes().map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>,
  document.getElementById('root')
)
```


### Manually

To do it, just use the returned value by defineRoute function

> in index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'

import Page from './page'
import SubPage from './sub-page'


render(
  <Router>
    <div>
      <Route exact {...Page} />
      <Route {...SubPage}/>
    </div>
  </Router>,
  document.getElementById('root')
)
```

## Use into Link component

react-route-config expose a default function to retrieve your pages url

```js
import React from 'react'
import { Link } from 'react-router'
import routeFor from 'react-route-config'

const MyLink = () => (
  <ul>
    <li><Link to={routeFor('my-page')}>My page</Link></li>
    <li><Link to={routeFor('my-sub-page')}>My sub page</Link></li>
  </ul>
)

export default MyLink
```
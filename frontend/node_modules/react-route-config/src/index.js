const config = {};
let routing = [];

const buildRoutingTree =  (route, component, routes) => {
  if (routes === undefined) {
    return [
      {
        component,
        path: route,
      }
    ]
  }

  const parent = routes.findIndex(el => route.includes(el.path))
  const child = routes.findIndex(el => el.path.includes(route))
  
  if (parent !== -1) {
    routes[parent].routes = buildRoutingTree(route, component, routes[parent].routes)

    return routes

  } else if ( child !== -1) {
    const routeChild = routes[child]
    routes.splice(child, 1)

    return [
      ...routes,
      {
        component,
        path: route,
        routes: [routeChild]
      }
    ]
  }

  return [
    ...routes,
    {
      component,
      path: route,
    }
  ]
}

const buildRouting = (route, component, routes) => {
  if (-1 !== routes.findIndex(el => route.includes(el.path) || el.path.includes(route))) {
    return buildRoutingTree(route, component, routes)
  }

  return [
    ...routes,
    {
      component,
      path: route,
    }
  ]
}

export default key => config[key] || null

export const defineRoute = (name, route) => component => {
  config[name] = route;

  routing = buildRouting(route, component, routing)

  return {
    path: route,
    component,
  }
}


export const exportRoutes =  () => routing

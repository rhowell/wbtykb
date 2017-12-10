"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var config = {};
var routing = [];

var buildRoutingTree = function buildRoutingTree(route, component, routes) {
  if (routes === undefined) {
    return [{
      component: component,
      path: route
    }];
  }

  var parent = routes.findIndex(function (el) {
    return route.includes(el.path);
  });
  var child = routes.findIndex(function (el) {
    return el.path.includes(route);
  });

  if (parent !== -1) {
    routes[parent].routes = buildRoutingTree(route, component, routes[parent].routes);

    return routes;
  } else if (child !== -1) {
    var routeChild = routes[child];
    routes.splice(child, 1);

    return [].concat(_toConsumableArray(routes), [{
      component: component,
      path: route,
      routes: [routeChild]
    }]);
  }

  return [].concat(_toConsumableArray(routes), [{
    component: component,
    path: route
  }]);
};

var buildRouting = function buildRouting(route, component, routes) {
  if (-1 !== routes.findIndex(function (el) {
    return route.includes(el.path) || el.path.includes(route);
  })) {
    return buildRoutingTree(route, component, routes);
  }

  return [].concat(_toConsumableArray(routes), [{
    component: component,
    path: route
  }]);
};

exports.default = function (key) {
  return config[key] || null;
};

var defineRoute = exports.defineRoute = function defineRoute(name, route) {
  return function (component) {
    config[name] = route;

    routing = buildRouting(route, component, routing);

    return {
      path: route,
      component: component
    };
  };
};

var exportRoutes = exports.exportRoutes = function exportRoutes() {
  return routing;
};

import routeFor, { defineRoute, exportRoutes } from './src/index'

const Sandwiches = { name: 'sandwiches' }

const routes = [
  { path: '/sandwiches',
    component: Sandwiches,
    routes: [
      { path: '/sandwiches/cart',
        component: {}
      }
    ]
  },
  { path: '/tacos',
    component: {},
    routes: [
      { path: '/tacos/bus',
        component: {},
        routes: [
          { path: '/tacos/bus/stop',
            component: {}
          }
        ]
      },
      { path: '/tacos/cart',
        component: {}
      }
    ]
  }
]

var Page = defineRoute('sandwiches', '/sandwiches')(Sandwiches);
defineRoute('stop', '/tacos/bus/stop')({});
defineRoute('bus', '/tacos/bus')({});
defineRoute('sandwiches-cart', '/sandwiches/cart')({});
defineRoute('tacos', '/tacos')({});
defineRoute('cart', '/tacos/cart')({});

test('define should have return an object with component and path property', () => {
  expect(Page.path).toBe('/sandwiches');
  expect(Page.component).toBe(Sandwiches);
});

test('exportRoutes should return the correct structure', () => {
  const routing = exportRoutes()
  expect(exportRoutes()).toEqual(routes);
});

test('routeFor should return the correct url', () => {
  expect(routeFor('tacos')).toBe('/tacos');
  expect(routeFor('bus')).toBe('/tacos/bus');
  expect(routeFor('non-existant-route')).toBeNull();
});

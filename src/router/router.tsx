import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Editor from '../pages/Editor'


// Create root route (layout)
const rootRoute = createRootRoute({
  component: Root,
})

// Define individual routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// const aboutRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/about',
//   component: About,
// })

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  component: Editor,
})

// Add routes as children to the root route
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, editorRoute])

// Create the router
export const router = createRouter({ routeTree })

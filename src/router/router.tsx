import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Editor from '../pages/Editor'
import Profile from '../pages/Profile'
import ProtectedRoute from '../router/Protected'
import Register from '../pages/Register'
import Collections from '../pages/Collections'
import SideBarPage from '../pages/SideBarPage'


// Create root route (layout)
const rootRoute = createRootRoute({
  component: Root,
})

// Define individual routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <SideBarPage><Home /></SideBarPage>,
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

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  component: Editor,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
})

const collectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/collections',
  component: () => (
    <ProtectedRoute>
      <Collections />
    </ProtectedRoute>
  ),
})
// Add routes as children to the root route
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, registerRoute, editorRoute, profileRoute, collectionRoute])

// Create the router
export const router = createRouter({ routeTree })

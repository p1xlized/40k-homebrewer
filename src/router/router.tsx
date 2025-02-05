import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Editor from '../pages/Editor'
import ProtectedRoute from '../router/Protected'
import Register from '../pages/Register'
import Collections from '../pages/ChaptersList'
import SideBarPage from '../pages/SideBarPage'
import ChapterDetails from '../pages/ChapterDetails'
import AppLayout from '../pages/AppLayout'
import Profile from '../pages/Profile'


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


const chaptersLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppLayout, 
});

const chaptersListRoute = createRoute({
  getParentRoute: () => chaptersLayoutRoute,
  path: '/chapters', 
  component: Collections,
});

const detailsChapterRoute = createRoute({
  getParentRoute: () => chaptersLayoutRoute,
  path: '/chapters/$id', 
  component: ChapterDetails,
});
const profileRoute = createRoute({
  getParentRoute: () => chaptersLayoutRoute,
  path: '/profile/$id', 
  component: Profile,
});
/**
 * RouteTree + Create Router, define routes on top and then add them here to routeTree
 * @author P1xlized
 */
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, registerRoute, editorRoute,chaptersLayoutRoute.addChildren([chaptersListRoute, detailsChapterRoute, profileRoute])])
export const router = createRouter({ routeTree })

import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Editor from '../pages/Editor'
import ProtectedRoute from '../router/Protected'
import Register from '../pages/Register'
import Collections from '../pages/ChaptersList'
import ChapterDetails from '../pages/ChapterDetails'
import AppLayout from '../pages/AppLayout'
import Profile from '../pages/Profile'
import CommunityPublicChapters from '../pages/CommunityPublicChapters'



const rootRoute = createRootRoute({
  component: Root,
})



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

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const homePageRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/',
  component: CommunityPublicChapters,
})


const AppLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppLayout, 
});

const chaptersListRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/chapters', 
  component: Collections,
});

const detailsChapterRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/chapters/$id', 
  component: ChapterDetails,
});
const profileRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: '/profile/$id', 
  component: Profile,
});
/**
 * RouteTree + Create Router, define routes on top and then add them here to routeTree
 * @author P1xlized
 */
const routeTree = rootRoute.addChildren([ loginRoute, registerRoute, editorRoute,AppLayoutRoute.addChildren([chaptersListRoute, detailsChapterRoute, profileRoute, homePageRoute])])
export const router = createRouter({ routeTree })

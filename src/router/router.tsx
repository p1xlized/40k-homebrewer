import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Editor from '../pages/Editor'
import Profile from '../pages/Profile'
import ProtectedRoute from '../router/Protected'
import Register from '../pages/Register'
import Collections from '../pages/ChaptersList'
import SideBarPage from '../pages/SideBarPage'
import ChapterDetails from '../pages/ChapterDetails'
import ChaptersLayout from '../pages/ChaptersLayout'


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

// const chaptersRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/chapters',
//   component: () => (
//     <ProtectedRoute>
//       <Collections />
//     </ProtectedRoute>
//   ),
// })
// const detailsChapterRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/chapters/$id',
//   component: () => (
//     <ProtectedRoute>
//       <ChapterDetails />
//     </ProtectedRoute>
//   ),
// })

// Chapters Layout and its children
const chaptersLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chapters',
  component: ChaptersLayout, // See ChaptersLayout.tsx above
});

const chaptersListRoute = createRoute({
  getParentRoute: () => chaptersLayoutRoute,
  path: '/', 
  component: Collections,
});

const detailsChapterRoute = createRoute({
  getParentRoute: () => chaptersLayoutRoute,
  path: '$id', 
  component: ChapterDetails,
});
/**
 * RouteTree + Create Router, define routes on top and then add them here to routeTree
 * @author P1xlized
 */
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, registerRoute, editorRoute, profileRoute,  chaptersLayoutRoute.addChildren([chaptersListRoute, detailsChapterRoute])])
export const router = createRouter({ routeTree })

import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/router';
import { ThemeProvider } from './lib/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>

  );
};

export default App;

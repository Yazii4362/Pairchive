import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { ThemeProvider } from '@/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

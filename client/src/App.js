import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthorizeUser, ProtectedRoute } from './utils/authProtector';
import ContextWrapper from './context/ContextWrapper';
import Landing from './pages/landing/Landing';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Reservation from './pages/reservations/Reservation';

import Username from './components/auth/Username';
import Password from './components/auth/Password';
import Recovery from './components/auth/Recovery';
import Reset from './components/auth/Reset';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/username',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/password',
    element: (
      <ProtectedRoute>
        <Password />
      </ProtectedRoute>
    ),
  },
  {
    path: '/recovery',
    element: (
      <ProtectedRoute>
        <Recovery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reset',
    element: (
      <ProtectedRoute>
        <Reset />
      </ProtectedRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <AuthorizeUser>
        <ContextWrapper>
          <Navbar />
          <Home />
          <Footer />
        </ContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '/hotels',
    element: (
      <AuthorizeUser>
        <ContextWrapper>
          <Navbar />
          <List />
          <Footer />
        </ContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '/hotels/:id',
    element: (
      <AuthorizeUser>
        <ContextWrapper>
          <Navbar />
          <Hotel />
          <Footer />
        </ContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '/reservations',
    element: (
      <AuthorizeUser>
        <ContextWrapper>
          <Navbar />
          <Reservation />
          <Footer />
        </ContextWrapper>
      </AuthorizeUser>
    ),
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;

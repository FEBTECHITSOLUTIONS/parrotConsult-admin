import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignIn from '../pages/AdminSignin';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import PendingApplication from '../pages/PendingApplication';
import RejectedApplication from '../pages/RejectedApplication';
import AllBooking from '../pages/AllBooking';
import Revenue from '../pages/Revenue';
import AllConsultants from '../pages/AllConsultants';
import AllUsers from '../pages/AllUsers';
import Settings from '../pages/Settings';
import SendNotification from '../pages/SendNotification';


const isLoggedIn = () => {
  return localStorage.getItem('admin') !== null;  
}

const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/" />;
}

const routes = createBrowserRouter([
  {
    path: '/', 
    element: <App />, 
    children: [
      {
        path: '/', 
        element: isLoggedIn() ? <Navigate to="/dashboard" /> : <SignIn />
      },
      {
        path: '/dashboard', 
        element: <PrivateRoute element={<Dashboard />} />
      },
      {
        path: '/pending-applications', 
        element: <PrivateRoute element={<PendingApplication />} />
      },
      {
        path: '/rejected-applications', 
        element: <PrivateRoute element={<RejectedApplication />} />
      },
      {
        path: '/all-booking', 
        element: <PrivateRoute element={<AllBooking />} />
      },
      {
        path: '/revenue', 
        element: <PrivateRoute element={<Revenue />} />
      },
      {
        path: '/all-consultants', 
        element: <PrivateRoute element={<AllConsultants />} />
      },
      {
        path: '/all-users', 
        element: <PrivateRoute element={<AllUsers />} />
      },
      {
        path: '/settings', 
        element: <PrivateRoute element={<Settings />} />
      },
      {
        path: '/send-notification', 
        element: <PrivateRoute element={<SendNotification />} />
      }
    ]
  }
]);

export default routes;

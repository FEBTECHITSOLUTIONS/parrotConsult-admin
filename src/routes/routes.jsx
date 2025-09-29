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
    element:<PrivateRoute element={<App />} />, 
    children: [
      { path: 'dashboard', element: <Dashboard /> },
        { path: 'pending-applications', element: <PendingApplication /> },
        { path: 'rejected-applications', element: <RejectedApplication /> },
        { path: 'all-booking', element: <AllBooking /> },
        { path: 'revenue', element: <Revenue /> },
        { path: 'all-consultants', element: <AllConsultants /> },
        { path: 'all-users', element: <AllUsers /> },
        { path: 'settings', element: <Settings /> },
        { path: 'send-notification', element: <SendNotification /> }
    ]
  }
]);

export default routes;

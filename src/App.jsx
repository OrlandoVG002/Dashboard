import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Homeboard from './components/Homeboard/Homeboard.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Details from './components/Details/Details.jsx';
import Calendar from './components/Calendar/Calendar.jsx';
import MonthlyTop from './components/MonthlyTop/MonthlyTop.jsx';
import TopDevs from './components/TopDevs/TopDevs.jsx';

function Layout() {
    return (
        <div className="app-shell">
            <div className="app-navbar">
                <Navbar />
            </div>
            <div className="body">
                <Outlet />
            </div>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Homeboard /> },
            { path: "Details/:id", element: <Details /> },
            { path: "Calendar", element: <Calendar /> },
            { path: "MonthlyTop", element: <MonthlyTop /> },
            { path: "TopDevs", element: <TopDevs /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

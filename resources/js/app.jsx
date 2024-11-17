import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../css/app.css";
import "./bootstrap";
import Home from "./components/Home";
import Test from "./components/Test";

// Define the routes
const routers = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/test",
        element: <Test />,
    },
];

// App component that uses the Router and displays the current route
const App = () => (
    <AppProvider>
        <RouterProvider router={createBrowserRouter(routers)} />
    </AppProvider>
);

// Create and render the React Router instance
createRoot(document.getElementById("app")).render(<App />);

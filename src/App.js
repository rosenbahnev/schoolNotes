import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { List } from "./components/List/List";

import "./App.css";
import { Create } from "./components/Create/Create";
import { Words } from "./components/Words/Words";
import AppLayout from "./components/AppLayout/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
            },
        },
    });

    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                {
                    path: "/list",
                    element: <List />,
                },
                { path: "/create", element: <Create /> },
                { path: "/words", element: <Words /> },
            ],
        },
    ]);

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </div>
    );
}

export default App;

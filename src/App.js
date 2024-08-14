import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { List } from "./components/List/List";

import "./App.css";
import { Create } from "./components/Create/Create";
import { Words } from "./components/Words/Words";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
    const [list, setList] = useState();

    useEffect(() => {
        (async function () {
            const data = await (
                await fetch(
                    "https://alertgiraffe.backendless.app/api/data/zabelejki"
                )
            ).json();
            setList(data);
        })();
    }, []);

    function addItem(newItem) {
        setList([...list, { ...newItem }]);
    }

    function updateVotes(item) {
        const oldList = [...list];
        const target = oldList.find((x) => x.objectId === item.objectId);

        target["upvotes"] = item.upvotes;
        target["downvotes"] = item.downvotes;
        setList(oldList);
    }

    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                {
                    path: "/list",
                    element: <List data={list} updateVotes={updateVotes} />,
                },
                { path: "/create", element: <Create addItem={addItem} /> },
                { path: "/words", element: <Words /> },
            ],
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

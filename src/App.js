import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { List } from "./components/List/List";

import "./App.css";
import { Create } from "./components/Create/Create";
import { Words } from "./components/Words/Words";

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

    return (
        <div className="App">
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/list"
                        element={<List data={list} updateVotes={updateVotes} />}
                    />
                    <Route
                        path="/create"
                        element={<Create addItem={addItem} />}
                    />
                    <Route path="/words" element={<Words />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

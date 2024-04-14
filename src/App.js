import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { List } from "./components/List/List";

import './App.css';
import { Create } from "./components/Create/Create";



function App() {
    const navigate = useNavigate();
    const [list, setList] = useState();

    useEffect(() => {
       (async function(){
        const data = await (await fetch('https://alertgiraffe.backendless.app/api/data/zabelejki')).json()
        setList(data);
        console.log(data);
       })()
    }, []);

    function addItem (newItem) {
        setList([...list, {...newItem}])
    }



    return (
        <div className="App">

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<List data={list}/>} />
                    <Route path="/create" element={<Create addItem={addItem}/>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

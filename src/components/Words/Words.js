import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import WordList from "./WordsList";
import Spinner from "../Spinner/Spinner";

const Words = () => {
    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const data = await (
                await fetch(
                    "https://alertgiraffe.backendless.app/api/data/words"
                )
            ).json();
            setWords(data);
            setIsLoading(false);
        })();
    }, []);

    function onWordAdd(word) {
        setWords((state) => [...state, word]);
    }

    function onWordDeletion(id) {
        console.log("Delete id, ", id);

        setWords((state) => state.filter((x) => x.objectId !== id));
    }

    return (
        <>
            <h1>Думи за писане</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <WordList
                    words={words}
                    onWordAdd={onWordAdd}
                    onWordDeletion={onWordDeletion}
                />
            )}

            <Link className="btn-general" to={"/"}>
                Начало
            </Link>
        </>
    );
};

export { Words };

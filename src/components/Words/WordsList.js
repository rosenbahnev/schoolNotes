import { useState } from "react";

import styles from "./Words.module.css";

export default function WordList({
    words,
    onWordAdd,
    onWordDeletion,
    setIsLoading,
}) {
    const [newWord, setNewWord] = useState("");
    const [hasNewWordError, setHasNewWordError] = useState(false);

    function newWordChangeHandler(event) {
        setNewWord(event.target.value);
    }

    async function newWordHandler() {
        if (newWord.length < 3) return;

        await fetch("https://alertgiraffe.backendless.app/api/data/words", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word: newWord }),
        })
            .then((res) => res.json())
            .then((data) => onWordAdd(data));

        setNewWord("");
    }

    async function deleteWordHandler(id) {
        setIsLoading(true);
        await fetch(
            `https://alertgiraffe.backendless.app/api/data/words/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => console.log(data));

        setIsLoading(false);

        onWordDeletion(id);
    }

    return (
        <>
            <div className="input">
                <label htmlFor="name">Нова дума за писане</label>
                <input
                    type="text"
                    id="word"
                    name="word"
                    value={newWord}
                    onChange={newWordChangeHandler}
                />
                {hasNewWordError && (
                    <p className="inputError">Невалидна дума</p>
                )}
                <button className="btn-general" onClick={newWordHandler}>
                    Добави дума
                </button>
            </div>
            {words.length === 0 ? (
                <h2>Браво, нямаш думи за писане</h2>
            ) : (
                <ul className={styles.list}>
                    {words.map((x) => (
                        <li className={styles.wordListItem} key={x.objectId}>
                            <p>
                                {x.word}{" "}
                                <button
                                    onClick={() =>
                                        deleteWordHandler(x.objectId)
                                    }
                                    className={styles["btn-close"]}
                                >
                                    &#x2715;
                                </button>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

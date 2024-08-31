export async function getWords() {
    const data = await (
        await fetch("https://alertgiraffe.backendless.app/api/data/words")
    ).json();

    return data;
}

export async function addWord(newWord) {
    const data = await fetch(
        "https://alertgiraffe.backendless.app/api/data/words",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newWord),
        }
    ).then((res) => res.json());

    return data;
}

export async function deleteWord(id) {
    const data = await fetch(
        `https://alertgiraffe.backendless.app/api/data/words/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());

    return data;
}

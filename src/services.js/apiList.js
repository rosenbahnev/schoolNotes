export async function getList() {
    const data = await (
        await fetch(
            "https://alertgiraffe.backendless.app/api/data/zabelejki?pageSize=100"
        )
    ).json();

    return data;
}

export async function addListItem(item) {
    const data = await (
        await fetch("https://alertgiraffe.backendless.app/api/data/zabelejki", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: item,
        })
    ).json();

    return data;
}

export async function editVotes({ id, votes, type }) {
    const data = (
        await fetch(
            `https://alertgiraffe.backendless.app/api/data/zabelejki/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [type]: votes }),
            }
        )
    ).json();

    return data;
}

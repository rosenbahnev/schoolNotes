export async function getList() {
    const data = await (
        await fetch(
            "https://alertgiraffe.backendless.app/api/data/zabelejki?pageSize=100"
        )
    ).json();

    return data;
}

export async function addListItem(item) {
    console.log("AddItem API");
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

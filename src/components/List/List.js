import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export const List = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const data = await (
                await fetch(
                    "https://alertgiraffe.backendless.app/api/data/zabelejki"
                )
            ).json();
            setList(data);
            setIsLoading(false);
        })();
    }, []);

    function updateVotes(item) {
        const oldList = [...list];
        const target = oldList.find((x) => x.objectId === item.objectId);

        target["upvotes"] = item.upvotes;
        target["downvotes"] = item.downvotes;
        setList(oldList);
    }

    async function voteCallback(id, currentVotes, direction) {
        const decision = direction === "up" ? "upvotes" : "downvotes";
        await fetch(
            `https://alertgiraffe.backendless.app/api/data/zabelejki/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [decision]: currentVotes + 1 }),
            }
        )
            .then((res) => res.json())
            .then((data) => updateVotes(data));
    }

    if (isLoading)
        return (
            <>
                <h1>Забележки</h1>
                <Spinner />;
            </>
        );
    return (
        <>
            <h1>Забележки</h1>
            <Link className="btn-general" to={"/create"}>
                Писане на забележка
            </Link>
            <ul>
                {list.map((x) => (
                    <li className="zabelejka" key={x.objectId}>
                        {x.name} - {x.day}
                        <p>{x.text}</p>
                        <div className="voting-div">
                            <span
                                className="upvote-span"
                                onClick={() =>
                                    voteCallback(x.objectId, x.upvotes, "up")
                                }
                            >
                                👍 {x.upvotes}
                            </span>
                            <span
                                className="downvote-span"
                                onClick={() =>
                                    voteCallback(
                                        x.objectId,
                                        x.downvotes,
                                        "down"
                                    )
                                }
                            >
                                👎 {x.downvotes}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export async function loader() {
    const res = await fetch(
        "https://alertgiraffe.backendless.app/api/data/zabelejki"
    );

    if (!res.ok) throw Error("Проблем при зарежданеот на забележките");
    const data = await res.json();

    return data;
}

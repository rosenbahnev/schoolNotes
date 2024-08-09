import { Link } from "react-router-dom";

export const List = ({ data, updateVotes }) => {
    data = data || [];

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

    return (
        <>
            <h1>Забележки</h1>
            <ul>
                {data.map((x) => (
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

            <Link className="btn-general" to={"/create"}>
                Писане на забележка
            </Link>
            <Link className="btn-general" to={"/"}>
                Начало
            </Link>
        </>
    );
};

import { Link } from "react-router-dom";

export const List = ({data}) => {
    data = data || [];
    return (
        <>
            <h1>Забележки</h1>
            <ul>
                {data.map(x => <li className="zabelejka" key={x.objectId}>{x.name} - {x.day} <p>{x.text}</p></li>)}
            </ul>

            <Link className="btn-general" to={'/create'}>Писане на забележка</Link>
        </>
    )
}


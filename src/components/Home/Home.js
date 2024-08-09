import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <img id="img_belejnik" src="belezhnik.jpg"></img>

            <Link className="btn-general" to={"/list"}>
                Забелeжки
            </Link>
            <p>
                <Link className="btn-general" to={"/create"}>
                    Писане на забележка
                </Link>
            </p>
            <Link className="btn-general" to={"/words"}>
                Думи за преписване
            </Link>
        </>
    );
};

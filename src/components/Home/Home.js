import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <img id="img_belejnik" src="belezhnik.jpg"></img>

            <Link className="btn-general" to={'/list'}>Забелeжки</Link>
            <p></p>
            <Link className="btn-general" to={'/create'}>Писане на забележка</Link>
        
        </>
    )
}


import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

export const Create = ({
    onCreate
}) => {
    const {values, changeHandler, onSubmit} = useForm({
        name: '',
        text: ''
    }, onCreate)


    return (
        <>
        <form id="create" method="POST" onSubmit={onSubmit}>
            <h1>Нова забележка</h1>
                    <label htmlFor="name">Име на дете, родител, баба, дядо</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Име"
                        value={values.name}
                        onChange={changeHandler}
                    />

                    <label htmlFor="text">Провинение:</label>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        placeholder="Какво е направил"
                        value={values.text}
                        onChange={changeHandler}
                    />

                    <button type="submit">Създай забележка</button>

                    <Link className="btn-general" to={'/list'}>Отказ</Link>
        </form>


            
        </>
        
    )
}
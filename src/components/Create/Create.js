import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";

import { getBGdate } from "../../helpers/getBGdate";

export const Create = ({ addItem }) => {

    const navigate = useNavigate();

    const onCreate = async function (data) {
        const date = getBGdate();
        data = { ...data, day: date };
        await fetch('https://alertgiraffe.backendless.app/api/data/zabelejki', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => addItem(data))


        navigate("/list");
    }

    const { values, changeHandler, onSubmit } = useForm({
        name: '',
        text: ''
    }, onCreate)


    return (
        <>
            <form id="create" method="POST" onSubmit={onSubmit}>
                <h1>Нова забележка</h1>
                <div className='input'>
                    <label htmlFor="name">Име на дете, родител, баба, дядо</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Име"
                        value={values.name}
                        onChange={changeHandler}
                    />
                </div>

                <div className='input'>
                    <label htmlFor="text">Провинение:</label>
                    <textarea rows="4" onls="70"
                        type="text"
                        id="text"
                        name="text"
                        placeholder="Какво е направил"
                        value={values.text}
                        onChange={changeHandler}
                    />
                </div>

                <div className='input'>
                    <button className="btn-general" type="submit">Създай забележка</button>
                </div>

                <div className='input'>
                    <Link className="btn-general" to={'/list'}>Отказ</Link>
                </div>
            </form>



        </>

    )
}
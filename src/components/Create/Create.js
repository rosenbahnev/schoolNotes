import { Link, useNavigate } from "react-router-dom";

import { getBGdate } from "../../helpers/getBGdate";
import { useState } from "react";

export const Create = ({ addItem }) => {
    const [hasNameError, setNameError] = useState(false);
    const [hasTextError, setTextError] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [textInput, setTextInput] = useState("");

    function nameInputHandler(event) {
        setNameInput(event.target.value);
        setNameError(false);
    }
    function textInputHandler(event) {
        setTextInput(event.target.value);
        setTextError(false);
    }

    const navigate = useNavigate();

    const onCreate = async function () {
        const date = getBGdate();
        const data = { name: nameInput, text: textInput, day: date };
        await fetch("https://alertgiraffe.backendless.app/api/data/zabelejki", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => addItem(data));

        navigate("/list");
    };

    const onSubmit = function (e) {
        e.preventDefault();

        let hasError = false;

        if (nameInput === "") {
            setNameError(true);
            hasError = true;
        }
        if (textInput === "") {
            setTextError(true);
            hasError = true;
        }
        if (hasError === true) {
            return;
        }

        onCreate();
    };

    // const { values, changeHandler, onSubmit } = useForm({
    //     name: '',
    //     text: ''
    // }, onSubmitBtn)

    return (
        <>
            <form id="create" method="POST" onSubmit={onSubmit}>
                <h1>Нова забележка</h1>
                <div className="input">
                    <label htmlFor="name">
                        Име на дете, родител, баба, дядо
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Име"
                        value={nameInput}
                        onChange={nameInputHandler}
                    />
                    {hasNameError && (
                        <p className="inputError">Невалидно име</p>
                    )}
                </div>

                <div className="input">
                    <label htmlFor="text">Провинение:</label>
                    <textarea
                        rows="5"
                        cols="30"
                        type="text"
                        id="text"
                        name="text"
                        placeholder="Какво е направил"
                        value={textInput}
                        onChange={textInputHandler}
                    />
                    {hasTextError && (
                        <p className="inputError">Невалидeн текст</p>
                    )}
                </div>

                <div className="input">
                    <button className="btn-general" type="submit">
                        Създай забележка
                    </button>
                </div>

                <div className="input">
                    <Link className="btn-general" to={"/list"}>
                        Отказ
                    </Link>
                </div>
                <div className="input">
                    <Link className="btn-general" to={"/"}>
                        Начало
                    </Link>
                </div>
            </form>
        </>
    );
};

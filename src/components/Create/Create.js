import { getBGdate } from "../../helpers/getBGdate";
import { useState } from "react";
import { addListItem } from "../../services.js/apiList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Create = ({ onClose }) => {
  const queryClient = useQueryClient();

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

  const { mutate, isPending } = useMutation({
    mutationFn: addListItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      onClose();
    },
    onError: (e) => console.error(e),
  });

  const onSubmit = async function (e) {
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

    const date = getBGdate();
    const newItem = JSON.stringify({
      name: nameInput,
      text: textInput,
      day: date,
      upvotes: 0,
      downvotes: 0,
    });

    mutate(newItem);
  };

  return (
    <>
      <form id="create" method="POST" onSubmit={onSubmit}>
        <h1>Нова забележка</h1>
        <div className="input">
          <label htmlFor="name">Име на дете, родител, баба, дядо</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Име"
            value={nameInput}
            onChange={nameInputHandler}
            disabled={isPending}
          />
          {hasNameError && <p className="inputError">Невалидно име</p>}
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
            disabled={isPending}
          />
          {hasTextError && <p className="inputError">Невалидeн текст</p>}
        </div>

        <div className="input">
          <button className="btn-general" type="submit" disabled={isPending}>
            Създай забележка
          </button>
        </div>

        <div className="input">
          <button
            type="button"
            className="btn-general"
            onClick={onClose}
            disabled={isPending}
          >
            Отказ
          </button>
        </div>
      </form>
    </>
  );
};

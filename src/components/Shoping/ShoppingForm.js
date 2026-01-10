import styles from "./Shoping.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addShopingItem } from "../../services.js/apiShoping";
import SmalSpinner from "../Spinner/SmalSpinner";

export default function WordsForm() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const { mutate, isPending: isAdding } = useMutation({
        mutationFn: addShopingItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shoping"] });
            reset();
        },
    });

    function onSubmit(data) {
        mutate(data);
    }

    function onError(err) {}

    return (
        <form
            className={styles.formInput}
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <label htmlFor="word">Нов продукт за купуване</label>
            <input
                type="text"
                id="item"
                {...register("item", {
                    required: "Трябва да се въведе продукт",
                })}
            />
            <div className={styles.errorDiv}>
                {errors?.word && (
                    <p className="inputError">Невалиден продукт</p>
                )}
            </div>
            <button className="btn-general" disabled={isAdding}>
                Добави продукт {isAdding ? <SmalSpinner /> : ""}
            </button>
        </form>
    );
}

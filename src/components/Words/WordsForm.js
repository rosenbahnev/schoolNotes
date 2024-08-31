import styles from "./Words.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWord } from "../../services.js/apiWords";

export default function WordsForm() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const { mutate, isLoading: isAdding } = useMutation({
        mutationFn: addWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
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
            <label htmlFor="word">Нова дума за писане</label>
            <input
                type="text"
                id="word"
                {...register("word", {
                    required: "Трябва да се въведе дума",
                })}
            />
            <div className={styles.errorDiv}>
                {errors?.word && <p className="inputError">Невалидна дума</p>}
            </div>
            <button className="btn-general">Добави дума</button>
        </form>
    );
}

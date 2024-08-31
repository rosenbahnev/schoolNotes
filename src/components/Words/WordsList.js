import styles from "./Words.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWord } from "../../services.js/apiWords";
import Spinner from "../Spinner/Spinner";
import SmalSpinner from "../Spinner/SmalSpinner";

export default function WordList({ words }) {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: deleteWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
    console.log(isDeleting);

    return (
        <>
            {words.length === 0 ? (
                <h2>Браво, нямаш думи за писане</h2>
            ) : (
                <ul className={styles.list}>
                    {words.map((x) => (
                        <li className={styles.wordListItem} key={x.objectId}>
                            <p>
                                {x.word}{" "}
                                {isDeleting ? (
                                    <SmalSpinner />
                                ) : (
                                    <button
                                        onClick={() => mutate(x.objectId)}
                                        className={styles["btn-close"]}
                                    >
                                        &#x2715;
                                    </button>
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

import styles from "./Shoping.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShopingItem } from "../../services.js/apiShoping";
import SmalSpinner from "../Spinner/SmalSpinner";

export default function ShopingList({ shopingItems }) {
    console.log(ShopingList);
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: deleteShopingItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shoping"] });
        },
    });

    const shopLogos = {
        shop2: "lidl.jpg",
        shop1: "billa.jpg",
    };

    return (
        <>
            {shopingItems.length === 0 ? (
                <h2>Всичко е в количката</h2>
            ) : (
                <ul className={styles.list}>
                    {shopingItems.map((x) => (
                        <li className={styles.shopingItem} key={x.objectId}>
                            <span>{x.item}</span>
                            <span className={styles.delete_span}>
                                {x.shop !== "none" && (
                                    <img
                                        className={styles["shop_thumb"]}
                                        src={shopLogos[x.shop]}
                                        alt="Lidl"
                                    ></img>
                                )}
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
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

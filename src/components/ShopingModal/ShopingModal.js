import { useState } from "react";
import { addShopingItem } from "../../services.js/apiShoping";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./ShopingModal.module.css";

export const ShopingModal = ({ onClose }) => {
    const queryClient = useQueryClient();

    const [hasItemError, setItemError] = useState(false);
    const [itemInput, setItemInput] = useState("");
    const [shop, setShop] = useState("none");

    function itemInputHandler(event) {
        setItemInput(event.target.value);
        setItemError(false);
    }

    const { mutate, isPending } = useMutation({
        mutationFn: addShopingItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shoping"] });
            onClose();
        },
        onError: (e) => console.error(e),
    });

    const onSubmit = async function (e) {
        e.preventDefault();

        let hasError = false;

        if (itemInput === "") {
            setItemError(true);
            hasError = true;
        }

        if (hasError === true) {
            return;
        }

        const newItem = {
            item: itemInput,
            shop,
        };

        mutate(newItem);
    };

    return (
        <>
            <form
                className={styles.shopingForm}
                method="POST"
                onSubmit={onSubmit}
            >
                <h1>За купуване</h1>
                <div className={styles.newShopingItem}>
                    <textarea
                        id="item"
                        name="itme"
                        placeholder="Въведи продукта тук"
                        value={itemInput}
                        onChange={itemInputHandler}
                        disabled={isPending}
                        rows={3}
                    />
                    {hasItemError && (
                        <p className="inputError">Невалидeн продукт</p>
                    )}
                </div>

                <div className={styles.shopSection}>
                    <label>Избери магазин:</label>
                    <div className={styles.shopSelection}>
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="none"
                                name="shop"
                                value="none"
                                checked={shop === "none"}
                                onChange={(e) => setShop(e.target.value)}
                                disabled={isPending}
                            />
                            <label htmlFor="none">Се тая</label>
                        </div>

                        <div className="radio-option">
                            <input
                                type="radio"
                                id="shop2"
                                name="shop"
                                value="shop2"
                                checked={shop === "shop2"}
                                onChange={(e) => setShop(e.target.value)}
                                disabled={isPending}
                            />
                            <label htmlFor="shop2">Lidl</label>
                        </div>

                        <div className="radio-option">
                            <input
                                type="radio"
                                id="shop1"
                                name="shop"
                                value="shop1"
                                checked={shop === "shop1"}
                                onChange={(e) => setShop(e.target.value)}
                                disabled={isPending}
                            />
                            <label htmlFor="shop1">Billa</label>
                        </div>
                    </div>
                </div>

                <div className="input">
                    <button
                        className="btn-general"
                        type="submit"
                        disabled={isPending}
                    >
                        Добави продукт
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

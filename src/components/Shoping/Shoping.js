import ShopingList from "./ShopingList";
import Spinner from "../Spinner/Spinner";
import Modal from "../../ui/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { getShoppingList } from "../../services.js/apiShoping";
import { ShopingModal } from "../ShopingModal/ShopingModal";

const Shoping = () => {
    function onWordAdd(word) {
        console.log(word);
    }

    function onWordDeletion(id) {
        console.log("Delete id, ", id);
    }
    function setIsLoading() {
        console.log("loading");
    }

    const {
        isLoading,
        data: shopingItems,
        error,
    } = useQuery({
        queryKey: ["shoping"],
        queryFn: getShoppingList,
    });

    return (
        <>
            <h1>Неща за купуване</h1>

            <Modal>
                <Modal.Open name="form">
                    <button disabled={isLoading} className="btn-general">
                        Добави продукт
                    </button>
                </Modal.Open>
                <Modal.Window name="form">
                    <ShopingModal />
                </Modal.Window>
            </Modal>

            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <ShopingList shopingItems={shopingItems} />
                </div>
            )}
        </>
    );
};

export { Shoping };

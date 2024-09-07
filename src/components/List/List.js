import Spinner from "../Spinner/Spinner";
import Modal from "../../ui/Modal/Modal";
import { Create } from "../Create/Create";
import { useQuery } from "@tanstack/react-query";
import { getList } from "../../services.js/apiList";
import ListItem from "./ListItem";

export const List = () => {
    const {
        isLoading,
        data: list,
        error,
    } = useQuery({
        queryKey: ["list"],
        queryFn: getList,
    });

    return (
        <>
            <h1>Забележки</h1>

            <Modal>
                <Modal.Open name="form">
                    <button disabled={isLoading} className="btn-general">
                        Писане на забележка
                    </button>
                </Modal.Open>
                <Modal.Window name="form">
                    <Create />
                </Modal.Window>
            </Modal>

            {isLoading ? (
                <Spinner />
            ) : (
                <ul>
                    {list.map((x) => (
                        <ListItem key={x.objectId} item={x} />
                    ))}
                </ul>
            )}
        </>
    );
};

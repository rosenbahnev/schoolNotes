import styles from "./Shoping.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShopingItem } from "../../services.js/apiShoping";
import SmalSpinner from "../Spinner/SmalSpinner";
import Modal from "../../ui/Modal/Modal";
import { ShopingEdit } from "../ShopingModal/ShopingEdit";

export default function ShopingList({ shopingItems }) {
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
              <div className={styles.itemInfo}>
                <span>{x.item}</span>
              </div>
              <div className={styles.delete_span}>
                {isDeleting ? (
                  <SmalSpinner />
                ) : (
                  <div className={styles.controls}>
                    <div className={styles.editBtn}>
                      <Modal>
                        <Modal.Open name="formEdit">
                          <button className={styles["btn-edit"]}>
                            &#9998;{" "}
                          </button>
                        </Modal.Open>
                        <Modal.Window
                          name="formEdit"
                          itemID={x.objectId}
                          itemName={x.item}
                          itemShop={x.shop}
                        >
                          <ShopingEdit />
                        </Modal.Window>
                      </Modal>
                    </div>

                    <div className={styles.logo}>
                      {x.shop !== "none" && (
                        <img
                          className={styles["shop_thumb"]}
                          src={shopLogos[x.shop]}
                          alt="Lidl"
                        ></img>
                      )}
                    </div>

                    <div className={styles.closeBtn}>
                      <button
                        onClick={() => mutate(x.objectId)}
                        className={styles["btn-close"]}
                      >
                        &#x2715;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

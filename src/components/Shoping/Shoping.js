import { useState } from "react";
import ShopingList from "./ShopingList";
import Spinner from "../Spinner/Spinner";
import Modal from "../../ui/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { getShoppingList } from "../../services.js/apiShoping";
import { ShopingModal } from "../ShopingModal/ShopingModal";
import styles from "./Shoping.module.css";

const FILTERS = [
  { value: "all", label: "Всички", logo: null },
  { value: "shop2", label: "Lidl", logo: "lidl.jpg" },
  { value: "shop1", label: "Billa", logo: "billa.jpg" },
];

const Shoping = () => {
  const [filter, setFilter] = useState("all");

  const {
    isLoading,
    data: shopingItems,
    error,
  } = useQuery({
    queryKey: ["shoping"],
    queryFn: getShoppingList,
  });

  const filteredItems = (
    filter === "all"
      ? (shopingItems ?? [])
      : (shopingItems ?? []).filter((item) => item.shop === filter)
  ).toSorted((a, b) => b.created - a.created);

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

      <div className={styles.filter}>
        {FILTERS.map(({ value, label, logo }) => (
          <label key={value}>
            <input
              type="radio"
              name="shopFilter"
              value={value}
              checked={filter === value}
              onChange={() => setFilter(value)}
              disabled={isLoading}
            />
            {logo ? (
              <img src={logo} alt={label} className={styles.filterLogo} />
            ) : (
              label
            )}
          </label>
        ))}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ShopingList shopingItems={filteredItems} />
        </div>
      )}
    </>
  );
};

export { Shoping };

export async function getShoppingList() {
  const data = await (
    await fetch(
      "https://alertgiraffe.backendless.app/api/data/shoping?pageSize=100",
    )
  ).json();

  return data;
}

export async function addShopingItem(newShopingItem) {
  const data = await fetch(
    "https://alertgiraffe.backendless.app/api/data/shoping",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShopingItem),
    },
  ).then((res) => res.json());

  return data;
}

export async function deleteShopingItem(id) {
  const data = await fetch(
    `https://alertgiraffe.backendless.app/api/data/shoping/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());

  return data;
}

export async function editShopingItem({ itemID, itemName, itemShop }) {
  console.log({
    itemID,
    itemName,
    itemShop,
  });
  const data = await fetch(
    `https://alertgiraffe.backendless.app/api/data/shoping/${itemID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: itemName,
        shop: itemShop,
      }),
    },
  ).then((res) => res.json());

  return data;
}

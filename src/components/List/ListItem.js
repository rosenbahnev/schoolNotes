import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./ListItem.module.css";
import { editVotes } from "../../services.js/apiList";
import SmalSpinner from "../Spinner/SmalSpinner";

export default function ListItem({ item }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editVotes,
    onSuccess: () => {
      queryClient.invalidateQueries(["list"]);
    },
  });

  return (
    <li className={styles.zabelejka} key={item.objectId}>
      {item.name} - {item.day}
      <p>{item.text}</p>
      <div className={styles.votingDiv}>
        <button
          disabled={isPending}
          className={styles.voteBtn}
          onClick={() =>
            mutate({
              id: item.objectId,
              votes: item.upvotes + 1,
              type: "upvotes",
            })
          }
        >
          👍 {isPending ? <SmalSpinner /> : item.upvotes}
        </button>
        <button
          disabled={isPending}
          className={styles.voteBtn}
          onClick={() =>
            mutate({
              id: item.objectId,
              votes: item.downvotes + 1,
              type: "downvotes",
            })
          }
        >
          👎 {isPending ? <SmalSpinner /> : item.downvotes}
        </button>
      </div>
    </li>
  );
}

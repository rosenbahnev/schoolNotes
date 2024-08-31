import WordList from "./WordsList";
import Spinner from "../Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getWords } from "../../services.js/apiWords";
import WordsForm from "./WordsForm";

const Words = () => {
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
        data: words,
        error,
    } = useQuery({
        queryKey: ["words"],
        queryFn: getWords,
    });

    return (
        <>
            <h1>Думи за писане</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <WordsForm />
                    <WordList
                        words={words}
                        onWordAdd={onWordAdd}
                        onWordDeletion={onWordDeletion}
                        setIsLoading={setIsLoading}
                    />
                </div>
            )}
        </>
    );
};

export { Words };

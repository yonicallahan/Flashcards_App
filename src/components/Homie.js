import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api"
import HomeDecks from "./HomeDecks"
import { deleteDeck } from "../utils/api";

function Homie() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function getData() {
            const response = await listDecks()
            setDecks(response)
        }
        getData()
    }, [])

    function handleDelete(id) {
        const doesConfirm = window.confirm("Are you sure you want to delete?");
        if (!doesConfirm) return;
        deleteDeck(id)
            .then(() => {
                return listDecks()
            })
            .then((response) => setDecks(response))
            .catch(err => console.error(err));
    }

    return (
        <div class="container">
            <button onClick={() => history.push("/decks/new")} className="btn btn-primary btn-lg btn-lg"><span class="oi oi-plus"></span> Create Deck</button>
            <br />
            <br />
            <ol>
                {decks.map((deck) => {
                    return (
                        <HomeDecks deck={deck} handleDelete={handleDelete} />
                    )
                })}
            </ol>
        </div>



    )
}
export default Homie;
import React from "react"
import { useHistory, useParams } from "react-router-dom"


function CardDisplay({ card, handleDeleteCard }) {
    const history = useHistory()
    const edit = () => {
        history.push(`/decks/${card.deckId}/cards/${card.id}/edit`)
    }

    return (
        <div class="container border rounded">
            <div class="row p-3">
                <div class="col">
                    <p>{card.front}</p>
                </div>
                <div class="col">
                    <p>{card.back}</p>
                </div>
                <button type="button" class="btn btn-secondary mr-2" onClick={edit}><span class="oi oi-pencil"></span> Edit</button>

                <button type="button" class="btn btn-danger float right" onClick={() => handleDeleteCard(card.id)}><span class="oi oi-trash"></span></button>

            </div>
        </div>
    )
}

export default CardDisplay
import React, { useEffect, useState } from "react"
import { readCard, readDeck, updateCard } from "../utils/api"
import { useHistory, useParams } from "react-router-dom"

function EditCard() {
    const { cardId, deckId } = useParams()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    const history = useHistory()

    useEffect(() => {
        async function getData() {
            const cardResponse = await readCard(cardId)
            const deckResponse = await readDeck(deckId)
            setCard(cardResponse)
            setDeck(deckResponse)
        }
        getData()
    }, [])

    if (!deck.id) {
        return <h1>Loading...</h1>
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        updateCard(card)
            .then(() => {
                history.push(`/decks/${deckId}`)
            }).catch((err) => {
                alert(err)
            })
    }

    const handleChange = (event) => {
        setCard({ ...card, [event.target.name]: event.target.value })
    }

    return (
        <form class="container" onSubmit={handleSubmit}>
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{`${deck.name}`}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Card</li>
                    </ol>
                </nav>
            </div>
            <div class="container">
                <h1>Edit Card</h1>
                <h5>{deck.name}: Add Card</h5>
            </div>
            <div className="container form-group">
                <label for="front">Front</label>
                <input type="text" id="front" name="front" className="form-control"
                    required placeholder="Front" onChange={handleChange} value={card.front}></input>
            </div>
            <div className=" container form-group">
                <label for="back">Back</label>
                <input type="text" id="back" name="back" className="form-control"
                    required placeholder="Back" onChange={handleChange} value={card.back}></input>
                <button onClick={() => history.push(`/decks/${deckId}`)} type="button" className="btn btn-secondary mr-2 mt-2" >Cancel</button>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>

        </form>
    )
}
export default EditCard;

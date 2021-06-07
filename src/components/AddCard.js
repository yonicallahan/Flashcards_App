import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../utils/api"
import { useHistory, useParams } from "react-router-dom"

function AddCard() {
    const { deckId } = useParams()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    const history = useHistory()
    useEffect(() => {
        async function getData() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        getData()
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, card)
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
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h4>{deck.name}: Add Card</h4>
            <div className="form-group">
                <label for="front">Front</label>
                <textarea type="text" name="front" className="form-control"
                    rows="2" requred placeholder="Front side of card" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
                <label for="back">Back</label>
                <textarea type="text" name="back" className="form-control"
                    rows="2" requred placeholder="Back side of card" onChange={handleChange}></textarea>
            </div>
            <button onClick={() => history.push(`/decks/${deckId}`)} type="button" className="btn btn-secondary mr-2" >Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddCard;
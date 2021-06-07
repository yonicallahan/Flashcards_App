import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api"
import {useParams, useHistory} from "react-router-dom"
import  {updateDeck}  from "../utils/api"

function EditDeck() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
    const history = useHistory()

    useEffect(() => {
        async function getData() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        getData()
    }, [])

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateDeck(deck)
            .then(() => {
                history.push(`/decks/${deckId}`)
            }).catch((err)=> {
                alert(err)
            }) 
    }


    return (
        <form class="container" onSubmit={handleSubmit}>
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
            </div>
            <div class="container">
                <h1>Edit Deck</h1>
            </div>
            <div className="container form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" className="form-control"
                        required placeholder="Deck Name" onChange={handleChange} value={deck.name}></input>
                </div>
                <div className=" container form-group">
                    <label for="description">Description</label>
                    <textarea type="text" name="description" className="form-control"
                        rows="4" required placeholder="Brief description of the deck" onChange={handleChange} value={deck.description}></textarea>
                                        <button onClick={() => history.push(`/decks/${deckId}`)} type="button" className="btn btn-secondary mt-2 mr-2" >Cancel</button>
                <button type="submit" className="mt-2 btn btn-primary">Submit</button>
                </div>

        </form>
    )
}
export default EditDeck;

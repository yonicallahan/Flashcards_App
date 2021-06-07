import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api"
import { useParams, useHistory } from "react-router-dom"
import { updateDeck } from "../utils/api"

function Study() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({ name: "Loading...", cards: [] }

    )
    const [counter, setCounter] = useState(0)
    const history = useHistory()
    const [status, setStatus] = useState(false)
    useEffect(() => {
        // async function getData() {
        //     const deckResponse = await readDeck(deckId)
        //     setDeck(deckResponse)
        // }
        // getData()
        readDeck(deckId).then(setDeck)
    }, [deckId])

    if (!deck.id) {
        return <h1>Loading...</h1>
    }

    const add = () => {
        history.push(`/decks/${deckId}/cards/new`)
    }

    function handleDone() {
        const doesConfirm = window.confirm("Are you sure you want to stop studying?");
        if (!doesConfirm) return;
        return history.push(`/decks/${deckId}`)
    }

    if (deck.cards.length < 3) {
        return (
            <div class="container">
                            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
            <button type="button" class="btn btn-primary" onClick={add}><span class="oi oi-plus"></span> Add Cards</button>

            </div>
            
        )
    } else {
        return (
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
    
                <h1>{deck.name}: Study</h1>
                <div class="container border p-3 rounded">
                    <h5>Card {counter + 1} of {deck.cards.length}</h5>
                    <p>{status ? deck.cards[counter].back : deck.cards[counter].front} </p>
                </div>
                <button type="button" class="m-2 btn btn-secondary" onClick={() => setStatus(!status)}>
                    Flip</button>
                <button type="button" class="m-2 btn btn-secondary float-right" onClick={() => setCounter(0) & setStatus(false)}> Restart</button>
                <a href={`/decks/${deckId}`}><button type="button" class="m-2 btn btn-secondary float-right"> Cancel</button></a>
    
    
    
                {status && deck.cards.length > counter + 1 &&
                    <>
                        <button type="button" class="m-2 btn btn-primary" onClick={() => setCounter(counter + 1) & setStatus(!status)}> Next </button>
                    </>
                }
    
                {status && deck.cards.length == counter + 1 &&

                    <button type="button" class="m-2 btn btn-success" onClick={handleDone}> <span class="oi oi-check"></span> Done </button>
                }
    
    
            </div>
    
        )
    }

    
}

export default Study;
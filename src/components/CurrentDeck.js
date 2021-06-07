import React, { useEffect, useState } from "react";
import { deleteDeck, deleteCard } from "../utils/api";
import { readDeck, listCards } from "../utils/api"
import { useParams, useHistory } from "react-router-dom"
import CardDisplay from "../components/CardDisplay"


function CurrentDeck() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    const history = useHistory()

    useEffect(() => {
        async function getData() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        getData()
    }, [])


    const handleStudy = () => {
        return history.push(`/decks/${deck.id}/study`)
    }

    function handleDeleteDeck(id) {
        const doesConfirm = window.confirm("Are you sure you want to delete?");
        if (!doesConfirm) return;
        deleteDeck(id)
            .then(() => {
                history.push("/")
            })
            .then((response) => setDeck(response))
            .catch(err => console.error(err));
    }
    function handleDeleteCard(id) {
        const doesConfirm = window.confirm("Are you sure you want to delete?");
        if (!doesConfirm) return;
        deleteCard(id)
            .then(() => {
                window.location.reload()
            })
            .then((response) => setCard(response))
            .catch(err => console.error(err));
    }

    const edit = () => {
        history.push(`/decks/${deckId}/edit`)
    }
    const add = () => {
        history.push(`/decks/${deckId}/cards/new`)
    }

    // const noCards = () => {
    //     if (!deck) {
    //         return <p>You have no cards in this deck</p>
    //     } else {
    //         return null
    //     }
    // }

    return (
        <div class="container">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Current Deck</li>
                    </ol>
                </nav>
            </div>
            <div class="container">
                <h5>{deck?.name}</h5>
                <p>{deck?.description}</p>
                <button type="button" class="btn btn-secondary mr-2" onClick={edit}><span class="oi oi-pencil"></span> Edit</button>
                <button type="button" class="btn btn-primary mr-2" onClick={handleStudy}><span class="oi oi-book"></span> Study</button>
                <button type="button" class="btn btn-primary" onClick={add}><span class="oi oi-plus"></span> Add Cards</button>
                <button type="button" class="btn btn-danger float-right" onClick={() => handleDeleteDeck(deckId)}><span class="oi oi-trash"></span></button>

                <br />
                <br />
                <h2 class="container">Cards</h2>
                <div class="container">
                        {deck.cards?.map((card) => {
                            return ( 
                                <CardDisplay card={card} handleDeleteCard={handleDeleteCard}/>
                                )
                        })}
                </div>
            </div>
           

        </div>


    )
}

export default CurrentDeck;
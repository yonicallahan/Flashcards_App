import React from "react"
import { useHistory } from "react-router-dom"


function HomeDecks( { handleDelete, deck } ) {
    const history = useHistory()
    
  const handleView = () => {
       return history.push(`/decks/${deck.id}`)
   }

   const handleStudy = () => {
    return history.push(`/decks/${deck.id}/study`)
}

    return (
        <div class="container border rounded p-3 mt-1">
            <small class="float-right">{deck.cards.length} cards</small>
            <h5>{deck?.name}</h5>
            <p>{deck?.description}</p>
            <button type="button" class="btn btn-secondary mr-2" onClick={handleView}><span class="oi oi-eye"></span> View</button>
            <button type="button" class="btn btn-primary" onClick={handleStudy}><span class="oi oi-book"></span> Study</button>
            <button type="button" class="btn btn-danger float-right" onClick={() => handleDelete(deck.id)}><span class="oi oi-trash"></span></button>
        </div>
    )
}

export default HomeDecks;
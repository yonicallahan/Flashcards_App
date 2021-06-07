import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import  {createDeck, listDecks}  from "../utils/api"

function NewDeck() {
    const history = useHistory()
    const [deck, setDeck] = useState({})

    useEffect(()=>{
        async function getData() {
            const response = await listDecks()
            setDeck({deckid: response.length + 1})
        }
        getData();
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        createDeck(deck)
            .then(() => {
                history.push('/')
            }).catch((err)=> {
                alert(err)
            }) 
               
    }

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/"><span class="oi oi-home"></span> Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                <h1>Create Deck</h1>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" className="form-control"
                        required placeholder="Deck Name" onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <textarea type="text" name="description" className="form-control"
                        rows="4" required placeholder="Brief description of the deck" onChange={handleChange}></textarea>
                </div>
                <button onClick={() => history.push("/")} type="button" className="btn btn-secondary mr-2" >Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default NewDeck;
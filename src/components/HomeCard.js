import React from "react"
import { useHistory } from "react-router-dom"

function HomeCard() {
    return (
    <div class="container border rounded">
    <div class="row p-3">
        <div class="col">
            <p>*Front*</p>
        </div>
        <div class="col">
            <p>*Back*</p>
        </div>
        <button type="button" class="btn btn-secondary mr-2"><span class="oi oi-pencil"></span> Edit</button>
        <button type="button" class="btn btn-danger mr-2"><span class="oi oi-trash"></span></button>

    </div>
</div>
    )
}
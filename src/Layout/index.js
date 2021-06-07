import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Homie from "../components/Homie"
import NewDeck from "../components/NewDeck"
import { Switch, Route } from "react-router-dom"
import Study from "../components/Study"
import CurrentDeck from "../components/CurrentDeck"
import EditCard from "../components/EditCard"
import EditDeck from "../components/EditDeck"
import AddCard from "../components/AddCard"

function Layout() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/decks/new">
          <NewDeck />
        </Route>

        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>

        <Route exact path="/decks/:deckId">
          <CurrentDeck />
        </Route>

        <Route exact path="/">
          <Homie />
        </Route>

        <Route>
          <div className="container">
            <NotFound />
          </div>
        </Route>

      </Switch>

    </>
  );
}

export default Layout;

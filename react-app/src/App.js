import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import FilteredGames from "./components/FilteredGames";
import SingleGame from "./components/SingleGame";
import ReviewForm from "./components/ReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/games/filtered" >
            <FilteredGames />
          </Route>
          <Route exact path="/reviewform/:gameId" >
            <ReviewForm />
          </Route>
          <Route exact path="/game/:gameId" >
            <SingleGame />
          </Route>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

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
import EditReview from "./components/EditReview";
import DeleteReview from "./components/DeleteReview";
import Cart from "./components/Cart";
import AddItemCart from "./components/AddItemCart";
import ScrollToTop from "./components/ScrollToTop";
import NavigationLandingPage from "./components/NavigationLandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      <ScrollToTop />
      {isLoaded && (
        <Switch>
          <Route exact path="/games/filtered" >
          <Navigation isLoaded={isLoaded} />
            <FilteredGames />
          </Route>
          <Route exact path="/game/cart/add/:gameId" >
          <Navigation isLoaded={isLoaded} />
            <AddItemCart />
          </Route>
          <Route exact path="/deletereview/:gameId" >
          <Navigation isLoaded={isLoaded} />
            <DeleteReview />
          </Route>
          <Route exact path="/editreview/:gameId" >
          <Navigation isLoaded={isLoaded} />
            <EditReview/>
          </Route>
          <Route exact path="/reviewform/:gameId" >
          <Navigation isLoaded={isLoaded} />
            <ReviewForm />
          </Route>
          <Route exact path="/game/:gameId" >
          <Navigation isLoaded={isLoaded} />
            <SingleGame />
          </Route>
          <Route exact path="/" >
          <NavigationLandingPage isLoaded={isLoaded} />
            <LandingPage />
          </Route>
          <Route exact path="/login" >
          <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
          <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Notes from "./components/Notes";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import SingleNote from "./components/SingleNote";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import Notebooks from "./components/Notebooks";
import SingleNotebook from "./components/SingleNotebook";
import EditNotebook from "./components/EditNotebook";
import CreateNotebook from "./components/CreateNotebook";
import ErrorPage from "./components/ErrorPage";
import Tasks from "./components/Tasks";

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
          <Route exact path="/all-tasks">
            <Tasks />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notes/new">
            <CreateNote />
          </Route>
          <Route exact path="/notes/edit">
            <EditNote />
          </Route>
          <Route exact path="/notes/:noteId">
            <SingleNote />
          </Route>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/notebooks">
            <Notebooks />
          </Route>
          <Route exact path="/notebooks/new">
            <CreateNotebook />
          </Route>
          <Route exact path="/notebooks/:notebookId/edit">
            <EditNotebook />
          </Route>
          <Route exact path="/notebooks/:notebookId">
            <SingleNotebook />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/unknown">
            <ErrorPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

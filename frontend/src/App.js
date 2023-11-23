import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudyPage from './components/StudyPage';
// Import your components here

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/studies" component={StudyPage} />
      </Switch>
    </Router>
  );
}

export default App;

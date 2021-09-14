import Header from '../Header/Header';
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {Route, Switch} from "react-router-dom";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Header/>
          <Main/>
          <Footer/>
        </Route>
        <Route path='/movies'>
          <Header pathname='movies'/>
          <Movies/>
          <Footer/>
        </Route>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

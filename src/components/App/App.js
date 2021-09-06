import Header from '../Header/Header';
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {Route} from "react-router-dom";
import Movies from "../Movies/Movies";


function App() {
  return (
    <div className="App">
      <Header />
      <Route path='/movies'>
        <Movies/>
      </Route>
      <Route exact path='/'>
        <Main />
      </Route>
      <Footer />
    </div>
  );
}

export default App;

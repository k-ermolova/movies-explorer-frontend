import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import './Main.css';
import Techs from "../Techs/Techs";

function Main() {
  return (
    <main className='content'>
      <Promo/>
      <AboutProject/>
      <Techs/>
    </main>
  );
}

export default Main;

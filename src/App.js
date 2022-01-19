import './stylesheets/App.css';
import CreditSocials from './components/CreditSocials';
import HeaderFooter from './components/HeaderFooter';
import MainSection from './components/MainSection';
import SideNav from './components/SideNav';
import Favourites from './components/Favourites';

import {useState} from 'react';

function App() {

  const [count, setCount] = useState(10)
  const [loading, setLoading] = useState(false);

  const handleCount = (e) => {
    setCount(e)
  }

  const handleLoading = () => {
    setLoading(!loading)
  }

  return (
    <div className="App">
      <header>
        <HeaderFooter />
        <Favourites/>
      </header>
      <main>
        <SideNav 
          count = {count}
          handleCount = {handleCount}
          handleLoading = {handleLoading}
          />
        <MainSection 
          count = {count}
          loading = {loading}
          handleLoading = {handleLoading}
        />
      </main>
      <footer>
        <HeaderFooter />
        <CreditSocials />
      </footer>
    </div>
  );
}

export default App;

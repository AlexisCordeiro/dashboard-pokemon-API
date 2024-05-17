import React, {useState} from 'react';
import './App.css';
import Sidebar from './components/pages/Slidebar/slidebar';
import PokemonPage from './components/pages/pokemonPage/pokemonPage';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <Sidebar setSelectedPokemon={setSelectedPokemon} />
      <PokemonPage selectedPokemon={selectedPokemon} />
    </div>
  );
}

export default App;
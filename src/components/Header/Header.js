
import logoImg from '../../assets/images/pokemon.svg';
import './index.scss';


export const Header = () => {
  return (
    <div className="header">
      <p>
        Refatorando Pokemons !
      </p> 
      
      <div >
        <img src={logoImg} alt= "Olá" />
      </div>

    </div>
    
  );
}


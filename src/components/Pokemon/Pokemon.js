
import {useEffect, useState} from "react";
import './index.scss';
export const Pokemon = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonData, setPokemonData] = useState({});
    const [storagePokemon, setStoragePokemon] = useState([]);

    
    console.log(storagePokemon);

    useEffect( () =>{
        loadPokemonList();
    }, []);


    const loadPokemonList = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const data = await response.json();

        const pokemonData = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            results : data.results,
        } 

        setPokemonList(pokemonData.results);
        setPokemonData(pokemonData);
        

    }

    const nextPokemonList = async () => {
        const url = pokemonData.next;
        if(url === undefined){
            return;
        }
        const response = await fetch(url)
        const data = await response.json();
        const pokemonsData = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            pokemons : data.results,
        }
        setPokemonData(pokemonsData);
        setPokemonList(pokemonsData.pokemons);  
        
    }

    const previousPokemonList = async () =>{
        const url = pokemonData.previous;
        if(url === undefined){
            return;
        }
        const response = await fetch(url)
        const data = await response.json();
        const pokemonsData = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            pokemons : data.results,
        }
        setPokemonData(pokemonsData);
        setPokemonList(pokemonsData.pokemons);  
        
    }

    const addPokemon = (indice)=>{
        if(storagePokemon.includes(pokemonList[indice])){
            alert('Pokemon já capturado');
            return;
        }
        setStoragePokemon([...storagePokemon, pokemonList[indice]]);
    }

    const removePokemon = (item) =>{

        const mypokemons = [...storagePokemon];
        const newmypokemons = mypokemons.filter(p => p !== item)

        if(!mypokemons.includes(item)){
            alert('Pokemon não capturado');
            return; 
        }
        setStoragePokemon(newmypokemons);
       

    }
        


    return (
        <div className= "pokemon-card">
           {pokemonList.map((p,idx)=>{
                return(
                    <ul key={idx}>
                        <li>
                            {p.name} <button onClick={()=>{addPokemon(idx)}}>Capturar Pokemon</button> <button onClick={()=>{removePokemon(p)}}>Soltar Pokemon</button>
                        </li>
                    </ul>
                              
                )

            })}
            <button onClick={previousPokemonList}>Previous</button>
            <button onClick={nextPokemonList}>Next</button>
            
        </div>
        
    );



}
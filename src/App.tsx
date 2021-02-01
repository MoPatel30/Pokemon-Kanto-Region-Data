import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "./axios"



function App() {
  const [randomData, setData] = useState<any>([])


  function fetchData(){
    axios.get("/")
      .then((response: any) => {

        parseData(response.data.pokemon_entries)
        console.log(response)
      })
      .catch((err: string) => {
        console.log(err)
      })
  }


  function parseData(pokemons: any[]){
    let names = []

    for(let i = 0; i < pokemons.length; i++){
      names.push(pokemons[i].pokemon_species.name)
    }

    axios.get("/pokemon")
    .then((response: any) => {
      console.log(response)
    })
    .catch((err: string) => {
      console.log(err)
    })

    setData(names)

  }


  useEffect(() => {

    fetchData()

  }, [])


  return (
    <div>

      <h1>Typescript/Go Project</h1>  

      {
      randomData.map((name: any) => (
        <div>
          <Pokemon key = {name} name = {name} />
        </div>
      ))
      }

    </div>

  )
}


export default App;



export function Pokemon(name: any){
  return(
    <div>
      <p>{name.name}</p>
    </div>
  )
}


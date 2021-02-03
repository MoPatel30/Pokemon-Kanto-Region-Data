import React, {useEffect, useState} from 'react'
import "./Pokemon.css"
import axios from "./axios"


function Pokemon() {
    const [abilities, setAbilities] = useState<any>([])
    const [name, setName] = useState<string | undefined>(undefined)
    const [img, setImg] = useState<string | undefined>(undefined)
    const [baseExp, setBaseExp] = useState<string | undefined>(undefined)
    const [pokemon, setPokemon] = useState<string>("")


    function grabPokemonData(){
        axios.get("/", {params: {name: "squirtle"}})
            .then((response: any) => {
                setAbilities(response.data.abilities)
                setName(response.data.name)
                setBaseExp(response.data.base_experience)
                setImg(response.data.sprites.front_default)

                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function findNewPokemon(){
        axios.get("/", {params: {name: pokemon}})
        .then((response: any) => {
            setAbilities(response.data.abilities)
            setName(response.data.name)
            setBaseExp(response.data.base_experience)
            setImg(response.data.sprites.front_default)

            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })     
    }

    useEffect(() => {
        grabPokemonData()
    }, [])


    return (
        <div className = "main">
         
            <div className = "header">
                <h1 style = {{color: "whitesmoke"}}>Pokemon Tracker</h1>
                <img style = {{width: "50px", height: "50px"}} src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F53%2FPok%25C3%25A9_Ball_icon.svg%2F1026px-Pok%25C3%25A9_Ball_icon.svg.png&f=1&nofb=1" /> 
            </div>

            <div className = "card">
                <h1>{name}</h1>
                <h6>Base experience: {baseExp}</h6>
                <div>
                    <img src = {img} alt= {name} />
                </div>

                <div style = {{textAlign: "center"}}>
                    <h4><u>Abilities</u></h4>

                    {
                        abilities.map((ability: any) => (
                            <h6>{ability.ability.name}</h6>
                        ))
                    }

                </div>
                

            </div>

            <div className = "form"> 
                <input type = "text" placeholder = "Pokemon Name" onChange = {(e) => setPokemon(e.target.value)}></input>
                <button onClick = {findNewPokemon} type = "submit">Search</button>
            </div>

        </div>
    )
}

export default Pokemon

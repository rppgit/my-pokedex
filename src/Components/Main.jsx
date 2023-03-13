import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";


import './style.css'
import { getEvolutionChainData, getPokemonDataByName, getPokemonSpecies } from "../pokeapi";
import { Grid } from "@mui/material";

const Main = () => {
    const [pokeData , setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

    const pokeFunc = async() => {
        const res = await axios.get(url);

        // setNextUrl(res.data.next);
        // setPrevUrl(res.data.previous);
        await getPokemonData(res.data.results);
        setLoading(false);

        // if (res.data.previous != null) {
        //     setDisable(false);
        // } else {
        //     setDisable(true);
        // }
    }

    const getPokemonData = async(res) => {
        res.map(async(item)=>{
            const result =  await axios.get(item.url);
            const desc = await getPokemonDesc(result.data.name);
            const evolutionChain = await getEvolutionChain(result.data.id);
            result.data = {
                ...result.data,
                description: desc.description,
                descriptionMin: desc.descriptionMin,
                evolutionChain
            }
            setPokeData(state => {
                state = [...state,result.data]
                state.sort((a,b) => a.id>b.id?1:-1)
                return state;
            })
        })
    }

    const getPokemonDesc = async(name) => {
        const res = await getPokemonSpecies(name);
        if(res) {
            const desc = res?.flavor_text_entries?.slice(1)?.reduce((a, c) => a += c.language.name === "en" ? c.flavor_text + " " : "", "");
            const descArr = desc?.split(" ");
            return {
                description: descArr.length > 80 ? desc.slice(81) : "",
                descriptionMin: descArr.length > 80 ? descArr.slice(0, 80).join(" ") : desc
            };
        }
    }

    const getEvolutionChain = async(id) => {
        const res = await getEvolutionChainData(id);
        let names = [];
        let data = [];
        if(res && res.chain) {
            names.push(res.chain?.species?.name);
            chainRecursive(res.chain?.evolves_to[0], names);
        }
        if (names.length > 0) {
            const promises = names.map(n => getPokemonDataByName(n));
            for await (const res of promises) {
                if(res) {
                    data.push({
                        id: res?.id,
                        name: res?.name,
                        avatar: res?.sprites?.front_default,
                        types: res?.types
                    });
                }
            }
        }
        return data;
    }

    const chainRecursive = async(ev, names) => {
        if(!ev) {
            return;
        }
        names.push(ev?.species?.name);
        chainRecursive(ev.evolves_to[0], names);
    }

    useEffect(() => {
        pokeFunc();
    }, [])

    return(
        <>
            <div className="container">
                <Grid container className="mt-4 mb-4">
                    <p className="display-5 fw-semibold">Pokédex</p>
                    <div className="vl mx-3 mt-3"></div>
                    <p className="h4 mt-3 fw-normal">Search for any Pokémon that exists on the planet</p>
                </Grid>
                <Card pokemon={pokeData} loading={loading}></Card>          
            </div>
        </>
    )
};

export default Main;
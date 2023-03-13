import React from "react";
import { useEffect, useState, useRef } from "react";
import { Modal, Button, Container, Row, Col, Badge, ProgressBar, Figure } from "react-bootstrap";
import { MdOutlineArrowCircleLeft, MdOutlineArrowCircleRight, MdClose } from 'react-icons/md';
import { BiXCircle, BiRightArrowAlt } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import Filter from "./Filter";
import './style.css';
import {POKEMON_TYPES} from "../types";

const Card = ({pokemon, loading}) => {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchInput, setSearchInput] = useState('');
    const [filterInputData, setFilterInputData] = useState('');
    const [statsData, setStatsData] = useState('');
    
    const [pokeDataToRender, setPokeDataToRender] = useState( !loading ? structuredClone(pokemon) : []);
    const [pokeDetails, setPokeDetails] = useState({});
    const [showDesc, setShowDesc] = useState(false);

    const openPokeInfo = async(res) => {
        setPokeDetails(res);
        handleShow();
    }

    const openDesc = (event) => {
        setShowDesc(true);
    }

    const weakAgainstList = [
        {
            name: "Fighting",
            bg: "light"
        },
        {
            name: "Ground",
            bg: "warning"
        },
        {
            name: "Steel",
            bg: "info"
        },
        {
            name: "Water",
            bg: "secondary"
        },
        {
            name: "Grass",
            bg: "success"
        }
    ]

    const getWeaknesses = (types) => {
        let weaknesses = new Set();
        if(types) {
            for (const type of types) {
                let pokeType = POKEMON_TYPES.find(t => t.name.toLowerCase() === type.toLowerCase());
                if(pokeType) {
                    pokeType.weaknesses.forEach(p => weaknesses.add(p));
                }
            }
        }
        let arr = [...weaknesses].filter(el => !types.includes(el.toLowerCase()));
        return arr.length > 5 ? arr.slice(0, 5) : arr;
    }

    const getStatVal = (name) => {
        return pokeDetails?.stats?.find(s => name === s.stat.name)?.base_stat;
    }

    const showNext = (id) => {
        if(id !== pokemon.length) {
            setPokeDetails(pokemon.find(p => p.id === id + 1));
        }
    }

    const showPrev = (id) => {
        if(id !== 1) {
            setPokeDetails(pokemon.find(p => p.id === id - 1));
        }
    }
    const colours = {
        normal: '#ddcdd0',
        fire: '#ecc2c4',
        water: '#cbd5ed',
        electric: '#e1e2a0',
        grass: '#c0d4c8',
        ice: '#c7d8df',
        fighting: '#fcc1b0',
        poison: '#d0b7ed',
        ground: '##f4d2a6',
        flying: '#b2d2e8',
        psychic: '#dfbecf',
        bug: '#c1e1c8',
        rock: '#c3afa8',
        ghost: '#d8c2d7',
        dragon: '#cadcdf',
        dark: '#c6c5e3',
        steel: '#c1d4ce',
        fairy: '#e4c0cf',
        unknown: '#bfdfdd',
        shadow: '#cacaca'
    };
    
    const bgColor = (type) => {
        const style = {
            backgroundColor: colours[type.toLowerCase()] 
        };
        return style;
    }

    const getGrad = (types) => {
        if(!types) return;
        const gradient = {
            background: `linear-gradient(${colours[types[0].type.name]},
            ${types[1]?.type?.name? colours[types[1]?.type?.name] : colours[types[0].type.name]})`, 
            border: "dotted 2px",                         
        }
        return gradient;
      };
    

    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Body className="poke-content pt-5">
                    {pokeDetails && 
                    <Container>
                    {/* Title, desc */}
                    <Row className="text-start card-top">
                        <Col className="col-sm-3">
                            <div className="card poke-card-2 poke-card-gradient" style={getGrad(pokeDetails.types)}>
                                <img className="card-img-top" height="225" src={pokeDetails?.sprites?.front_default} alt="Card image cap"></img>
                            </div>
                        </Col>
                        <Col className="col-sm-9">
                            <div className="form-group row">
                                <p className="col-sm-5 h3 fw-bold text-uppercase">{pokeDetails.name}</p>
                                <div className="vl col-sm-1"></div>
                                <p className="col-sm-2 h3 fw-semibold text-uppercase">{`00${pokeDetails.id}`.slice(pokeDetails?.id?.toString().length-1)}</p>
                                <div className="vl col-sm-1"></div>
                                <div className="col-sm-3"> 
                                    <Button onClick={() => showPrev(pokeDetails.id)} variant="link" className="text-dark p-0 m-0">
                                        <MdOutlineArrowCircleLeft className="h4 fw-light"/>
                                    </Button>
                                    <Button variant="link" onClick={handleClose} className="text-dark p-0 m-0">
                                        <BiXCircle className="h4" />
                                    </Button>
                                    <Button onClick={() => showNext(pokeDetails.id)} variant="link" className="text-dark p-0 m-0">
                                        <MdOutlineArrowCircleRight className="h4"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <p className="h6 fw-normal text-start">
                                    {pokeDetails.descriptionMin}
                                    {pokeDetails.description && <>...</>}
                                    {pokeDetails.description && 
                                        <>
                                            <Button variant="link" onClick={openDesc} className="fw-semibold link-dark pt-0 px-1">
                                                read more
                                            </Button>
                                            <Modal show={showDesc} onHide={() => setShowDesc(false)}  centered size="md" dialogClassName="desc-width" className="desc-height">
                                                <Modal.Body className="desc-bg p-4">
                                                    <Row>
                                                        <Col sm={{span: 1}}></Col>
                                                        <Col sm={{span: 10}}>
                                                            <p className="h6 normal text-light">{pokeDetails.description}</p>
                                                        </Col>
                                                        <Col sm={{span: 1}}>
                                                            <Button size="md" onClick={() => setShowDesc(false)} variant="link" className="text-light">
                                                                <MdClose />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Modal.Body>
                                        </Modal>
                                        </>
                                    }
                                </p>
                                
                            </div>
                        </Col>
                    </Row>
                    {/* height, weight details section */}
                    <Row>
                        <Col className="text-left">
                            <p className="h6 fw-semibold">Height</p>
                        </Col>
                        <Col className="text-left fw-semibold">Weight</Col>
                        <Col className="text-left fw-semibold">Gender(s)</Col>
                        <Col className="text-left fw-semibold">Egg Groups</Col>
                    </Row>
                    <Row style={{'paddingTop': "5px"}}>
                        <Col className="text-left">
                            <p className="h6">{pokeDetails.height}</p>
                        </Col>
                        <Col className="text-left">
                            <h6>{pokeDetails.weight}</h6>
                        </Col>
                        <Col className="text-left">
                            <h6>Male, Female</h6>
                        </Col>
                        <Col className="text-left">
                            <h6>Monster</h6>
                        </Col>
                    </Row>

                    {/* Ability, types details section */}
                    <Row style={{marginTop: '35px'}}>
                        <Col className="text-left fw-semibold" md={{span: 3}}>Abilities</Col>
                        <Col className="text-left fw-semibold" md={{span: 3}}>Types</Col>
                        <Col className="text-left fw-semibold" md={{span: 6}}>Weak Against(s)</Col>
                    </Row>
                    <Row style={{'paddingTop': "5px"}}>
                        <Col className="text-left text-capitalize" md={{span: 3}}>
                            <p className="h6">{pokeDetails?.abilities?.map(a => a.ability.name).join(", ")}</p>
                        </Col>
                        <Col className="text-left" md={{span: 3}}>
                            {pokeDetails?.types?.map(a => a.type.name).map((type) => 
                                <>
                                    <span className="text-dark badge" style={bgColor(type)}>{type}</span>&nbsp;
                                </>
                            )}
                        </Col>
                        <Col className="text-left" md={{span: 6}}>
                            {getWeaknesses(pokeDetails?.types?.map(a => a.type.name)).map((w) => 
                                <>
                                    <span className="text-dark badge" style={bgColor(w)}>{w}</span>&nbsp;
                                </>
                            )}
                        </Col>
                    </Row>
                    
                    {/* Stats details section */}
                    <div>
                        <div className="p-4 stats-bg mt-5">
                            <p className="text-left h5 fw-semibold mb-4">Stats</p>
                            <Row className="text-start">
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">HP</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("hp")} now={getStatVal("hp")} />
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">Attack</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("attack")} now={getStatVal("attack")} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="text-start">
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">Defence</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("defense")} now={getStatVal("defense")} />
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">Speed</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("speed")} now={getStatVal("speed")} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="text-start">
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">Sp. Attack</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("special-attack")} now={getStatVal("special-attack")} />
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group row">
                                        <p className="col-sm-4 h6 fw-semibold">Sp. Def.</p>
                                        <div className="col-sm-8">
                                            <ProgressBar className="bg-secondary stat-progress-bg mt-1" label={getStatVal("special-defense")} now={getStatVal("special-defense")} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>   
                        </div>
                        {/* Evalution chain */}
                        {pokeDetails?.evolutionChain &&
                            <div>
                                <div className="mt-5 mb-3">
                                    <p className="text-left h5 fw-semibold mb-4">Evalution Chain</p>
                                    <Row>
                                        {pokeDetails?.evolutionChain?.map((d, i) =>
                                            <>
                                                <Col sm={{span: 3}}>
                                                    <div className="card poke-card-2 poke-card-gradient evelution-card-height" style={getGrad(d.types)} key={d.id}>
                                                        <img className="card-img-top card-img" src={d.avatar} alt="Card image cap"></img>
                                                        <div className="card-body">
                                                            <h5 className="card-title poke-name text-capitalize">{d.name}</h5>
                                                            <h5 className="poke-order">{ `00${d.id}`.slice(d.id.toString().length-1) }</h5>
                                                        </div>
                                                    </div>
                                                </Col>
                                                {i !== pokeDetails?.evolutionChain?.length - 1 &&
                                                    <Col sm={{span: 1}} className="center">
                                                        <BiRightArrowAlt className="display-6 fw-normal" />
                                                    </Col>
                                                }
                                            </>
                                        )}
                                    </Row>
                                </div>
                            </div>
                        
                        } 
                    </div>
                    </Container>
                    }
                </Modal.Body>
            </Modal>


             <Row>
                <Col className="col-sm-5 search-width">  <div> <label className="h6 fw-normal mb-0">Search by</label></div></Col>
                <Col className="col-sm-3 type-filter-width"> <div><label className="h6 fw-normal mb-0">Type </label></div></Col>
                <Col className="col-sm-2 filter-width"> <div><label className="h6 fw-normal mb-0">Gender</label></div></Col>
                <Col className="col-sm-1"><div><label className="h6 fw-normal mb-0">Stats</label></div></Col>
                </Row>               
            {/* <label className="h6 fw-normal mb-0">Search by</label> */}
            <div className="form-group has-search container-flex">
                <span className="fa fa-search form-control-feedback">
                    <RiSearch2Line className="search-icon mt-3" />
                </span>
                <input type="text" className="form-control"
                onChange={event => {
                   setSearchInput(event.target.value);
                                
                }}
                placeholder="Search" />
                <div className="menu-option">  
                <MdOutlineArrowCircleRight className="h1"/>
                </div>
              <span   className="search-option" >
              <Filter changeStatsInput={setStatsData} changeFilterInput= {setFilterInputData}/> 
              </span>
            </div>

            <div className="row card-row">
                

                {
                    loading ? <h1>Loading...</h1> :
                    (pokemon).filter((item) => {
                        const typeNameFirst=  item?.types[0]?.type?.name?.charAt(0).toUpperCase() + item?.types[0]?.type?.name?.slice(1);
                            const typeNameSecond=  item?.types[1]?.type?.name?.charAt(0).toUpperCase() + item?.types[1]?.type?.name?.slice(1); 
                       
                        if ((searchInput == "") && (filterInputData.length==0) && (statsData.length==0)) {
                            
                            return item
                        } else{
                            let selectItem = [
                                {selection:false,satisfied:false},
                                {selection:false,satisfied:false},
                                {selection:false,satisfied:false}
                                ];
                          
                            if ( searchInput !==""){
                                selectItem[0].selection=true;
                                if(item.name.toLowerCase().includes(searchInput.toLowerCase())){
                                    selectItem[0].satisfied=true;
                                }
                            }
                            
                              if(filterInputData.length>0){
                                selectItem[1].selection=true;
                                if (((filterInputData.includes(typeNameFirst)) ||
                                (filterInputData.includes(typeNameSecond)))){
                                    selectItem[1].satisfied=true;
                                }
                            }

                            if(statsData.length>0){
                                selectItem[2].selection=true;


                    const data= item.stats.find((statData)=>{
                         return ( statData.stat.name==statsData[0].statName 
                            && (statData.base_stat>statsData[0].StatValue[0] 
                                && statData.base_stat<statsData[0].StatValue[1] ))
                    })

                                if(data) {
                                    selectItem[2].satisfied=true;
                                }

                            }

                            selectItem.find((item)=> item.selection && !item.satisfied)
                           
                            if(!(selectItem.find((item)=> item.selection && !item.satisfied))){
                            return item;
                            }

                            }
                                                     
                      
                    }).map((item) => {
                        const colorCode= "green";
                        const styles = {
                            gradient: {
                              background: `linear-gradient(${colours[item.types[0].type.name]},
                              ${item?.types[1]?.type?.name? colours[item?.types[1]?.type?.name] : colours[item.types[0].type.name]})`, 
                              border: "dotted 2px",                         
                            },
                          };
                        return (
                            // <div className="row">
                                
                                <div className="col-md-3 card-width">
                                    <div className="card poke-card poke-card-gradient fw-normal" style={styles.gradient} key={item.id} onClick={()=> openPokeInfo(item)}>
                                        {/* <p className="card-id">{item.id}</p> */}
                                        <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name text-capitalize">{item.name}</h5>
                                            <h5 className="poke-order">{ `00${item.id}`.slice(item.id.toString().length-1) }</h5>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            // </div>
                            
                        )
                    })
                }
            </div>


            
        </>
        
    )
}

export default Card;
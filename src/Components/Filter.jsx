// import Dropdown from 'react-bootstrap/Dropdown';  
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Input} from 'react-bootstrap';  
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Modal} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { BiXCircle } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


function Filter({changeStatsInput, changeFilterInput}) { 
  const [isChecked, setIsChecked] = useState(true);
  const [filterValue, setFilterValue]= useState('First Dropdown');

  const getPlaceHolder = (placeholderButtonLabel, value) => {
    let placeholder = placeholderButtonLabel;
    if (value && Array.isArray(value) && value.length > 0) {
      placeholder = value[0].label;
      if(value.length > 1) {
        placeholder += ` + ${value.length - 1} More`;
      }
    }
    return placeholder;
  }
            
 const type_options=  [{
    "id": 1,
    "value": "Normal",
    "label": "Normal"
  },
   {
    "id": 2,
    "value": "Fighting",
    "label": "Fighting"
  },
  {
    "id": 3,
    "value": "Flying",
    "label": "Flying"
  },
  {
    "id": 4,
    "value": "Poison",
    "label": "Poison"
  },
  {
    "id": 5,
    "value": "Ground",
    "label": "Ground"
  },
  {
    "id": 6,
    "value": "Rock",
    "label": "Rock"
  },
  {
    "id": 7,
    "value": "Bug",
    "label": "Bug"
  },
  {
    "id": 8,
    "value": "Ghost",
    "label": "Ghost"
  },
  {
    "id": 9,
    "value": "Steel",
    "label": "Steel"
  }, 
  {
    "id": 10,
    "value": "Fire",
    "label": "Fire"
  },
  {
    "id": 11,
    "value": "Water",
    "label": "Water"
  },
  {
    "id": 12,
    "value": "Glass",
    "label": "Glass"
  },
  {
    "id": 13,
    "value": "Electric",
    "label": "Electric"
  },
  {
    "id": 14,
    "value": "Psychic",
    "label": "Psychic"
  },
  {
    "id": 15,
    "value": "Ice",
    "label": "Ice"
  },
  {
    "id": 16,
    "value": "Dragon",
    "label": "Dragon"
  },
  {
    "id": 17,
    "value": "Dark",
    "label": "Dark"
  },
  {
    "id": 18,
    "value": "Unknown",
    "label": "Unknown"
  },
  {
    "id": 19,
    "value": "Dragon",
    "label": "Dragon"
  }

];


const gender_options=  [{
  "id": 1,
  "value": "Male",
  "label": "Male"
},
 {
  "id": 2,
  "value": "Female",
  "label": "Female"
},
{
  "id": 3 ,
  "value": "Genderless",
  "label": "Genderless"
}
];

const stats_options=  [{
  "id": 1,
  "value": "hp",
  "label": "HP"
},
 {
  "id": 2,
  "value": "attack",
  "label": "Attack"
},
{
  "id": 3 ,
  "value": "defence",
  "label": "Defence"
},
{
  "id": 4,
  "value": "speed",
  "label": "Speed"
},
 {
  "id": 5,
  "value": "special-attack",
  "label": "Sp.Attack"
},
{
  "id": 6 ,
  "value": "special-defense",
  "label": "Sp. Def"
}
];

  const [typeName, setTypeName] = React.useState([]);
  const [genderName, setGenderName] = React.useState([]);
  const [statName, setStatName] = React.useState([]);
  const [showStatsModal, setStatsShow] = useState(false);
  const handleClose = () => setStatsShow(false);
  const handleShow = () => setStatsShow(true);

  const openPokeStats= ()=>{
    handleShow();
  };

  const handleChangeType = (event) => {
    const {
      target: { value },
    } = event;
   
        setTypeName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    changeFilterInput(value);
  };

  const handleChangeGender = (event) => {
    const {
      target: { value },
    } = event;
    setGenderName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeStats = (event) => {
    const {
      target: { value },
    } = event;
    
    setStatName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 70,
      label: '70',
    },
    {
      value: 150,
      label: '150',
    },
    {
      value: 210,
      label: '210',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }

   const commonStyles = {
    bgcolor: '#EBF8FA',
    
    borderColor: 'text.primary',
    width: '350px',
    height: '1.5rem',
  };

  return ( 
    <>
    <Modal dialogClassName='custom-dialog' show={showStatsModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                down
            >
                <Modal.Header closeButton>
                <div className="starts-header-item"> 
                    <Modal.Title className="text-dark-8 fw-bolder">Select Stats</Modal.Title>
                    {/* <Button variant="link" onClick={handleClose} className=" p-0 m-0">
                                            <BiXCircle className="h4" />
                                        </Button> */}
                 </div>
                </Modal.Header>
                <Modal.Body className= "modal-stats" style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
                <Container>
                {stats_options.map((option)=>(
                  <Row className="stats-slider-item">
                  <Col sm={2}>{option.label}</Col>
                 <Col sm={10}>
                 {/* <span className="border rounded "> */}
                 <Box sx={{ ...commonStyles, width: 370, border: 1, borderRadius: '8px'}}>
  
  
                <Row>
                <Col className="col-sm-1 ">
                  <div className="stats-slider-start">0</div>
                  </Col>
                  <Col className="col-sm-9 stats-slider ">
                 <Slider
                  size="small" 
                  className="slider-color"
                  getAriaValueText={valuetext}
                  defaultValue={[70, 150]}
                  // marks={marks}
                  aria-label="Always visible"
                  step={10}
                  // value={[70, 150]}
                  valueLabelDisplay="auto"
                  min={0}
                  max={210}
                  getAriaLabel={() => 'Temperature'}
                  color="secondary"
                  onChange={(event)=>{
                    console.log('stats value',[{
                      statName: option.value,
                      StatValue: event.target.value
                    }]);
                    changeStatsInput ([{
                      statName: option.value,
                      StatValue: event.target.value
                    }])
                  }}
          />
          </Col>
          <Col className="col-sm-2 stats-slider-end">
           <div className="stats-slider-end fs-10">210</div>
           </Col>
          </Row> 
      </Box>
      {/* </span> */}
  
                 </Col>
                 </Row >
                ))}
                
               
          
               </Container>         
                </Modal.Body>
                <Modal.Footer>
                <Button className= "stats-button-item" variant="outline-dark" size="sm" onClick={handleClose} >Reset</Button>   
                <Button className= "stats-button-item" variant="dark" size="sm" onClick={handleClose}>Apply</Button>
                </Modal.Footer>
            </Modal>




                  
    <div className="container-flex">
  
      <FormControl sx={{ width: 202 }}>
        <Select
          // labelId="demo-multiple-checkbox-label"
          // id="demo-multiple-checkbox"
          multiple
          className="select-bg"
          displayEmpty
          value={typeName}
          onChange={handleChangeType}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected && Array.isArray(selected) && selected.length === 0) {
              return 'Select Type';
            }
            else if ( selected && Array.isArray(selected) &&  selected.length === 1){
              return selected;
            }
            return `${selected[0] } + ${selected.length - 1} More`;
            
            selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {type_options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              <Checkbox checked={typeName.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      

      <FormControl sx={{ width: 200 }}>
        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
        <Select
          // labelId="demo-multiple-checkbox-label"
          // id="demo-multiple-checkbox"
          className="select-bg"
          multiple
          displayEmpty
          value={genderName}
          onChange={handleChangeGender}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected && Array.isArray(selected) && selected.length === 0) {
              return 'Select Gender';
            }
            else if ( selected && Array.isArray(selected) &&  selected.length === 1){
              return selected;
            }
            return `${selected[0] } + ${selected.length - 1} More`;
            
            selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {gender_options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              <Checkbox checked={genderName.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl sx={{ width: 200 }}>
        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
        <Select
          // labelId="demo-multiple-checkbox-label"
          // id="demo-multiple-checkbox"
          className="select-bg"
          multiple
          displayEmpty
          value={statName}
          onChange={handleChangeStats}
          onClick={()=>{ openPokeStats();
                        console.log('clicked');
                      }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected && Array.isArray(selected) && selected.length === 0) {
              return 'Select Stats';
            }
            else if ( selected && Array.isArray(selected) &&  selected.length === 1){
              return selected;
            }
            return `${selected[0] } + ${selected.length - 1} More`;
            
            selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* {type_options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              <Checkbox checked={personName.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))} */}



        </Select>
      </FormControl>

      
    </div>
   
   
   </>  
  );  
}  
export default Filter;  
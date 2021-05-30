import React from 'react';
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';



export const RadioButtons = ({ setMove }) => {
    //var variant = 'determinate'

    
    return(
        <FormControl component="fieldset">
        <FormLabel component="legend">Select move</FormLabel>
        <RadioGroup row aria-label="gender" name="gender1" onChange={ (e) =>{
            setMove(e.target.value);
            console.log(e.target.value);
        } 
            } >
            <FormControlLabel value="rock" control={<Radio />} label="rock" />
            <FormControlLabel value="paper" control={<Radio />} label="paper" />
            <FormControlLabel value="scissors" control={<Radio />} label="scissors" />
        </RadioGroup>
        </FormControl>
    );
}

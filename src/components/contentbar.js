import React from 'react';
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';


const StyledContent = styled.div`
width: 100%;
background-color: ${props => props.bg};
height: 40px;
border-radius: 5px;
margin: 0px 0 0px 0;
text-align: center;
display: flex;
align-items: center;
`;

const StyledContentText = styled.div`
    width: 90%;
    margin-left: 10px;
    text-align: left;
`

const StyledContentLoading = styled.div`
    width: 10%;
    margin-right: 0px;
`
export const StyledContentBar = (props) => {
    var variant = 'determinate'
    
    return(
        <StyledContent>
            <StyledContentText>
                {props.text}
            </StyledContentText>
            <StyledContentLoading>
                <CircularProgress size='20px' variant={variant} value={props.txProgress}/>
            </StyledContentLoading>

        </StyledContent>
    );
}

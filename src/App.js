
import styled from 'styled-components'
import './App.css'
import { useState, useEffect} from 'react';
//import { CircularProgress, LinearProgress } from '@material-ui/core';
import {StyledContentBar} from './components/contentbar'
import WalletConnectProvider from "@walletconnect/web3-provider";
import {RadioButtons} from './components/Radiobuttons'
import Web3Modal from "web3modal";
import {RPS_GAME_ADDRESS, RPS_GAME_ABI} from './config_contract'


//const contractabi  = require('./abi/abi.json');

//const { abi } = require('./abi/abi.json');
//const contractabi = JSON.parse('./abi/abi.json'); // the ABI


//var fs = require('fs');
//var jsonFile = "./abi/abi.json";
//var parsed= JSON.parse(fs.readFileSync(jsonFile));
//var abi = parsed.abi;
//console.log(contractabi);




//trying to get web3 modal running here
//import Web3Modal from "web3modal";



//----




var Web3 = require('web3');
//var web3 = new Web3();




//Styled components getting defined here

/* const Title = styled.h1`
  color: blue;
  font-size: 100px;
`; */

const Wrapper = styled.section`
  margin-left: auto;
  margin-right: auto;
`;


const Content = styled.div`
  background-color: #F1F1F1;
  padding: 1.5rem;
  margin-top: 4rem;
  border-radius: 15px;
  height: ${props => props.height};
  max-width: 700px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
`;

const Addressbar = styled.div`
  background-color: #F1F1F1;
  padding-top: 0px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 4rem;
  border-radius: 15px;
  height: ${props => props.height};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  align-items: center;
`;


const StyledButton = styled.button`
  background-color: #4399FF;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 20px;
  width: 180px;
  margin-top: 10px;

  &:hover {
    background-color: #1E85FF;
    cursor:pointer;
  }
`;

/* const StyledParagraph = styled.p`
    font-size: 20px;
`; */

/* const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
`; */

/* const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0 20px 0;
  box-sizing: border-box;
`; */

const StyledKey = styled.div`
  width: 100%;
  background-color: #C4C4C4;
  height: 40px;
  border-radius: 5px;
  margin: 40px 0 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
`;



function App() {


  useEffect( () => {
    const init = async => {
      console.log('use effect hook ran');
      //const web3 = new Web3();
    };
    init();
  });


  const [appweb3, setAppweb3] = useState();
  const [appAccount, setAppAccount] = useState();
  //const [keyText, setKeyText] = useState()
  const [move, setMove] = useState("paper")
  const [txresult, setTxresult] = useState("result will be shown here.")

  /* const getBlockNumber = async () => {
    var block = await appweb3.eth.getBlockNumber();
    console.log(block);
    console.log(appweb3.version);
    //console.log(appweb3.provider);
  };  */

  /* const determineLoadingVariant = async (transactionprogress) => {
    console.log('transaction progress prop is:', transactionprogress)
    if (transactionprogress === 0) {
      console.log('tx progress should be 0', transactionprogress)
      return 'determinate'
    }
    else if (transactionprogress === 100) {
      console.log('tx progress should be 100', transactionprogress)
      return 'determinate'
    }
    else {
      console.log('transaction should await to be mined')
      return 'indeterminate'
    }
  } */
/*   var variant = determineLoadingVariant(transactionProgress)
 */


  
  //modal connect
  const loadWeb3Modal = async () => {
    console.log("I have been pressed");
    const provider = await web3Modal.connect();
    //setProvider(provider);

    console.log('waited');
    const web3 = new Web3(provider);

    await setAppweb3(web3);
    var chainId = await web3.eth.getChainId()
    var accounts = await web3.eth.getAccounts();
    await setAppAccount(accounts[0]);
    console.log('chain id is:',chainId);
    console.log('account addr is:',accounts[0]);
};


  var moveCollection = {
    "paper": 1,
    "scissors": 2,
    "rock": 0
  };

  //Interact with rps game
  const sendETHNow = async () => {
    console.log("test if button pushed");


    // loading the contract object 
    console.log(RPS_GAME_ABI);

    const contract = await new appweb3.eth.Contract(RPS_GAME_ABI, RPS_GAME_ADDRESS);
    console.log(contract)
    const tx = contract.methods.playMove(moveCollection[move]).encodeABI();
    //const gasPrice = await appweb3.eth.getGasPrice();
    //const nonce = await appweb3.eth.getTransactionCount(appAccount);
    //console.log(contract)


    contract.events.logOutcome({})
    .on('data', async function(event){
        console.log(event.returnValues);
        setTxresult(`Thanks for playing. Final result: ${event.returnValues.result}`)
        console.log(event.returnValues.result)
    })
    .on('error', console.error);
    


    //initiate transaction
    await appweb3.eth.sendTransaction(
      {
        "from": appAccount,
        "to": RPS_GAME_ADDRESS,

        "data": tx,
      })
      .on('receipt', receipt => console.log("print on receipt"))
      .on('confirmation', (confirmationNumber, receipt) => console.log("print on confirmation"))
      .on('error', (error, receipt) => console.log(error, receipt))
};


  return (
    <Wrapper>
      <Addressbar height='40px'>
        <StyledContentBar text={appAccount}></StyledContentBar>
      </Addressbar>

      <Addressbar height='40px'>
        <StyledContentBar text="Only on kovan testnet - 0xD785a659874B60aB3fB3a25e0FBBDF63f3772Abd"></StyledContentBar>
      </Addressbar>

      <Content height='250px'>
        <p>Login here</p>        
        <div>
          <StyledButton onClick={loadWeb3Modal}>Login</StyledButton>
        </div>
        <StyledKey>
          <StyledContentBar txProgress={0} text={'1. Login - 2. Select move - 3. Send tx'}>
          </StyledContentBar>
        </StyledKey>
      </Content>


      <Content height='300px'>
        <p style={{paddingBottom: '40px'}}>Play rock - paper - scissors</p>        
        <RadioButtons value={move} setMove={setMove}></RadioButtons>
        <div>
          <StyledButton onClick={sendETHNow}>Send move</StyledButton>
        </div>
        <StyledKey>
          <StyledContentBar txProgress={10} text={txresult}></StyledContentBar>
        </StyledKey>
      </Content>
    </Wrapper>
  );
}

const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  //cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'OUT OF SCOPE',
      },
    },
  },
});

export default App;

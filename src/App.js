import React, {useEffect, useReducer} from 'react';
import GetWeb3 from './utils/GetWeb3';
import Reducer from './store/Reducer';
import InitialState from './store/InitialState';
import Context from './store/Context';
import AddRecord from './components/AddRecord';
import Sijil from './contracts/Sijil.json';
import Admin from './components/Admin';
import GetRecords from './components/GetRecords';
import {Container, Message} from 'semantic-ui-react';
import Header from './components/Header';
import Verify from './components/Verify';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useEffect(() => {
    const init = async () => {
			// get web3 instance
      const web3 = await GetWeb3();
			
			// get accounts      
			const accounts = await web3.eth.getAccounts();

			// get the contract instance from the blockchain
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Sijil.networks[networkId];      
			const contract = new web3.eth.Contract(
        Sijil.abi,
        deployedNetwork && deployedNetwork.address,
      );
			
			// set the web3 instance to a global variable
      dispatch({type: 'SET_WEB3', payload: web3});

			// set accounts to a global variable
      dispatch({type: 'SET_ACCOUNTS', payload: accounts});
      
			// set the contract instance to a global variable
			dispatch({type: 'SET_CONTRACT', payload: contract});

			// get admin (ministry) address
			contract.methods.ministryOfEducation().call()
				.then(res => {
					let isAdmin = res === accounts[0];
					dispatch({type: 'SET_IS_ADMIN', payload: isAdmin})
				});

			// isApproved
			contract.methods.isApproved(accounts[0]).call()
				.then(res => dispatch({type: 'SET_IS_APPROVED', payload: res}));

			// get records
			contract.methods.getRecords().call()
				.then(res => dispatch({type: 'SET_RECORDS', payload: res}));
    	
			// get institutions
			contract.methods.getInstitutions().call()
			.then(res => dispatch({type: 'SET_INSTITUTIONS', payload: res}));

			// get current pathname
			dispatch({
				type: 'SET_ACTIVE_ITEM',
				payload: window.location.pathname.replace('/', '')
			});
		
		}

		// launch the init function
    init();

		// if the account of metamask change, the accounts will be updated
    window.ethereum.on('accountsChanged', accounts => {
      dispatch({type: 'SET_ACCOUNTS', payload: accounts});
    });
  }, []);

  if (state && !state.loading) {
		return (	
			<Context.Provider value={{state, dispatch}}>
				<Container>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route path='/add'>
							<AddRecord />
						</Route>
						<Route path='/verify'>
							<Verify />
						</Route>
						<Route path=''>
							{
							state.isAdmin ?
							<Admin /> : !state.isApproved ? <Verify /> :
							state.records.length > 0 ? 
								<GetRecords /> : 
								<Message visibel>No records.</Message>
							}
						</Route>
					</Switch>
				</BrowserRouter>
				</Container>
			</Context.Provider>
		);
	} else {
    return (
      <Container>
				<br /><br />
      	<h2>Loading...</h2>
      </Container>
    )
  }
}

export default App;

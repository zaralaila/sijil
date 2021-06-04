import React, {useContext} from 'react';
import Context from '../store/Context';
import {Table, Button} from 'semantic-ui-react';

const GetInstitutions = () => {
  const {state, dispatch} = useContext(Context);

	const approve = async adr => {
		try {
			dispatch({type: 'SET_LOADING', payload: true});
			await state.contract.methods
				.approve(adr)
				.send({from: state.accounts[0]});
		} catch {

		} finally {
			dispatch({type: 'SET_LOADING', payload: false});
		}
	}

	const disapprove = async adr => {
		try {
			dispatch({type: 'SET_LOADING', payload: true});
			await state.contract.methods
				.disapprove(adr)
				.send({from: state.accounts[0]});
		} catch {

		} finally {
			dispatch({type: 'SET_LOADING', payload: false});
		}
	}

  return (
    <Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Institution Name</Table.HeaderCell>
					<Table.HeaderCell>Institution Address</Table.HeaderCell>
					<Table.HeaderCell>Action</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
  		{state.institutions.map(item => {
				return (
					<Table.Row>
						<Table.Cell>{item[2]}</Table.Cell>
						<Table.Cell>{item[1]}</Table.Cell>
						<Table.Cell>
							{item[3] &&
							<Button onClick={() => disapprove(item[1])}>
								Disapprove
							</Button>}
							{!item[3] &&
							<Button onClick={() => approve(item[1])}>
								Approve
							</Button>}
						</Table.Cell>
					</Table.Row>
				)
			})}
			</Table.Body>
    </Table>
  )

}

export default GetInstitutions;

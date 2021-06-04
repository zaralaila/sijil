import React, {useContext} from 'react';
import Context from '../store/Context';
import {Table} from 'semantic-ui-react';

const GetRecords = () => {
  const {state} = useContext(Context);
	
  return (
    <Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Sijil ID</Table.HeaderCell>
					<Table.HeaderCell>Student Name</Table.HeaderCell>
					<Table.HeaderCell>Date Issued</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
  		{state.records.filter(r => r[2] == state.accounts[0]).map(record => {
				return (
					<Table.Row>
						<Table.Cell>{record[6]}</Table.Cell>
						<Table.Cell>{record[1]}</Table.Cell>
						<Table.Cell>{record[7]}</Table.Cell>
					</Table.Row>
				)
			})}
			</Table.Body>
    </Table>
  )

}

export default GetRecords;

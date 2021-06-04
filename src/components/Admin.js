import React, {useState, useContext} from 'react';
import Context from '../store/Context';
import {Form, Button} from 'semantic-ui-react';
import GetInstitutions from './GetInstitutions';

const Admin = () => {
  const {state, dispatch} = useContext(Context);

  const [institution, setInstitution] = useState()
	const [name, setName] = useState();

  const handleInstitutionChange = e => {
    setInstitution(e.target.value);
  }

	const handleNameChange = e => {
		setName(e.target.value);
	}

  const handleSubmit = async e => {
		e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      await state.contract.methods
        .create(name, institution)
        .send({from: state.accounts[0]});
      dispatch({
        type: 'SET_NOTIF',
        payload: {msg: 'institution added.', success: true}
      });
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {msg: error.message, success: false}
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Field>
				<label>Institution Name</label>
      	<input
        	type='text'
        	onChange={handleNameChange}
					placeholder='Institution Name'
        	required />
			</Form.Field>
      <Form.Field>
				<label>Institution</label>
      	<input
        	type='text'
        	onChange={handleInstitutionChange}
					placeholder='Institution Address'
        	required />
			</Form.Field>
			<Button
        type='submit'>
        Submit
      </Button>
    </Form>
		<GetInstitutions />
    </>
  )
}

export default Admin;

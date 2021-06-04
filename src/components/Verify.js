import React, {useRef, useState, useContext} from 'react';
import Context from '../store/Context';
import sha256 from 'crypto-js/sha256';
import {Form, Button} from 'semantic-ui-react';
import RecordVerified from './RecordVerified';

const Verify = () => {
  const {state, dispatch} = useContext(Context);
	const fileInputRef = useRef();
  const [hash, setHash] = useState();

  const handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      setHash(sha256(reader.result).toString());
    }
		document.getElementById('buttonChooseFile')
			.innerHTML = `<i aria-hidden="true" class="file icon"></i>${file.name}`;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', payload: true});
			const record = await state.contract.methods
        .getRecord(hash).call();
			if(record.hash) {
				const index = await state.contract.methods
					.getInstitutionIndex(record.institution).call();
				const institution = await state.contract.methods
					.institutions(index).call();
				const data = [...record];
				data.push(institution.name);
				dispatch({type: 'SET_RECORD_VERIFIED', payload: data});
			} else {
				dispatch({type: 'SET_RECORD_VERIFIED', payload: {msg: 'Unavailable to verify.'}});
			}
      dispatch({
        type: 'SET_NOTIF',
        payload: {msg: 'record added.', success: true}
      });
			const records = await state.contract.methods
				.getRecords().call();
			dispatch({
				type: 'SET_RECORDS',
				payload: records
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
				<label>File</label>
        <input
					ref={fileInputRef}
          type='file'
          hidden
          onChange={handleFileChange}
					required
        />
      	<Button
					id='buttonChooseFile'
          content='Choose File'
          labelPosition='left'
          icon='file'
          onClick={() => fileInputRef.current.click()}
        />
			</Form.Field>
			<Button
        type='submit'>
        Submit
      </Button>
    </Form>
		<br/>
		<RecordVerified />
		</>
  )
}

export default Verify;

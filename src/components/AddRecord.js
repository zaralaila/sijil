import React, {useRef, useState, useContext} from 'react';
import Context from '../store/Context';
import sha256 from 'crypto-js/sha256';
import {Form, Button} from 'semantic-ui-react';

const AddRecord = () => {
  const {state, dispatch} = useContext(Context);
	const fileInputRef = useRef();
  const [hash, setHash] = useState();
  const [studentID, setStudentId] = useState();
	const [studentName, setStudentName] = useState();
	const [programme, setProgramme] = useState();
	const [result, setResult] = useState();
	const [modeOfStudy, setModeOfStudy] = useState();

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

  const handleStudentIdChange = e => {
    setStudentId(e.target.value);
  }

	const handleStudentNameChange = e => {
		setStudentName(e.target.value);
	}

	const handleProgrammeChange = e => {
		setProgramme(e.target.value);
	}

	const handleResultChange = e => {
		setResult(e.target.value);
	}

	const handleModeOfStudyChange = e => {
		setModeOfStudy(e.target.value);
	}

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', payload: true});
			// verify is hash exist
			let isHashExist = await state.contract.methods.isHashExist(hash).call();
			if(!isHashExist) {
				let date_ob = new Date();
 				let year = date_ob.getFullYear();
 				let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
 				let day = ("0" + date_ob.getDate()).slice(-2);
      	let date = `${day}-${month}-${year}`;
				await state.contract.methods
        	.addRecord(studentID, studentName, programme,
						result, modeOfStudy, hash, date)
        	.send({from: state.accounts[0]});
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
			} else {
				dispatch({
					type: 'SET_MESSAGE_HASH_EXIST', 
					payload: 'Doc is already exist.'
				});
			}
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
		{state.messageIfHashExist && <div>{state.messageIfHashExist}</div>}
		<br/>
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
			<Form.Field>
      	<label>Student ID</label>
      	<input
        	type='text'
        	onChange={handleStudentIdChange}
        	required />
      </Form.Field>
			<Form.Field>
      	<label>Student Name</label>
      	<input
        	type='text'
        	onChange={handleStudentNameChange}
        	required />
      </Form.Field>
			<Form.Field>
      	<label>Programme</label>
      	<input
        	type='text'
        	onChange={handleProgrammeChange}
        	required />
      </Form.Field>
			<Form.Field>
      	<label>Result</label>
      	<input
        	type='text'
        	onChange={handleResultChange}
        	required />
      </Form.Field>
			<Form.Field>
      	<label>Mode of study</label>
      	<input
        	type='text'
        	onChange={handleModeOfStudyChange}
        	required />
      </Form.Field>
			<Button
        type='submit'>
        submit
      </Button>
    </Form>
		</>
  )
}

export default AddRecord;

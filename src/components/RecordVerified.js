
import React, {useContext} from 'react';
import Context from '../store/Context';

const RecordVerified = () => {
  const {state} = useContext(Context);

  if (state.recordVerified) {
    if (!state.recordVerified.msg) {
      return (
        <p>
          <div>Student Name : <b>{state.recordVerified[1]}</b></div>
          <div>Student ID : <b>{state.recordVerified[0]}</b></div>
          <div>Institution : <b>{state.recordVerified[8]}</b></div>
          <div>Programme : <b>{state.recordVerified[3]}</b></div>
          <div>Result : <b>{state.recordVerified[4]}</b></div>
          <div>Mode of Study : <b>{state.recordVerified[5]}</b></div>
          <div>Hash : <b>{state.recordVerified[6]}</b></div>
          <div>Issuer Address : <b>{state.recordVerified[2]}</b></div>
          <div>Date Issued : <b>{state.recordVerified[7]}</b></div>
        </p>
      )
    } else {
      return (
        <p>
          <div>{state.recordVerified.msg}</div>
        </p>
      )  
    }
  } else {
    return <></>
  }
}

export default RecordVerified;
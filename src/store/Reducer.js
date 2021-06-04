// CONSTANTS
const SET_NOTIF='SET_NOTIF';
const SET_LOADING='SET_LOADING';
const SET_WEB3='SET_WEB3';
const SET_ACCOUNTS='SET_ACCOUNTS';
const SET_CONTRACT='SET_CONTRACT';
const SET_RECORDS='SET_RECORDS';
const SET_ACTIVE_ITEM='SET_ACTIVE_ITEM';
const SET_RECORD_VERIFIED='SET_RECORD_VERIFIED';
const SET_INSTITUTIONS='SET_INSTITUTIONS';
const SET_MESSAGE_HASH_EXIST='SET_MESSAGE_HASH_EXIST';
const SET_IS_ADMIN='SET_IS_ADMIN';
const SET_IS_APPROVED='SET_IS_APPROVED';

// REDUCER
const Reducer = (state, action) => {
  switch(action.type) {
    case SET_NOTIF:
      return {...state,
        msg: action.payload.msg,
        success: action.payload.success}
    case SET_LOADING:
      return {...state, loading: action.payload}
    case SET_WEB3:
      return {...state, web3: action.payload}
    case SET_ACCOUNTS:
      return {...state, accounts: action.payload}
    case SET_CONTRACT:
      return {...state, contract: action.payload}
    case SET_RECORDS:
			return {...state, records: action.payload}
		case SET_ACTIVE_ITEM:
			return {...state, activeItem: action.payload}
		case SET_RECORD_VERIFIED:
			return {...state, recordVerified: action.payload}
		case SET_INSTITUTIONS:
			return {...state, institutions: action.payload}
		case SET_MESSAGE_HASH_EXIST:
			return {...state, messageIfHashExist: action.payload}
		case SET_IS_ADMIN:
			return {...state, isAdmin: action.payload}
		case SET_IS_APPROVED:
			return {...state, isApproved: action.payload}
		default:
      return state
  }
}

export default Reducer;

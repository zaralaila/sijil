import React, {useContext} from 'react';
import {Menu} from 'semantic-ui-react';
import Context from '../store/Context';
import {Link} from 'react-router-dom';

const Header = () => {
	const {state, dispatch} = useContext(Context);

  const handleItemClick = val => dispatch({
		type: 'SET_ACTIVE_ITEM',
		payload: val
	});

	return (
		<>
		<br/><br/>
    <Menu secondary>
      <Menu.Item>
				<h2>Sijil</h2>
			</Menu.Item>
			{(!state.isAdmin && state.isApproved) &&
			<>
			<Menu.Menu position='right'>
        <Menu.Item
          as={Link}
					to='/'
					name='HOME'
					active={state.activeItem === ''}
          onClick={() => handleItemClick('')}
        />
        <Menu.Item
					as={Link}
					to='/add'
					name='ISSUE PANEL'
          active={state.activeItem === 'add'}
          onClick={() => handleItemClick('add')}
        />
        <Menu.Item
					as={Link}
					to='/verify'
					name='VERIFY'
          active={state.activeItem === 'verify'}
          onClick={() => handleItemClick('verify')}
        />
      </Menu.Menu>
    	</>
			}
		</Menu>
		</>
	)
}

export default Header;

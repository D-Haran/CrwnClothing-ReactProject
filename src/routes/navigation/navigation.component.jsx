import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import {signOutUser} from '../../utils/firebase/firebase.utils.js';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen } = useContext(CartContext)

    return(
      <Fragment>
        <NavigationContainer>
        <LogoContainer to='/'>
            <CrownLogo className='Logo'/>
        </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink> 
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                : (            
                  <Link className='nav-link' to='/auth'>
                  SIGN IN
                  </Link> )
  
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
        </Fragment> 
    )
  }

  export default Navigation
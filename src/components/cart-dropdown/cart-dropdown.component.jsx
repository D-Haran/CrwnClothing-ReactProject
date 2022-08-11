import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import {CartDropdownContainer, EmptyMessage, CartItems,} from './cart-dropdown.styles.jsx';
import  Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


const CartDropdown = () => {
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    const { cartItems } = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length? (cartItems.map(item => (<CartItem key={item.id} cartItem={item} />))) : (
                    <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )
            }
            
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>

    )
}

export default CartDropdown;
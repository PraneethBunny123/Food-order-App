import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/userProgressContext'

export default function Header() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    function handleShowCart() {
        userProgressCtx.showCart()
    }

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='react food'/>
                <h1>Food Order</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}
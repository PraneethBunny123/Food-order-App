import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }

    const totalAmount = cartCtx.items.reduce(
        (totalValue, item) => (
            totalValue + item.price * item.quantity
        ), 0)

    return (
        <Modal open={userProgressCtx.progress === 'checkout'}>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>

                <Input label='Full Name' type="text" id="full-name"/>
                <Input label='Email Address' type="text" id='email'/>
                <Input label='street' type="text" id="street"/>
                <div className="control-row">
                    <Input label='Postal Code' type="text" id='postal-code'/>
                    <Input label='city' type='text' id='city'/>
                </div>
                <p className="modal-actions">
                    <Button type='button' textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}
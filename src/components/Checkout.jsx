import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }

    function handleFinish() {
        handleClose()
        cartCtx.clearCart()
        clearData()
    }

    async function checkoutAction(fd) {
        const customerData = Object.fromEntries(fd.entries())

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))

    }

    const totalAmount = cartCtx.items.reduce(
        (totalValue, item) => (
            totalValue + item.price * item.quantity
        ), 0)

    let actions = (
        <>
            <Button type='button' textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if(isSending) {
        actions = <span>Sending order data ...</span>
    }

    if(data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted Successfully</p>
                <p>We will get back to you with more details visa emial in few minutes</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form action={checkoutAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>

                <Input label='Full Name' type="text" id="name"/>
                <Input label='Email Address' type="text" id='email'/>
                <Input label='street' type="text" id="street"/>
                <div className="control-row">
                    <Input label='Postal Code' type="text" id='postal-code'/>
                    <Input label='city' type='text' id='city'/>
                </div>

                {error && <Error title='Failed to submit order' message={error}/>}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}
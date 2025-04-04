import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";

export default function Checkout() {
    const cartCtx = useContext(CartContext)

    const totalAmount = cartCtx.items.reduce(
        (totalValue, item) => (
            totalValue + item.price * item.quantity
        ), 0)

    return (
        <Modal>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
            </form>
        </Modal>
    )
}
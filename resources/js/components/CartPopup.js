import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { closingCart, removeItem } from "../actions/allActions";

/**
 * FIXME: Fix a bug when when the cart popup is open and you clock on the cart button the cart will close,
 * but when you click again the cart doesn't open until you click on somewhere else on the screen
 */
class CartPopup extends Component {
    //
    handleRemoveItem = e => {
        this.props.removeItem(e.target.getAttribute("data-index"));
    };
    handleOpenModal = elem => {
        elem.open();
    };
    componentDidMount() {
        var elems = document.querySelectorAll(".modal");
        var instances = M.Modal.init(elems, {});
        document
            .querySelector(".checkout")
            .addEventListener(
                "click",
                this.handleOpenModal.bind(null, instances[0])
            );
    }
    componentDidUpdate() {
        if (this.props.globalState.isCartOpen) {
            const cartPopupElement = document.getElementById("cart-popup");
            const openCartEvent = event => {
                var clickedInside = cartPopupElement.contains(event.target);
                if (clickedInside) {
                    console.log("You clicked in side");
                } else {
                    this.props.closingCart();
                    document.removeEventListener("click", openCartEvent);
                    console.log("You cliked outside");
                }
            };
            document.addEventListener("click", openCartEvent);
        }
    }
    render() {
        return (
            <section
                id="cart-popup"
                className={this.props.globalState.isCartOpen ? "active" : ""}
            >
                <div>
                    <div className="cart-title">
                        <div className="title">My Cart</div>
                    </div>
                </div>
                <div className="cart-items">
                    <div className="item-container">
                        {this.props.globalState.cartItems.map((item, indx) => {
                            return (
                                <div key={indx} className="item">
                                    <img src={item.imgRoute} alt={item.name} />
                                    <div className="delete-btn">
                                        <div
                                            data-index={indx}
                                            className="circle"
                                            onClick={this.handleRemoveItem}
                                        >
                                            X
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="product-total">
                    <div className="title">Total</div>
                    <div className="number">
                        x{this.props.globalState.cartItems.length}
                    </div>
                </div>
                <div className="price-total">
                    <div className="title">Total</div>
                    <div className="number">
                        ${this.props.globalState.totalPrice}
                    </div>
                </div>
                <div className="checkout">
                    <div className="title modal-trigger">Checkout</div>
                    <span className="ti-shopping-cart" />
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(
    mapStateToProps,
    {
        closingCart,
        removeItem
    }
)(CartPopup);

import React from 'react';
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import "./CheckOut.css";
import { useStateValue } from './StateProvider';

function CheckOut() {
    const [{ basket, user }, dispatch] = useStateValue();
    
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                className="checkout__ad"
                alt="add"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/GiftCards/CorpGCPages/InterMiles_Banner_PC.jpg"
                />

                <div>
                     <h3>hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your shopping Basket</h2>

                    {basket.map(item => (
                         <CheckoutProduct 
                            id ={item.id}
                            title={item.title}
                            image= {item.image}
                            price={item.price}
                            rating={item.rating}
                         />
                    ))}
                  
                   
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
            
        </div>
    )
}

export default CheckOut

import React, { useState, useEffect  } from 'react'
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from "./axios";
import { db }from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    
    const stripe = useStripe();
    const elements = useElements();
    const[succeeded, setSucceeded] = useState(false);
    const[processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const[disabled, setDisabled] = useState(true);
    const[clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
       //it generate the stripe secret which allows us tocharge a customer

       const getClientSecret = async() => {
           const response = await axios({
               method: 'post',
               //stripes expects the total in a currencies subunits
               url: `/payments/create?total=${getBasketTotal(basket) * 100 }`
           });
           setClientSecret(response.data.clientSecret);
       }
       getClientSecret();
    }, [basket])

    console.log('THE secret is >>>>', clientSecret)

    const handleSubmit = async (event) => {
      //do all the fancy stripe stuff
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement)
          }
      }).then(({paymentIntent }) => {
          //paymentIntent = paymentConformation

          db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id)
          .set({
              basket:basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
          })
        setSucceeded(true);
        setError(null)
        setProcessing(false)

        dispatch({
            type: "EMPTY_BASKET"
        })

        history.replace('/orders')

      })
    }
    const handleChange = event => {
        //listen for changes in the cardElement
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(
                        <Link to ="/checkout">{basket?.length} items </Link>
                        )
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivary Address</h3>
                    </div>
                    <div className="payment__adress">
                       <p>{user?.email}</p>
                       <p>123 willowgrove ln</p>
                       <p>losangles. CA</p>
                       <p>UnitedStatesAmerica</p>
                    </div>

                </div>
                <div className="payment__section">
                   <div className="payment__title">
                       <h3>Review items and Delivary</h3>
                   </div> 
                   <div className="payment__items">
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
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__pricecontainer">
                                <CurrencyFormat 
                                  renderText={(value) => (
                                    <h3>OrderTotal: {value}</h3>
            
                                  )}
                                  decimalScale={2}
                                  value={getBasketTotal(basket)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                /> 
                                <button disabled={processing || disabled || succeeded}>
                                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                                </button> 
                            </div>
                                {error && <div>{error}</div>}
                        </form>
                      
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Payment

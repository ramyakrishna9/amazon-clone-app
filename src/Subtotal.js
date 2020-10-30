import React from 'react';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import "./Subtotal.css";
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const history = useHistory();
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className="subtotal">
        
        <CurrencyFormat
          renderText={(value) => (
            <div>
              <p>
                Subtotal ({basket?.length} items) :{" "}
                <strong>{` $ ${getBasketTotal(basket)}`}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains gift.
              </small>
            </div>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousanSeparator={true}
          prefix={"$"}
        />
        <button onClick={e => history.push('/payment')}>Proced to Checkout</button>
      </div>
 
    );
}

export default Subtotal;
import React,{ useEffect } from 'react';
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from  "react-router-dom";
import CheckOut from "./CheckOut";
import Login from "./Login";
import { auth } from "./firebase";
import Payment from "./Payment";
import './App.css';
import { useStateValue } from './StateProvider';
import { loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";


const promise = loadStripe(
  "pk_test_51HPwinGuubKgT8QlUKWMVPobmopXwO9HUkhPP4ohFWxGx1xuMEBBgfpFrP9P4ABJrJZV5wbkq1vjBl9ZY96KZaBI00b2Iximep"
);

function App() {
  const[{}, dispatch] = useStateValue(); 

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>", authUser);

      if(authUser) {
      //the user was logged in
       dispatch({
         type: 'SET_USER',
         user: authUser
       })
      }else {
        //the user was logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
        <Route path="/login">
            <Login />
         </Route>
         <Route path="/orders">
            <Orders />
         </Route>
          <Route path="/checkout">
            <CheckOut />
         </Route>
         <Route path="/payment">
           
           <Elements stripe={promise}>
           <Payment />
           </Elements>
            
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

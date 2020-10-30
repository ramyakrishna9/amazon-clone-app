export const initialState = {
    basket: [],
    user: null,
  };
  
  export const getBasketTotal = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0);
  
  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_BASKET":
        console.log(action);
        // logic for adding item
        return {
          ...state,
          basket: [...state.basket, action.item],
        };

        case 'EMPTY_BASKET':
          return {
            ...state,
            basket: []
          }
        case "REMOVE_FROM_BASKET":
        // console.log(action.id);
        let newBasket = [...state.basket];
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(
            `Can't remove product (id: ${action.id}) is not in the list.`
          );
        }
        return { 
          ...state, 
          basket: newBasket
         };
        break;
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };
      default:
        return { ...state };
        break;
    
  
      
    }
  }
  
  export default reducer;
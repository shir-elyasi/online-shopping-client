import { FETCH_DATA_CART, ADD_TO_CART, CHANGE_QUANTITY, DELETE_PRODUCT, RESET_CART } from './cart.actions';

const initialState = {
    data: []
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA_CART:
            const cartFromLocal = JSON.parse(action.payload);
            return { data: cartFromLocal };

        case ADD_TO_CART: {
            const { product, qty } = action;
            const updatedCartProducts = [...state.data];
            const productsFound = state.data.filter(element => element.id === product.id)
            if (productsFound.length > 0){
                updatedCartProducts.forEach((element) => {
                if(element.id === product.id)
                element.quantity = parseInt(element.quantity) + parseInt(qty);
            })
            }
            else{
                updatedCartProducts.push({...product, quantity: qty});
            }
            return {data: updatedCartProducts};
        }

        case CHANGE_QUANTITY: {
            const { product, qty } = action;
            const updatedCartProducts = [...state.data];
            updatedCartProducts.forEach(element => {
            if(element.id === product.id)
                element.quantity = parseInt(qty);
            });
            return {data: updatedCartProducts};
        }

        case DELETE_PRODUCT: {
            const { product } = action;
            const updatedCartProducts = state.data.filter(element => element.id !== product.id);
            return {data: updatedCartProducts};
        }

        case RESET_CART:
            return {data: []}
      default:
        throw new Error();
    }
};

export { cartReducer, initialState }
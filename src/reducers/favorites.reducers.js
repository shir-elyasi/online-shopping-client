import { FETCH_DATA_FAVORITES } from './favorites.actions';

const initialState = {
    data: []
}

const favoritesReducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA_FAVORITES:
            const favoritesFromLocal = JSON.parse(action.payload);
            return { data: favoritesFromLocal };

      default:
        throw new Error();
    }
};

export { favoritesReducer, initialState }
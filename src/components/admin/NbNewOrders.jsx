import * as React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardWithIcon from './CardWithIcon';


const NbNewOrders = (props) => {

    return (
        <CardWithIcon
            to="/orders"
            icon={ShoppingCartIcon}
            title={'New Orders'}
            subtitle={props.value}
        />
    );
};

export default NbNewOrders;

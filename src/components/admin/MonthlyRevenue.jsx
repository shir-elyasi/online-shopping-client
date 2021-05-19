import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import CardWithIcon from './CardWithIcon';


const MonthlyRevenue = (props) => {
    return (
        <CardWithIcon
            to="/orders"
            icon={DollarIcon}
            title={'Monthly Revenue'}
            subtitle={props.value}
        />
    );
};

export default MonthlyRevenue;

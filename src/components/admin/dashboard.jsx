import React, {useState, useEffect, useCallback} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { subDays } from 'date-fns';

import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import OrderChart from './OrderChart';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const [newOrders, setNewOrders] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        let {data: recentOrders} = await dataProvider.getList('orders', {
            filter: {date_gte: aMonthAgo.toISOString()},
            sort: { field: 'createdAt', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
        recentOrders = recentOrders.filter(order => order.status !== 'cancelled');
        
        const newOrders = recentOrders.length;
        const revenue = recentOrders.reduce((accumulator, order) => {return accumulator + order.totalAmount}, 0);

        setNewOrders(newOrders);
        setRevenue(revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }));
        setRecentOrders(recentOrders);

    }, [dataProvider]);

    useEffect(() => {
        fetchOrders();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps


    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <MonthlyRevenue value={revenue} />
                <VerticalSpacer />
                <NbNewOrders value={newOrders} />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.flex}>
                <MonthlyRevenue value={revenue} />
                <Spacer />
                <NbNewOrders value={newOrders} />
            </div>
            <div style={styles.singleCol}>
                <OrderChart orders={recentOrders} />
            </div>
        </div>
    ) : (
        <>
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={revenue} />
                        <Spacer />
                        <NbNewOrders value={newOrders} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={recentOrders} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
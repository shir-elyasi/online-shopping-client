import * as React from "react";
import { Admin, Resource } from 'react-admin';
import Dashboard from './dashboard';
import { UserList, UserEdit, UserCreate } from './users';
import { ProductList, ProductEdit, ProductCreate } from './products';
import { CouponList, CouponEdit, CouponCreate } from './coupons';
import { OrderList, OrderShow, OrderEdit } from './orders';
import { CategoryList, CategoryCreate } from './categories';
// import { ArticleList, ArticleEdit, ArticleCreate } from './articles';
// import { PostList, PostEdit, PostCreate } from './posts';
// import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider(process.env.REACT_APP_PROXY);

const WebsiteAdmin = () => {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
        <Resource name="categories" list={CategoryList} create={CategoryCreate} icon={CategoryIcon}/>
        <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
        <Resource name="coupons" list={CouponList} edit={CouponEdit} create={CouponCreate} icon={MoneyOffIcon}/>
        <Resource name="orders" list={OrderList} show={OrderShow} edit={OrderEdit} icon={MonetizationOnIcon}/>
        {/* <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={PostIcon}/> */}
        {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} /> */}
    </Admin>
  );

} 

export default WebsiteAdmin;
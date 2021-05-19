import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './css/app.css';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AlertBox from './components/AlertBox';
import Contact from './components/Contact.jsx';
import About from './components/About.jsx';
import Blog from './components/blog/Blog.jsx';
import ArticlePage from './components/blog/ArticlePage.jsx';
import SignUp from './components/authentication/SignUp';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import Profile from './components/authentication/Profile';
import ChangePassword from './components/authentication/ChangePassword';
import PrivateRoute from './components/authentication/PrivateRoute';
import PrivateRouteAdmin from './components/authentication/PrivateRouteAdmin';
import Store from './components/store/Store.jsx';
import ProductPage from './components/store/ProductPage.jsx';
import ShoppingCart from './components/cart-and-payment/ShoppingCart.jsx';
import Payment from './components/cart-and-payment/Payment.jsx';
import Favorites from './components/favorites/Favorites';
import WebsiteAdmin from './components/admin/WebsiteAdmin';
import PageNotFound from './components/PageNotFound.jsx';
import OrderConfirmation from './components/cart-and-payment/OrderConfirmation.jsx';
import { useStore } from './context/StoreContext';
import { useBlog } from './context/BlogContext';



export default function App() {

  const { products } = useStore();
  const { posts } = useBlog();

  return (
      <Router>

        <Header />

        <AlertBox />
        
        <Switch>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRouteAdmin path="/admin" component={WebsiteAdmin} />
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/store" component={Store} />
          <Route path="/contact" component={Contact} /> 
          <Route path="/about" component={About} /> 
          <Route path="/blog" component={Blog} /> 
          <Route path="/cart" component={ShoppingCart} /> 
          <Route path="/payment" component={Payment} /> 
          <Route path="/favorites" component={Favorites} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          
          {products && products.map(product => 
            <Route path={`/${product.name.replace(' ', '_')}`} key={product.id} component={() => 
              <ProductPage product={product} />
            } />
          )}

          {posts && posts.map(post => 
            <Route path={`/posts/${post._id}`} key={post._id}>
                <ArticlePage post={post}></ArticlePage>
            </Route>
          )}
            
          <Route path="*" component={PageNotFound}/>
        </Switch>

        <Footer />        
        
      </Router>
  ); 
}


import { Container } from 'react-bootstrap'
import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom'

import Header from './components/Header'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import MyOrderScreen from './screens/MyOrderScreen' 
import UserListScreen from './screens/UserListScreen' 
import AdminEditUserScreen from './screens/AdminEditUserScreen' 
import ProductListScreen from './screens/ProductListScreen' 
import ProductCreateScreen from './screens/ProductCreateScreen' 
import ProductEditScreen from './screens/ProductEditScreen' 
import OrderListScreen from './screens/OrderListScreen' 
import SubcategoryProductsScreen from './screens/SubcategoryProductsScreen'
import CategoryProductsScreen from './screens/CategoryProductsScreen'
import PageNotFound from './screens/404' 


function App() {
  return (
    <Router>
      <Header />
        <main className="p-y3">
        <Switch>
          
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/subcategory/:id' component={SubcategoryProductsScreen} />
            <Route path='/category/:id' component={CategoryProductsScreen} />
     
            
            <Route path='/product/:pk' component={ProductScreen} />
            
            <Route path='/cart/:pk?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/delivery' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />  
            <Route path='/orders' component={MyOrderScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={AdminEditUserScreen} />
            <Route path='/admin/products' component={ProductListScreen} /> 
            <Route path='/admin/product/create' component={ProductCreateScreen} />  
            <Route path='/admin/product/edit/:pk' component={ProductEditScreen} />  
            <Route path='/admin/orders' component={OrderListScreen} />
            <Route component={PageNotFound} />
          
            



       
          </Switch>
        </main>
      
    </Router>
  );
}

export default App;

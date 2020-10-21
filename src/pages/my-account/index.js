import React from 'react';
import { Router } from "@reach/router";
import Layout from "../../components/layout";
import PrivateRoute from '../../components/privateRoute';
import UserAccount from '../../components/user-account';
import Login from '../../components/login';
import ShowAccount from '../../components/show-account';
import Orders from '../../components/account/orders';
import AddressBook from '../../components/account/address-book';
import OrderDetails from '../../components/order-details';
import AccountSettings from '../../components/account/account-settings';
import Premier from '../../components/account/premier-points';


export default function MyAccount() {
    return (
        <Layout>
            <Router>
                <PrivateRoute path="/my-account/orders" component={UserAccount} />
                <PrivateRoute path="/my-account/show-account" component={ShowAccount}/>
                <PrivateRoute path="/my-account/orders" component={Orders} />
                <PrivateRoute path="/my-account/address-book" component={AddressBook} />
                <PrivateRoute path="/my-account/orders/order-details" component={OrderDetails} />
                <PrivateRoute path="/my-account/account-settings" component={AccountSettings} />
                <PrivateRoute path="/my-account/premier-points" component={Premier} />
                <OrderDetails path="/my-account/orders/order-details/:id"/>
                <Login path="/my-account/signin"/>
            </Router>
        </Layout>
    )
}

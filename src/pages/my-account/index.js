import React from 'react';
import { Router } from "@reach/router";
import Layout from "../../components/layout";
import PrivateRoute from '../../components/privateRoute';
import UserAccount from '../../components/my-account';
import Login from '../../components/login';
import ShowAccount from '../../components/show-account';
import Orders from './orders';
import AddressBook from './address-book';
import OrderDetails from '../../components/order-details';


export default function MyAccount() {
    return (
        <Layout>
            <Router>
                <PrivateRoute path="/my-account" component={UserAccount} />
                <PrivateRoute path="/my-account/show-account" component={ShowAccount}/>
                <PrivateRoute path="/my-account/orders" component={Orders} />
                <PrivateRoute path="/my-account/address-book" component={AddressBook} />
                <PrivateRoute path="/my-account/orders/order-details" component={OrderDetails} />
                <Login path="/my-account/signin" />
            </Router>
        </Layout>
    )
}

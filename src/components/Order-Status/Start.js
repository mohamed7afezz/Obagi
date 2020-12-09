import React ,{useContext,  useState } from 'react'
import { graphql, Link,navigate } from 'gatsby'
import { useLocation } from "@reach/router"
import StartOrderStatus from "./Level-1";
import UserContext from "../../providers/user-provider"
import OrderStatusDetails from './order-status-detail';

const OrderStatus = () => {
    const [level, ordersetLevel] = useState(1);
    const [GetAlldata, setData] = useState({});
    const location = useLocation()
    const { user } = useContext(UserContext)
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    if (user && location.pathname.includes(`/order-status`)) {
      if (typeof window !== "undefined") {
        navigate("/my-account/orders")
      }
  
      return null
    }
    return (
        <>
         {checkDataCondition((level == 1), <StartOrderStatus RequestData={GetAlldata} SetRequestData={setData}  GetLevelorder={ordersetLevel} />)}
         {checkDataCondition((level == 2), <OrderStatusDetails RequestData={GetAlldata} SetRequestData={setData} GetLevelorder={ordersetLevel} />)}
        </>
    )
}

export default OrderStatus
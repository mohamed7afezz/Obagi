import React ,{useContext,  useState } from 'react'
import { graphql, Link,navigate } from 'gatsby'
import { useLocation } from "@reach/router"
import StartOrderStatus from "./Level-1";
import UserContext from "../../providers/user-provider"
import OrderStatusDetails from './order-status-detail';

const OrderStatus = (node) => {
    const [level, ordersetLevel] = useState(1);
    const [GetAlldata, setData] = useState({});
    const location = useLocation()
    const { user } = useContext(UserContext)
    console.log('ash n', node)
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
         {checkDataCondition((level == 1), <StartOrderStatus RequestData={GetAlldata} SetRequestData={setData}  GetLevelorder={ordersetLevel} node={node.node} />)}
         {checkDataCondition((level == 2), <OrderStatusDetails RequestData={GetAlldata} SetRequestData={setData} GetLevelorder={ordersetLevel} node={node.node}/>)}
        </>
    )
}

export default OrderStatus
export const orderStatusQuery = graphql`
    fragment paragraphOrderStatus on paragraph__order_status {
        id
        relationships {
            node__page {
                title
                path {
                    alias
                }
            }
          }
    }`
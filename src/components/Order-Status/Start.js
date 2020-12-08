import React ,{useContext} from 'react'
import { graphql, Link,navigate,useState } from 'gatsby'
import Img from 'gatsby-image'
import Customer from '../customer-care'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import UserContext from "../../providers/user-provider"
import { useLocation } from "@reach/router"
import StartOrderStatus from './Level-1'

const OrderStatus = ({ node }) => {
    const [level, setLevel] = useState(1);
    const location = useLocation()
    const { user } = useContext(UserContext)
    if (user && location.pathname.includes(`/order-status`)) {
        if (typeof window !== "undefined") {
          navigate("/my-account/orders")
        }
    
        return null
      }
    return (
        <>
        
        <StartOrderStatus/>
        </>
    )
}

export default OrderStatus


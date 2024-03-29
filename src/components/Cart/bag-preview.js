import React, { useContext, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import YourBag from "./your-bag"
import CartContext from "../../providers/cart-provider"
import * as ShowBagStyle from "../../assets/scss/components/show-bag.module.scss"
import { GatsbyImage } from "gatsby-plugin-image";
import UserContext from '../../providers/user-provider'


const Showbag = () => {
  const value = useContext(CartContext);
  const notifications = value && value.notifications;
  const hasNotifications = Array.isArray(notifications) && notifications.length;


  return hasNotifications ? (
    <section className="Notify">
      {notifications.map(note => (
        <Notification key={note.id} {...note} />
      ))}
    </section>
  ) : null;
}

const Notification = ({ id, text, type }) => {
  const data = useStaticQuery(graphql`{
  prouduct: file(relativePath: {eq: "product-images/prouduct-thumb.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`)
  const value = useContext(CartContext);
  const removeNotification = value && value.removeNotification;
  const { notif, setNotif } = useContext(UserContext);

  console.log('ash val', value, value &&
    value.state.cart &&
    value.state.cart.numberItems)

  let productsQuantity = value && value.state.cart && value.state.cart.lineItems && value.state.cart.lineItems.physical_items && value.state.cart.lineItems.physical_items.map(item => item.quantity)
  .filter(product => product != undefined)
  .reduce((acc, i) => acc + i, 0)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     removeNotification(id);
  //   }, 7000);
  //   return () => clearTimeout(timer);
  //   // eslint-disable-next-line
  // }, []);

  return (

    <div
      className={notif === false ? "d-block showbag-top" : "d-block"}
      id="Showbag"
      role="dialog"
    >
      <div class="modal-dialog modal-data mr-0 " role="document">
        <div class="modal-content">
          <div className={value.state ? value.state.cart ? value.state.cart.lineItems ? value.state.cart.lineItems.physical_items ? value.state.cart.lineItems.physical_items.length > 0 ? "modal-header show-bag-header" : "modal-header" : "modal-header" : "modal-header" : "modal-header" : "modal-header"}>
            <div
              className={["d-flex", ShowBagStyle.left, "w100"].join(" ")}
            >
              {value.state ? value.state.cart ? value.state.cart.lineItems ? value.state.cart.lineItems.physical_items ? value.state.cart.lineItems.physical_items.length > 0 ? <div
                className={[
                  ShowBagStyle.productCounter,
                  "d-flex",
                  ShowBagStyle.left,
                ].join(" ")}
              >
                <p className={ShowBagStyle.shoppingBag}>
                  Shopping Bag ({productsQuantity})
                </p>
                <Link class={ShowBagStyle.viewcart} to="/cart" onClick={() => { removeNotification(id) }}>
                  View Full Cart
                </Link>
              </div> : "" : "" : "" : "" : ""}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => removeNotification(id)}
              >
                <span aria-hidden="true">&nbsp;</span>
              </button>
            </div>
          </div>
          <div class="modal-body ">
            <YourBag cartType="overlay" notificationId={id} />
          </div>
          {/* <div class="modal-footer">
          <div className={["row", ShowBagStyle.prouductCard].join(" ")}>
            <div className={"col-4"}>
              <Img alt="img" 
                className={ShowBagStyle.prodThumb}
                fluid={data.prouduct.childImageSharp.fluid}
              />
            </div>
            <div className={["col-8", ShowBagStyle.removepadding,"removepadding"].join(" ")}>
              <div className={"col-12"}>
                <p className={ShowBagStyle.BagProductDesc}>
                  Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum
                  Dolor Sit Amet Consectetur
                </p>
              </div>
              <div
                className={["col-12", "d-flex", ShowBagStyle.left].join(
                  " "
                )}
              >
                <p className={ShowBagStyle.Price}>$8.00</p>
                <button className={ShowBagStyle.BagProductLink}>Add to Bag</button>
              </div>
            </div>
          </div>

          <div className={["row", ShowBagStyle.prouductCard].join(" ")}>
            <div className={"col-4"}>
              <Img alt="img" 
                className={ShowBagStyle.prodThumb}
                fluid={data.prouduct.childImageSharp.fluid}
              />
            </div>
            <div className={["col-8", ShowBagStyle.removepadding,"removepadding"].join(" ")}>
              <div className={"col-12"}>
                <p className={ShowBagStyle.BagProductDesc}>
                  Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum
                  Dolor Sit Amet Consectetur
                </p>
              </div>
              <div
                className={["col-12", "d-flex", ShowBagStyle.left].join(
                  " "
                )}
              >
                <p className={ShowBagStyle.Price}>$8.00</p>
                <button className={ShowBagStyle.BagProductLink}>Add to Bag</button>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>

  );
};

export default Showbag

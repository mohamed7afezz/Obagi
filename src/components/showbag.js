import React , { useContext,useEffect } from "react"
import { useStaticQuery, graphql,Link } from "gatsby"
import YourBag from "./bag"
import CartContext from "../providers/cart-provider"
import ShowBagStyle from "../assets/scss/components/show-bag.module.scss"
import Img from "gatsby-image"
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
  const data = useStaticQuery(graphql`
  query {
    prouduct: file(
      relativePath: { eq: "product-images/prouduct-thumb.png" }
    ) {
      childImageSharp {
        fluid (quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`)
  const value = useContext(CartContext);
  const removeNotification = value && value.removeNotification;
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 227000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  return (
    
    <div
    class="d-block"
    id="Showbag"
    >
    <div class="modal-dialog modal-data mr-0 " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div
            className={["d-flex", ShowBagStyle.left, "w100"].join(" ")}
          >
            <div
              className={[
                ShowBagStyle.productCounter,
                "d-flex",
                ShowBagStyle.left,
              ].join(" ")}
            >
              <p className={ShowBagStyle.shoppingBag}>
                {" "}
                Shopping Bag (2)
              </p>
              <Link class={ShowBagStyle.viewcart} to="/cart" onClick={() => removeNotification(id)}>
                View Full Cart
              </Link>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => removeNotification(id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="modal-body ">
          <YourBag cartType="overlay"/>
        </div>
        <div class="modal-footer">
          <div className={["row", ShowBagStyle.prouductCard].join(" ")}>
            <div className={"col-4"}>
              <Img
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
                className={["col-12", "d-flex", ShowBagStyle.left ].join(
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
              <Img
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
                className={["col-12", "d-flex", ShowBagStyle.subcontainer].join(
                  " "
                )}
              >
                <p className={ShowBagStyle.Price}>$8.00</p>
                <button className={ShowBagStyle.BagProductLink}>Add to Bag</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        
  );
};

export default Showbag

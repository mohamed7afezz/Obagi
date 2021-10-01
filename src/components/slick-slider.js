import React, { Component } from "react";
import Slider from "react-slick";
import { GatsbyImage } from "gatsby-plugin-image";
export default class AsNavFor extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render(slide1,slide2,slide3,slide4) {
    const {myProp} = this.props;
    return (
      <div>
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
        >
          <div className={ "row" }>
          <img alt="img" src ={slide1}/>
            <img alt="img" src ={slide2}/>
            <img alt="img" src ={slide3}/>
            <img alt="img" src ={slide4}/>
          </div>
        </Slider>
        <h4>Second Slider</h4>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
        >
           <div className={"row" }>
            <img alt="img" src ={this.props.slide1}/>
            <img alt="img" src ={this.props.slide2}/>
            <img alt="img" src ={this.props.slide3}/>
            <img alt="img" src ={this.props.slide4}/>
          </div>
        </Slider>
      </div>
    );
  }
}
import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import lineStyles from '../assets/scss/components/product-lines.module.scss'

const ProductLines = ({ node }) => {


    const [state, setState] = useState({
        nav1: null,
        nav2: null
    });

    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
    }, []);

    const {
        nav1,
        nav2
    } = state;

    const HeroSettings = {
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        afterChange: () =>
            this.setState(state => ({ updateCount: state.updateCount + 1 })),
        beforeChange: (current, next) => this.setState({ slideIndex: next })
    };



    const SliderSetting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                }
            },
        ]
    }


    function slickGoToslide(int) {
        slider1.current.slickGoTo(int);

    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={[lineStyles.wrapper].join(" ")}>
                            <div onClick={() => slickGoToslide(0)} className="active">Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(1)}>ELASTIderm®</div>
                            <div onClick={() => slickGoToslide(2)}>Hydrate®</div>
                            <div onClick={() => slickGoToslide(3)}>KeraPhine®</div>
                            <div onClick={() => slickGoToslide(4)}>Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(5)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(6)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(7)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(8)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(9)}>Daily Hydro-Drops™</div>
                        </div>

                    <div className={lineStyles.progressBar}><div className={lineStyles.progress}></div></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Slider ref={slider => (slider1.current = slider)} {...SliderSetting}>
                            <div className={lineStyles.blue}>Nu-Derm®</div>
                            <div className={lineStyles.green}>ELASTIderm®</div>
                            <div className={lineStyles.red}>Hydrate®</div>
                            <div className={lineStyles.black}>KeraPhine®</div>
                            <div className={lineStyles.purple}>Nu-Derm®</div>
                            <div className={lineStyles.pink}>Daily Hydro-Drops™</div>
                            <div className={lineStyles.grey}>Daily Hydro-Drops™</div>
                            <div className={lineStyles.beige}>Daily Hydro-Drops™</div>
                            <div className={lineStyles.maroon}>Daily Hydro-Drops™</div>
                            <div className={lineStyles.yellow}>Daily Hydro-Drops™</div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductLines
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function MealCarousel(props) {

    const { data } = props;
    
    var carouselPics: any = [];
    for (let i = 0; i < data.length; i++) {
        carouselPics.push(
            <div key={i}>
                <img className='photo' alt='' src={data[i].picture} />
                <p className="legend">{data[i].meal}</p>
            </div>
        )
    }


    return (
        <Carousel dynamicHeight={true}>
           {carouselPics}
        </Carousel>
    )
}
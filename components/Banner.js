import React from 'react';

const Banner = () => {

    return(
        <section className="banner-one" id="banner" style={{backgroundImage: `url(/assets/images/background/banner-bg-1-1.png)`}}>
             {/* <img src="/assets/images/shapes/camera3.png" alt="" className="banner-one__shape-1" /> */}
            <img src="/assets/images/shapes/vr.png" alt="" className="banner-one__shape-2" />

            <img src="/assets/images/shapes/MOVIES.png" alt="" className="banner-one__shape-4" />
            <img src="/assets/images/shapes/banner-shapes-1-5.png" alt="" className="banner-one__shape-5" />
            <img src="/assets/images/shapes/camera3.png" alt="" className="banner-one__shape-6" />
            <img src="/assets/images/shapes/banner-shapes-1-7.png" alt="" className="banner-one__shape-7" />

            <div className="container">
                <img src="/assets/images/shapes/MICROPHONE.png" alt="" className="banner-one__shape-moc-1"/>
                <img src="/assets/images/mocs/room.jpg" alt="" className="banner-one__moc" />
                <div className="row">
                    <div className="col-lg-7">
                        <div className="banner-one__content">
                            <p className="banner-one__tag-line">Creative Hub for Innovators <a href="#">free trial</a></p>
                            <h3>Offices & Digital Studios for  <br/>Creative Innovators</h3>
                            <p>Whether you are a solopreneur or a small business owner <br/> or a large corporation we have a 
                            perfect space for you.</p>
                            <a href="#contact" data-target="#contact" className="thm-btn banner-one__btn scroll-to-target">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    )
}
export default Banner;
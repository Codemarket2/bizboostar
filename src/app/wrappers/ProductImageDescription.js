import React from "react";
import ProductDescriptionInfo from "../components/product/ProductDescriptionInfo";
import Slider from "../components/product/slider/index";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, room }) => {
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <Slider room={room} />
          </div>
          <div className="col-lg-12 col-md-12 mt-5">
            <ProductDescriptionInfo room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageDescription;

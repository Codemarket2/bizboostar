import React from "react";

const FormEmbed = ({
  slug,
  height,
  style,
  scrolling,
  company,
  userid,
  username,
}) => {
  console.log(
    `https://vivekt.unitabiz.com/embbed/forms/${slug}?company=${company}&userid=${userid}&username=${username}`
  );
  return (
    <div style={style}>
      {slug && (
        <iframe
          scrolling={scrolling}
          className="form-embed-scroll"
          style={{
            width: "100%",
            minHeight: height ? height : "500px",
          }}
          src={`https://vivekt.unitabiz.com/embbed/forms/${slug}?company=${company}&userid=${userid}&username=${username}`}
          frameBorder="0"
          allowtransparency="true"
        ></iframe>
      )}
    </div>
  );
};

export default FormEmbed;

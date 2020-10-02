import React from "react";

const FormEmbed = ({ slug, height, style, scrolling }) => {
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
          src={`https://vivekt.unitabiz.com/embbed/forms/${slug}`}
          frameBorder="0"
          allowtransparency="true"
        ></iframe>
      )}
    </div>
  );
};

export default FormEmbed;

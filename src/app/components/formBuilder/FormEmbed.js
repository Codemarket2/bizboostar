import React from "react";

const FormEmbed = ({ slug, height }) => {
  return (
    <div>
      {slug && (
        <iframe
          style={{ width: "100%", height: height ? height : "500px" }}
          src={`https://vivekt.unitabiz.com/embbed/forms/${slug}`}
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
};

export default FormEmbed;

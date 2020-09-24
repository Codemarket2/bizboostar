import React, { useEffect } from "react";
import { connect } from "react-redux";
import { gql } from "@apollo/client";
import { client } from "../../graphql/index";
import { showLoading, hideLoading } from "react-redux-loading";
import { setAllFormData } from "../../redux/actions/formBuilder";
import FormCRUD from "../../components/formBuilder/FormCRUD";
// import NewForm from "../../components/formBuilder/NewForm";
// import UpdateForm from "../../components/formBuilder/UpdateForm";
// import UnAuthorised from "../../components/other/UnAuthorised";

const GET_ALL_FORMS = gql`
  query GetAllForms {
    getAllForms {
      _id
      title
      slug
      published
      formJSON
    }
  }
`;

const Form = (props) => {
  const getRooms = async () => {
    props.dispatch(showLoading());

    client
      .query({
        query: GET_ALL_FORMS,
      })
      .then(({ data }) => {
        props.dispatch(setAllFormData(data.getAllForms));
        props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        props.dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div>
      {props.formBuilder.type === "view" && <FormCRUD />}
      {/* {props.formBuilder.type === "create" && <NewForm />} */}
      {/* {props.formBuilder.type === "update" && <UpdateForm />} */}
    </div>
  );
};

const mapStateToProps = ({ auth, formBuilder }) => {
  return {
    auth,
    formBuilder,
  };
};

export default connect(mapStateToProps)(Form);

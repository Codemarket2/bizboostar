import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { client } from "../../graphql/index";
import TemplateTable from "./TemplateTable";

const Create_Email_Template = gql`
  mutation CreateOneEmailTemplate(
    $userId: String!
    $htmlPart: String!
    $subjectPart: String!
    $templateName: String!
    $textPart: String!
  ) {
    createOneEmailTemplate(
      userId: $userId
      templateName: $templateName
      htmlPart: $htmlPart
      subjectPart: $subjectPart
      textPart: $textPart
    ) {
      _id
      htmlPart
      subjectPart
      templateName
      textPart
    }
  }
`;

const Update_Email_Template = gql`
  mutation UpdateOneEmailTemplate(
    $id: ID!
    $htmlPart: String!
    $subjectPart: String!
    $templateName: String!
    $textPart: String!
  ) {
    updateOneEmailTemplate(
      id: $id
      templateName: $templateName
      htmlPart: $htmlPart
      subjectPart: $subjectPart
      textPart: $textPart
    ) {
      _id
      htmlPart
      subjectPart
      templateName
      textPart
    }
  }
`;

const GET_ALL_EMAIL_TEMPLATES = gql`
  query GetAllEmailTemplatesByUserId($userId: String!) {
    getAllEmailTemplatesByUserId(userId: $userId) {
      _id
      htmlPart
      subjectPart
      templateName
      textPart
    }
  }
`;

const DELETE_ONE_EMAIL_TEMPLATE = gql`
  mutation DeleteOneEmailTemplate($id: ID!, $templateName: String!) {
    deleteOneEmailTemplate(id: $id, templateName: $templateName)
  }
`;

const Email = (props) => {
  const [createOneEmailTemplate] = useMutation(Create_Email_Template);
  const [updateOneEmailTemplate] = useMutation(Update_Email_Template);
  const [deleteOneEmailTemplate] = useMutation(DELETE_ONE_EMAIL_TEMPLATE);

  const [payload, setPayload] = useState({
    templateName: "",
    htmlPart: "",
    subjectPart: "",
    textPart: "",
    disabled: false,
  });
  const [disabled, setDisabled] = useState(false);
  const [allData, setAllData] = useState([]);
  const [edit, setEdit] = useState(false);

  const getData = async () => {
    props.dispatch(showLoading());

    client
      .query({
        query: GET_ALL_EMAIL_TEMPLATES,
        variables: { userId: props.userId },
      })
      .then(({ data }) => {
        setAllData(data.getAllEmailTemplatesByUserId);
        props.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
        props.dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      props.dispatch(showLoading());
      setDisabled(true);
      if (edit) {
        const { data } = await updateOneEmailTemplate({
          variables: {
            id: payload._id,
            templateName: payload.templateName,
            htmlPart: payload.htmlPart,
            subjectPart: payload.subjectPart,
            textPart: payload.textPart,
          },
        });
        setAllData(
          allData.map((r) =>
            r._id === data.updateOneEmailTemplate._id
              ? data.updateOneEmailTemplate
              : r
          )
        );
        alert("Succesfully created new Tempalte");
      } else {
        const { data } = await createOneEmailTemplate({
          variables: {
            userId: props.userId,
            templateName: payload.templateName,
            htmlPart: payload.htmlPart,
            subjectPart: payload.subjectPart,
            textPart: payload.textPart,
          },
        });
        setAllData([...allData, data.createOneEmailTemplate]);
        alert("Succesfully created new Tempalte");
      }
      setPayload({
        templateName: "",
        htmlPart: "",
        subjectPart: "",
        textPart: "",
      });
      props.dispatch(hideLoading());
      setDisabled(false);
    } catch (error) {
      console.log("Error ", error);
      props.dispatch(hideLoading());
      setDisabled(false);
      if (error.message.includes("already exists")) {
        return alert(`Title is already taken`);
      }
      alert(`Something went wrong. Please try again!`);
    }
  };

  const handleDelete = async (r) => {
    try {
      setDisabled(true);
      if (window.confirm("Are you sure you want to delete this item!")) {
        props.dispatch(showLoading());
        await deleteOneEmailTemplate({
          variables: {
            id: r._id,
            templateName: r.templateName,
          },
        });
        setAllData(allData.filter((rr) => rr._id !== r._id));
        setDisabled(false);
        props.dispatch(hideLoading());
      } else {
        return setDisabled(false);
      }
    } catch (error) {
      console.log(error);
      props.dispatch(hideLoading());
      setDisabled(false);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (selected) => {
    setPayload(selected);
    setEdit(true);
  };
  const handleCancelEdit = () => {
    setPayload({
      templateName: "",
      htmlPart: "",
      subjectPart: "",
      textPart: "",
    });
    setEdit(false);
  };

  return (
    <div className="py-5 container">
      <h2 className="text-center">CREATE EMAIL TEMPLATE</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="keys"
            placeholder="keys"
            value="Address_line1, emails, business_name, city, keyword, postal_code, state, website_link"
            disabled={true}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="templateName"
            placeholder="Template Name"
            value={payload.templateName}
            onChange={(e) =>
              setPayload({ ...payload, templateName: e.target.value })
            }
            disabled={edit}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="subjectPart"
            placeholder="Subject eg Offer for you guys in {{city}}"
            value={payload.subjectPart}
            onChange={(e) =>
              setPayload({ ...payload, subjectPart: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="htmlPart"
            placeholder="HTML Body eg <h1>Hello </h1><p>I heard you are from {{city}}</p>"
            value={payload.htmlPart}
            onChange={(e) =>
              setPayload({ ...payload, htmlPart: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="textPart"
            placeholder="Text Body eg Hello Guys I heard you are from {{city}}"
            value={payload.textPart}
            onChange={(e) =>
              setPayload({ ...payload, textPart: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button
          style={{ pointerEvents: disabled ? "none" : "auto" }}
          type="submit"
          color="primary"
          block
        >
          {disabled ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : edit ? (
            "Update Template"
          ) : (
            "Create Template"
          )}
        </Button>
        {edit && (
          <Button
            style={{ pointerEvents: disabled ? "none" : "auto" }}
            type="button"
            color="danger"
            onClick={handleCancelEdit}
            block
          >
            Cancel
          </Button>
        )}
      </Form>
      <TemplateTable
        allData={allData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        disabled={disabled}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(Email);

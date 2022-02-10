import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  FormWrapper, FieldWrapper, Label, StyledErrorMessage,
} from '../../atom/Form';
import { AddButton } from '../../atom/Button';

const initialValue = {
  title: '',
  link: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('Required'),
  link: Yup.string()
    .url('Not A Valid URL')
    .required('Required'),
});

const AddNewLink = () => {
  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FieldWrapper>
            <Label>Title</Label>
            <Field
              name="title"
              type="text"
              required
              autoComplete="off"
            />
            <ErrorMessage
              name="title"
              render={(msg) => (
                <StyledErrorMessage>
                  *{msg}
                </StyledErrorMessage>
              )}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Link</Label>
            <Field
              name="link"
              type="text"
              required
              autoComplete="off"
            />
            <ErrorMessage
              name="link"
              render={(msg) => (
                <StyledErrorMessage>
                  *{msg}
                </StyledErrorMessage>
              )}
            />
          </FieldWrapper>

          <AddButton type="submit">Add Link</AddButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default AddNewLink;

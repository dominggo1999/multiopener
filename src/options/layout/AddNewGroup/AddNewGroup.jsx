import React, { useContext, useRef, useEffect } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
  FormWrapper, FieldWrapper, Label, StyledErrorMessage,
} from '../../atom/Form';
import { AddButton } from '../../atom/Button';
import { ListContext } from '../../context/List.context';

const initialValue = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('Required'),
});

const AddNewGroup = () => {
  const { addGroup } = useContext(ListContext);
  const history = useHistory();
  const inputRef = useRef();

  const handleSubmit = (val) => {
    addGroup(val);
    history.push('/');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <FormWrapper>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FieldWrapper>
            <Label>Name</Label>
            <Field
              name="name"
              type="text"
              required
              autoComplete="off"
              innerRef={inputRef}
            />
            <ErrorMessage
              name="name"
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

export default AddNewGroup;

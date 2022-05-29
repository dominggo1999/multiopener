import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import {
  FormWrapper, FieldWrapper, Label, StyledErrorMessage,
} from '../../atom/Form';
import { AddButton } from '../../atom/Button';
import { ListContext } from '../../../context/List.context';
import Link from '../../atom/RouterLink';
import Select from '../../atom/Select/Select';

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
  const { addGroup, links } = useContext(ListContext);
  const history = useHistory();
  const inputRef = useRef();
  const [children, setChildren] = useState([]);

  const handleSubmit = (val) => {
    addGroup(val, children);
    history.push('/');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChildrenChange = (choosenLinks) => {
    setChildren(choosenLinks);
  };

  return (
    <>
      <Link to="/">
        <AddButton>
          <BiArrowBack />
          Back
        </AddButton>
      </Link>
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
                spellCheck={false}
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
            <FieldWrapper>
              <Label>Add to group <i>(optional)</i> </Label>
              <Select
                value={children}
                options={links}
                valueKey="id"
                labelKey="title"
                handleChange={handleChildrenChange}
                name="add link to group picker"
                isMulti
                isSearchable
              />
            </FieldWrapper>

            <AddButton type="submit">Add Group</AddButton>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
};

export default AddNewGroup;

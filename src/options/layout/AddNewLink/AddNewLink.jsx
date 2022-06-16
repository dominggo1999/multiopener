import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import {
  FormWrapper, FieldWrapper, Label, StyledErrorMessage,
} from '../../atom/Form';
import { AddButton } from '../../atom/Button';
import Link from '../../atom/RouterLink';
import { ListContext } from '../../../context/List.context';
import Select from '../../atom/Select/Select';
import { urlValidation, queryValidation } from '../../../util';

const initialValue = {
  title: '',
  link: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Must be longer than 3 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('Required'),
  link: Yup.string()
    .test('validate url', 'Not a valid url', urlValidation)
    .test('check query', 'URL must includes "iamlazy" to show where the query will be put ', queryValidation)
    .required('Required'),
});

const AddNewLink = () => {
  const inputRef = useRef();
  const { addLink, groups } = useContext(ListContext);
  const [parentGroups, setParentGroups] = useState([]);
  const history = useHistory();

  const handleSubmit = (val) => {
    addLink(val, parentGroups);
    history.push('/');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleParentGroupsChange = (choosenGroups) => {
    setParentGroups(choosenGroups);
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
              <Label>Title</Label>
              <Field
                innerRef={inputRef}
                name="title"
                type="text"
                required
                autoComplete="off"
                spellCheck={false}
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
                spellCheck={false}
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

            <FieldWrapper>
              <Label>Add to group <i>(optional)</i> </Label>
              <Select
                value={parentGroups}
                options={groups}
                valueKey="id"
                labelKey="name"
                handleChange={handleParentGroupsChange}
                name="add to groups picker"
                isMulti
                isSearchable
              />
            </FieldWrapper>

            <AddButton type="submit">Add Link</AddButton>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
};

export default AddNewLink;

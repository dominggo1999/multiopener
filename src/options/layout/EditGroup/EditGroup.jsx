import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import {
  FormWrapper, FieldWrapper, Label, StyledErrorMessage,
} from '../../atom/Form';
import { AddButton } from '../../atom/Button';
import { ListContext } from '../../context/List.context';
import Link from '../../atom/RouterLink';
import { storageGet } from '../../../util';

const initialValue = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('Required'),
});

const EditGroup = () => {
  const { groupId } = useParams();
  const { updateGroup } = useContext(ListContext);
  const history = useHistory();
  const inputRef = useRef();
  const [details, setDetails] = useState({
    name: '',
  });

  const handleSubmit = (val) => {
    updateGroup(groupId, val);
    history.push('/');
  };

  useEffect(() => {
    inputRef.current.focus();

    const getGroupInfo = async () => {
      const groups = await storageGet('groups');

      const target = groups.filter((i) => i.id === groupId)[0];

      setDetails((prevDetails) => {
        return {
          ...prevDetails,
          name: target.name,
        };
      });
    };

    getGroupInfo();
  }, []);

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
          enableReinitialize
          initialValues={details}
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

            <AddButton type="submit">Add Group</AddButton>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
};

export default EditGroup;

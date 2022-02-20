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
import { ListContext } from '../../../context/List.context';
import Link from '../../atom/RouterLink';
import { storageGet, createOptions } from '../../../util';
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

const EditGroup = () => {
  const { groupId } = useParams();
  const {
    updateGroup, getSingleGroup, rendered, links,
  } = useContext(ListContext);
  const history = useHistory();
  const inputRef = useRef();
  const [details, setDetails] = useState({
    name: '',
  });
  const [children, setChildren] = useState();
  const [itemIsValid, setItemIsValid] = useState(false);

  const handleSubmit = (val) => {
    updateGroup(groupId, val, children);
    history.push('/');
  };

  useEffect(() => {
    const getGroupInfo = async () => {
      const groups = await storageGet('groups');

      const target = groups.filter((i) => i.id === groupId)[0];

      if(!target) {
        history.push('/404');
      }else{
        inputRef.current.focus();
        setDetails((prevDetails) => {
          return {
            ...prevDetails,
            name: target.name,
          };
        });
      }
    };

    getGroupInfo();
  }, [groupId]);

  useEffect(() => {
    if(rendered) {
      const existedChildren = getSingleGroup(groupId).children;
      const options = createOptions(existedChildren, 'title', 'id');
      setChildren(options);
    }
  }, [rendered]);

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

            <AddButton type="submit">Update Group</AddButton>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
};

export default EditGroup;

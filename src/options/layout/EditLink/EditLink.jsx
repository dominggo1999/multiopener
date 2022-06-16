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
import {
  storageGet, createOptions, urlValidation, queryValidation,
} from '../../../util';
import Select from '../../atom/Select/Select';

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

const EditLink = () => {
  const inputRef = useRef();
  const { linkId } = useParams();
  const {
    updateLink, groups, groupsContainLink, rendered,
  } = useContext(ListContext);
  const [parentGroups, setParentGroups] = useState(null);
  const history = useHistory();
  const [details, setDetails] = useState({
    link: '',
    title: '',
  });

  const handleSubmit = (val) => {
    updateLink(linkId, val, parentGroups);
    history.push('/');
  };

  useEffect(() => {
    const getLinkInfo = async () => {
      const links = await storageGet('links');
      const target = links.filter((i) => i.id === linkId)[0];

      if (!target) {
        history.push('/404');
      } else {
        inputRef.current.focus();
        setDetails((prevDetails) => {
          return {
            ...prevDetails,
            title: target.title,
            link: target.link,
          };
        });
      }
    };

    getLinkInfo();
  }, [linkId]);

  useEffect(() => {
    if (rendered) {
      // On first render map choosenGroups top options type (label and key)

      const choosenGroups = groupsContainLink(linkId);
      const options = createOptions(choosenGroups, 'name', 'id');

      setParentGroups(options);
    }
  }, [rendered]);

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
          enableReinitialize
          initialValues={details}
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

            <AddButton type="submit">Update Link</AddButton>
          </Form>
        </Formik>
      </FormWrapper>
    </>
  );
};

export default EditLink;

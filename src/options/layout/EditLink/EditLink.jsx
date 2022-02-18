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
import { storageGet, createOptions } from '../../../util';
import Select from '../../atom/Select/Select';

const queryText = /iamlazy/ig;

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
    .url('Not A Valid URL')
    .test('validateURL', 'URL must includes "iamlazy" to show where the query will be put ', ((url) => {
      // If no value go to "required validation"
      if(!url) return true;

      const domainValidator = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;
      const match = domainValidator.exec(url);

      if(match) {
        // Get domain/subdmain from url
        const domain = match[0];

        // Cut domain/subdomain since we only need path
        const path = url.split(domain)[1];

        // Check whether queryText exist in path
        const detectedQueryText = path.match(queryText);

        return detectedQueryText?.length > 0;
      }
    }))
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
    inputRef.current.focus();

    const getLinkInfo = async () => {
      const links = await storageGet('links');

      const target = links.filter((i) => i.id === linkId)[0];

      setDetails((prevDetails) => {
        return {
          ...prevDetails,
          title: target.title,
          link: target.link,
        };
      });
    };

    getLinkInfo();
  }, []);

  useEffect(() => {
    if(rendered) {
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

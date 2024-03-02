import { Field, Form, Formik } from 'formik';
import { IoMdSearch } from "react-icons/io";

export const SearchBar = ({ onSearch }) => {
  return (
    <header>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit"><IoMdSearch /></button>
        </Form>
      </Formik>
    </header>
  );
};
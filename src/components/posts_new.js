import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    const inputField = (
      <input className="form-control" type="text" {...field.input} />
    );

    const textareaField = (
      <textarea rows="5" className="form-control" {...field.input} />
    );

    return (
      <div className={className}>
        <label>{field.label}</label>
        {field.input.name == 'content' ? textareaField : inputField}
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <div className="col-article">
            <h1>Create New Post</h1>
            <form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
              style={{ marginTop: '20px' }}
            >
              <Field label="Title" name="title" component={this.renderField} />
              <Field
                label="Categories"
                name="categories"
                component={this.renderField}
              />
              <Field
                label="Post content"
                name="content"
                component={this.renderField}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link className="btn btn-danger pull-xs-right" to="/">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));

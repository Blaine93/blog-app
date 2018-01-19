import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id, () => {
      this.props.history.push('/');
    });
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-2">
            <Link
              to="/"
              className="btn btn-link"
              style={{ paddingLeft: '0px' }}
            >
              Back To Posts
            </Link>
          </div>
          <div className="col-xs-4">
            <button
              className="btn btn-danger pull-xs-right"
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete Post
            </button>
          </div>
        </div>
        <div className="row article" style={{ marginTop: '20px' }}>
          <div className="col-xs-8 col-xs-offset-2">
            <div className="col-article">
              <h1>{post.title}</h1>
              <h3>Categories: {post.categories}</h3>
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

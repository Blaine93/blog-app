import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import PostsHeader from './posts_header';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  processContent(content) {
    if (content.length > 300) {
      return content.substring(0, 300) + '...';
    }
    return content;
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <h3>Categories: {post.categories}</h3>
          <p>{this.processContent(post.content)}</p>
          <Link to={`/posts/${post.id}`} className="post-link">
            Read more
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;

    if (Object.keys(posts).length === 0 && posts.constructor === Object) {
      return (
        <div>
          <PostsHeader />
          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-xs-8 col-xs-offset-2 text-xs-center">
              <div className="col-article">No posts yet...</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <PostsHeader />
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-xs-8 col-xs-offset-2">
            <ul className="list-group">{this.renderPosts()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

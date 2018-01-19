import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const PostsHeader = () => {
  return (
    <div className="row">
      <h1 className="col-xs-5 col-xs-offset-2">Posts</h1>
      <div className="text-xs-right col-xs-3">
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>
      </div>
    </div>
  );
};

export default PostsHeader;

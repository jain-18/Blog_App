package com.blogserver.service;

import com.blogserver.entity.Comment;

public interface CommentService {
    public Comment createComment(Long postId, String postedBy, String content);
}

package com.blogserver.service;

import com.blogserver.entity.Comment;

import java.util.List;

public interface CommentService {
    public Comment createComment(Long postId, String postedBy, String content);

    public List<Comment> getCommentsByPostId(Long postId);
}

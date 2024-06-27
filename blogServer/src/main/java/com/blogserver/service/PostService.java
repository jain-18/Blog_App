package com.blogserver.service;

import com.blogserver.entity.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
}

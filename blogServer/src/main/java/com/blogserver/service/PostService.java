package com.blogserver.service;

import com.blogserver.entity.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
    Post getPostById(Long postId);
    void likePost(Long postId);
    public List<Post> searchByName(String name);
}

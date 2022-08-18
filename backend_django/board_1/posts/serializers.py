from xml.etree.ElementTree import Comment
from rest_framework import serializers

from users.serializers import ProfileSerializer
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ("pk", "profile", "post", "text")
        
class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("post","text")

class PostSerializer(serializers.ModelSerializer):              # User Input + fill some information automatically
    profile = ProfileSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("pk", "profile", "title", "body", "image", "published_date", "likes", "comments")
        
class PostCreateSerializer(serializers.ModelSerializer):        # User input
    class Meta:
        model = Post
        fields = ("title", "category", "body", "image")
        

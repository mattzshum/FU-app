import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json 
from flask_cors import CORS 
import babel

from models import User, Location, Topic, Post, setup_db, Comment

# TODO:
'''
-- CRUD for all endpoints
-Matt: Comment, Post APIs
-Brady: Topic APIs

-- UPDATE APIs to account for foreign keys on creation
'''

# Changelog:
'''
--Version 0.1.0 F*ck You
    -- CRUD
'''

USERS_PER_PAGE = 10 

def paginate_users(request, selection):
    page = request.args.get('page', 1, type=int)
    start = (page-1) * USERS_PER_PAGE
    end = start + USERS_PER_PAGE

    users = [user.format() for user in selection]
    current_users = users[start:end]
    return current_users

def create_app(test_config=None):
    '''
    API LOGICS
    '''
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    '''
    -----users()
    
    ---paramters
    none

    ---description
    queries for all users and paginates them by request
    '''
    @app.route('/users', methods=['GET'])
    def users():
        users = User.query.order_by(User.id).all()
        current_users = paginate_users(request, users)

        if len(current_users) == 0:
            print('NO SEARCH RESULTS')
            abort(404)
        
        return jsonify({
            'success':True,
            'users':current_users,
            'total_users':len(users)
        })
    

    '''
    -----specific_users
    
    ---parameters
    user_id - the primary key of the user we are displaying
    
    ---description
    retrieves a specific user and displays info
    '''
    @app.route('/users/<int:user_id>', methods=['GET'])
    def specific_user(user_id):
        try:
            print(f'CURRENTLY SEARCHING FOR {user_id}')
            user = User.query.filter(User.id == user_id).one_or_none()

            if user is None:
                abort(404)
            
            return jsonify({
                'success':True,
                'data':user.format()
            })
        except Exception as E:
            print(E)
            abort(422)
    
    '''
    -----create_user()

    ---paramters
    none

    ---description
    creates a user and returns json object [success, user_id]
    '''
    @app.route('/users', methods=['POST'])
    def create_user():
        body = request.get_json()

        new_f_name = body.get('f_name', None)
        new_l_name = body.get('l_name', None)
        new_u_name = body.get('u_name', None)
        new_phone = body.get('phone', None)

        try:
            user = User(f_name = new_f_name,
                        l_name = new_l_name,
                        u_name = new_u_name,
                        phone=new_phone)
            user.insert()

            return jsonify({
                'success':True,
                'created':user.format()
            })
        except Exception as E:
            print(E)
            abort(422)


    '''
    -----delete_user()

    ---paramters
    user_id - primary key of user we are to remove from db

    ---description
    takes id of user and removes them from table USER
    '''
    @app.route('users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        try:
            target_user = User.query.filter(User.id == user_id).one_or_none()

            if target_user == None:
                abort(404)

            target_user.delete()

            return jsonify({
                'success':True,
                'deleted':user_id
            })
        except Exception as E:
            print(E)
            abort(422)
    
    '''
    -----location()

    ---paramaters
    none

    ---description
    queueries for all locations
    '''
    @app.route('/location', methods=['GET'])
    def location():
        try:
            locations = Location.query.order_by(Location.id).all()
            if locations == None:
                print('Dont work')
                abort(404)
            
            return jsonify({
                'success':True,
                'location':[locations.format() for Location in locations],
                'total_location':len(location)
            })
        except Exception as E:
            print('Dont work')
            abort(422)

    '''
    -----specific_location(location_id)

    ---paramaters
    location being searched for

    ---description
    queueries looking for a specific location
    '''
    @app.route('/location/<int:location_id>', methods=['GET'])
    def specific_location(location_id):
        try:
            s_location = Location.query.filter(Location.id == location_id).one_or_none()
            if s_location == None:
                print('dont work')
                abort(404)
            
            return jsonify({
                'success':True,
                's_location':s_location.format()
            })
        except Exception as E:
            print('Dont work')
            abort(422)
    
    '''
    -----create_location(void)

    ---paramaters
    none

    ---description
    creates a new specific location
    '''
    @app.route('/location', methods=['POST'])
    def create_location():
        body = request.get_json()
        name = body.get('name', None)
        try:
            location = Location(name)
            location.insert()
            return jsonify({
                'success':True,
                'created':location.format()
            })
        except Exception as E:
            print('Dont work')
            abort(422)

    '''
<<<<<<< HEAD
    -----delete_location(location_id)

    ---paramaters
    location_id thats deleted

    ---description
    deletes a specific location
    '''
    @app.route('location/<int:location_id>', methods=['DELETE'])
    def delete_location(location_id):
        try:
            location = Location.query.filter(Location.id==location_id).one_or_none()
            if location:
                abort(404)
            return jsonify({
                'success':True,
                'deleted':location_id
            })
        except Exception as E:
            print('Dont work')
            abort(422)
    
    '''
    -----topic()

    ---paramaters
    none

    ---description
    queries for all ltopics
    '''
    @app.route('/topic',methods=['GET'])
    def topic():
        try:
            topics = Topic.query.order_by(Topic.id).all()
            if topic == None:
                print('dont work')
                abort(404)
            return jsonify({
                'success':True,
                'current_topic':[Topic.format() for Topic in topics],
                'total_topic':len(topics)
            })
        except Exception as E:
            print('Dont Work')
            abort(422)
    '''
    -----specific_topic(topic_id)

    ---paramaters
    topic_id

    ---description
    searches for specific topic_id
    '''
    @app.route('/topic/int:<topic_id>', methods=['GET'])
    def specific_topic(topic_id):
        try:
            s_topic = Topic.query.filter(Topic.id==topic_id).one_or_none()
            if s_topic == None:
                print('Not there')
                abort(404)
            return jsonify({
                'success':True,
                's_topic':s_topic.format()
            })
        except Exception as E:
            print('dont work')
            abort(422)

    '''
    -----create_topic(void)

    ---paramaters
    none

    ---description
    creates a new topic
    '''
    @app.route('/topic',method=['POST'])
    def create_topic():
        body = request.get_json()
        t_name = body.get('name', None)
        t_description = body.get('description',None)
        try:
            topic = Topic(name = t_name, description = t_description)
            topic.insert()
            return jsonify({
                'success':True,
                'created':topic.format()
            })
        except Exception as E:
            print('Dont work')
            abort(422)

    '''
    -----delete_topic(topic_id)

    ---paramters
    topic_id

    --description
    deletes a specific topic
    '''
    @app.route('topic/<int:topic_id>',method=['DELETE'])
    def delete_topic(topic_id):
        try:
            topic = Topic.query.filter(Topic.id==topic_id).one_or_none()
            if topic:
                abort(404)
            return jsonify({
                'success':True,
                'deleted':topic_id
            })
        except Exception as E:
            print('Dont work')
            abort(422)


    '''
    -----posts()

    ---parameters

    --description
    queries and returns all topics sorted by ID
    '''
    @app.route('/posts', methods=['GET'])
    def posts():
        try:
            posts = Post.query.order_by(Post.id).all()

            if posts is None:
                print('Error Fetching Posts')
                abort(404)
            
            return jsonify({
                'success':True,
                'data':[post.format() for post in posts]
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
    
    '''
    -----specific_post()

    ---parameters
    post_id: primary key of post we are to query for

    --description
    queries and returns requested post
    '''
    @app.route('/posts/<int:post_id>', methods=['GET'])
    def specific_post(post_id):
        try:
            post = Post.query.filter(Post.id == post_id).one_or_none()

            if post is None:
                abort(404)
                print('Error Fetching Specific Post')
            
            return jsonify({
                'success':True,
                'data':post.format()
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
    
    '''
    -----create_post()

    ---parameters
    none

    --description
    retrieves information from REQUEST and creates a new Post
    '''
    @app.route('/posts', methods=['POST'])
    def create_post():
        body = request.get_json()

        title = body.get('title', None)
        post_body = body.get('body', None)
        num_fu = body.get('num_fu', None)
        tag = body.get('tag', None)
        user_id = body.get('user_id', None)

        try:
            post = Post(title, post_body, num_fu, tag, user_id)
            post.insert()

            return jsonify({
                'success':True,
                'created':post.format()
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')

    '''
    -----delete_post()

    ---parameters
    post_id: primary key of post to be deleted

    --description
    queries for specific post and deletes that row from a table
    '''
    @app.route('/posts/<int:post_id>', methods=['DELETE'])
    def delete_post(post_id):
        try:
            post = Post.query.filter(Post.id == post_id).one_or_none()

            if post is None:
                abort(404)
                print('Error fetching post')
            
            post.delete()

            return jsonify({
                'success':True,
                'deleted':post_id
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
    
    '''
    -----comments()
    
    --parameters
    none

    --description
    queries for all comments
    '''
    @app.route('/comments', methods=['GET'])
    def comments():
        try:
            comments = Comment.query.order_by(Comment.id).all()

            if comments is None:
                abort(404)
                print('Error Fetching Comments')
            
            return jsonify({
                'success':True,
                'data':[comment.format() for comment in comments]
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
    
    '''
    -----specific_comment(comment_id)

    --parameters
    comment_id: primary key of comment we are querying for

    --description
    queries for specific comment and returns it
    '''
    @app.route('/comments/<int:comment_id>', methods=['GET'])
    def specific_comment(comment_id):
        try:
            comment = Comment.query.filter(Comment.id == comment_id).one_or_none()

            if comment is None:
                abort(404)
                print('Error Fetching Comment {comment_id}')
            
            return jsonify({
                'success':True,
                'data':comment.format()
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
    
    '''
    -----create_comment()

    --parameters
    none

    --description
    takes input from frontend and converts it to data row
    '''
    @app.route('/comments', methods=['POST'])
    def create_comment():
        body = request.get_json()

        comment_body = body.get('body', None)
        prev = body.get('prev', None)
        post_id = body.get('post_id', None)
        user_id = body.get('user_id', None)

        try:
            comment = Comment(comment_body, prev, post_id, user_id)
            comment.insert()
            
            return jsonify({
                'success':True,
                'created':comment.format()
            })
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
        
    '''
    -----delete_comment(comment_id)

    --parameters
    comment_id: primary key of comment we are to delete

    --description
    queries for specific comment and deletes from Comment
    '''
    @app.route('/comments/<int:comment_id>', methods=['DELETE'])
    def delete_comment(comment_id):
        try:
            comment = Comment.query.filter(Comment.id == comment_id).one_or_none()

            if comment is None:
                abort(404)
                print('Could not delete comment DNE')
            
            comment.delete()

            return jsonify({
                'success':True,
                'deleted':comment_id
            })    
        except Exception as E:
            abort(422)
            print('Error Code 422 {E}')
        
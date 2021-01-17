import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json 
from flask_cors import CORS 
import babel

from models import User, Location, Topic, Post, setup_db, Comment, db

# TODO:
'''
-- CRUD for all endpoints
-Matt: Comment, Post APIs
-Brady: Topic APIs

-- UPDATE APIs to account for foreign keys on creation
Create, read, update, delete
'''

USERS_PER_PAGE = 10

# Changelog:
def paginate_users(request, selection):
    page = request.args.get('page', 1, type=int)
    start = (page-1) * USERS_PER_PAGE
    end = start + USERS_PER_PAGE

    users = [user.format() for user in selection]
    users = [users.format() for user in selection]
    current_users = users[start:end]
    return current_users

def create_app(test_config=None):
    '''
    Home of the API logics
    '''
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    @app.route('/users', methods=['GET'])
    def users():
        try:
            users = User.query.order_by(User.id).all()
            if users is None:
                print('Error no data returned')
                abort(404)
            return jsonify({
                'success':True,
                'users':[user.format() for user in users],
                'total_users':len(users)
            })
        except Exception as E:
            print(E)
            abort(422)
    
    @app.route('/users/<int:user_id>', methods=['GET'])
    def specific_user(user_id):
        try:
            user = User.query.filter(User.id == user_id).one_or_none()

            if user is None:
                print('One or None issue')
                abort(404)
            
            return jsonify({
                'success':True,
                'user':user.format()
            })
        except Exception as E:
            print(E)
            abort(422)

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
                'user':user.format(),
                'created':user.id
            })
        except Exception as E:
            db.session.rollback()
            print(E)
            abort(422)
    
    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        try:
            target_user = User.query.filter(User.id == user_id).one_or_none()

            if target_user is None:
                print('One or None issue')
                abort(422)
            
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
    @app.route('/locations', methods=['GET'])
    def location():
        try:
            locations = Location.query.order_by(Location.id).all()
            if locations is None:
                print('Dont work')
                abort(404)
            
            return jsonify({
                'success':True,
                'locations':[location.format() for location in locations],
                'total_location':len(locations)
            })
        except Exception as E:
            print(f'Error Code 422 {E}')
            abort(422)

    '''
    -----specific_location(location_id)

    ---paramaters
    location being searched for

    ---description
    queueries looking for a specific location
    '''
    @app.route('/locations/<int:location_id>', methods=['GET'])
    def specific_location(location_id):
        try:
            s_location = Location.query.filter(Location.id == location_id).one_or_none()
            if s_location == None:
                print('dont work')
                abort(404)
            
            return jsonify({
                'success':True,
                'location':s_location.format()
            })
        except Exception as E:
            print(f'Error Code 422 {E}')
            abort(422)
    
    '''
    -----create_location(void)

    ---paramaters
    none

    ---description
    creates a new specific location
    '''
    @app.route('/locations', methods=['POST'])
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
            db.session.rollback()
            print(f'Error Code 422 {E}')
            abort(422)

    '''
    -----delete_location(location_id)

    ---paramaters
    location_id thats deleted

    ---description
    deletes a specific location
    '''
    @app.route('/locations/<int:location_id>', methods=['DELETE'])
    def delete_location(location_id):
        try:
            location = Location.query.filter(Location.id == location_id).one_or_none()
            if location is None:
                abort(404)
            return jsonify({
                'success':True,
                'deleted':location_id
            })
        except Exception as E:
            print(f'Error Code 422 {E}')
            abort(422)
    
    '''
    -----topic()

    ---paramaters
    none

    ---description
    queries for all topics
    '''
    @app.route('/topic',methods=['GET'])
    def topic():
        try:
            topics = Topic.query.order_by(Topic.id).all()
            if topic is None:
                print('dont work')
                abort(404)
            return jsonify({
                'success':True,
                'current_topic':[Topic.format() for Topic in topics],
                'total_topic':len(topics)
            })
        except Exception as E:
            print(f'Error Code 422 {E}')
            abort(422)
    '''
    -----specific_topic(topic_id)

    ---paramaters
    topic_id

    ---description
    searches for specific topic_id
    '''
    @app.route('/topic/<int:topic_id>', methods=['GET'])
    def specific_topic(topic_id):
        try:
            s_topic = Topic.query.filter(Topic.id == topic_id).one_or_none()
            if s_topic is None:
                abort(404)
                print('Not there')
            return jsonify({
                'success':True,
                's_topic':s_topic.format()
            })
        except Exception as E:
            abort(422)
            print(f'Error Code 422 {E}')

    '''
    -----create_topic(void)

    ---paramaters
    none

    ---description
    creates a new topic
    '''
    @app.route('/topic',methods=['POST'])
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
            #db.session.rollback()
            
            print(f'Error Code 422 {E}')
            abort(422)

    '''
    -----delete_topic(topic_id)

    ---paramters
    topic_id

    --description
    deletes a specific topic
    '''
    @app.route('/topic/<int:topic_id>',methods=['DELETE'])
    def delete_topic(topic_id):
        try:
            topic = Topic.query.filter(Topic.id==topic_id).one_or_none()
            if topic is None:
                abort(404)
            return jsonify({
                'success':True,
                'deleted':topic_id
            })
        except Exception as E:
            print(f'Error Code 422 {E}')
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
                'posts':[post.format() for post in posts],
                'total_posts':len(posts)
            })
        except Exception as E:
            abort(422)
            print(f'Error Code 422 {E}')
    
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
                'post':post.format()
            })
        except Exception as E:
            abort(422)
            print(f'Error Code 422 {E}')
    
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
            db.session.rollback()
            print(f'Error Code 422 {E}')
            abort(422)

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
            print(f'Error Code 422 {E}')
    
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
                'comments':[comment.format() for comment in comments],
                'total_comments':len(comments)
            })
        except Exception as E:
            abort(422)
            print(f'Error Code 422 {E}')
    
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
                'comment':comment.format()
            })
        except Exception as E:
            abort(422)
            print(f'Error Code 422 {E}')
    
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
            db.session.rollback()
            abort(422)
            print(f'Error Code 422 {E}')
        
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
            print(f'Error Code 422 {E}')


    #NO CONTENT 204
    # @app.errorhandler(204)
    # def no_content(error):
    #     return jsonify({
    #         'success':True,
    #         'error':204,
    #         'message':'No Content. Request was completed successfully and there is no data to return in response.'
    #     })

    #NOT FOUND 404
    @app.errorhandler(404)
    def not_found(error):
      return jsonify({
        'success':False,
        'error':404,
        'message':'Not Found. Resource referenced in the URL was not found.'
      }), 404

    #UNPROCESSABLE 422
    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
          'success':False,
          'error':422,
          'message':'Not Processable.'
        }), 422

    #FORBIDDEN 403
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'success':False,
            'error':403,
            'message':'Forbidden. Authentication credentials sent with request are insufficient for the request.'
        }), 403

    #METHOD NOT ALLOWED 405
    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            'success':False,
            'error':405,
            'message':'Method Not Allowed. Method requested is not supported for the given resource.'
        }), 405
    
    #INTERNAL SERVER ERROR 500
    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            'success':False,
            'error':500,
            'message':'Internal Server Error. An unexpected error occured while processing the request.'
        }), 500

    return app
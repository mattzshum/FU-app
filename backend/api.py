import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json 
from flask_cors import CORS 
import babel

from models import User, Location, Topic, Post

# TODO:
'''
-- CRUD for all endpoints
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

    users = [users.format() for user in selection]
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

        try:
            user = User(f_name = new_f_name,
                        l_name = new_l_name,
                        u_name = new_u_name)
            user.insert()

            return jsonify({
                'success':True,
                'created':user_id
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
                'created':location_id
            })
        except Exception as E:
            print('Dont work')
            abort(422)

    '''
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
                'created':topic_id
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
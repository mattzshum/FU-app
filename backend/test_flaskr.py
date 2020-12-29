import os
import unittest
import json

from api import create_app
from models import setup_db, User, Location, Topic, Post, Comment
from passwords import Passwords

from flask_sqlalchemy import SQLAlchemy

db_path = {
    'dialect':'postgresql',
    'username':'postgres',
    'password':Passwords.password,
    'host':'localhost:5432',
    'database_name':'fu-app'
}
database_path = f'{db_path["dialect"]}://{db_path["username"]}:{db_path["password"]}@{db_path["host"]}/{db_path["database_name"]}'

class UserTestCase(unittest.TestCase):
    '''This class represents the User test case'''
    def setUp(self):
        '''Define test variables and initialize app'''
        self.app = create_app()
        self.client = self.app.test_client
        self.database_path = database_path
        setup_db(self.app, self.database_path)

        #binds the app to current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            #create all tables
            self.db.create_all()

        self.sample_user = {
            'f_name':'Matthew',
            'l_name':'Shum',
            'u_name':'shumbucket',
            'phone':'510-338-8949'
        }

    def tearDown(self):
        '''executed after each test'''
        pass
    
    def test_get_paginated_users(self):
        res = self.client().get('/users')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['created'])

    def test_get_user_ERROR(self):
        res = self.client().get('/users/2')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['error'], 404)

    
    def test_insert_user(self):
        res = self.client().post('/users',
                                  data=json.dumps(self.sample_user),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['new_user'])
        self.assertIsNotNone(data['created'])
    
    def test_insert_user_ERROR(self):
        res = self.client().post('/users',
                                  data=json.dumps({}),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)

    def test_specific_user(self):
        res = self.client().get('/users/1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['users'])
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['total_users'])

    def test_specific_user_ERROR(self):
        res = self.client().get('/users/501')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['error'], 404)

    def test_delete_user(self):
        res = self.client().delete('/users/1')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 1)
    
    def test_delete_user_ERROR(self):
        res = self.client().delete('/users')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

class LocationTestCase(unittest.TestCase):
    '''Location test case'''
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client
        self.database_path = database_path
        setup_db(self.app, self.database_path)

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            #create all tables
            self.db.create_all()

        self.sample_location = {
            'name':'Joes House'
        }
    
    def tearDown(self):
        '''executed after each test'''
        pass

    def test_get_insert_location(self):
        res = self.client().post('/location',
                                  data=json.dumps(self.sample_location),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['new_location'])
        self.assertIsNotNone(data['created'])

    def test_get_location_ERROR(self):
        res = self.client().post('/location',
                                  data=json.dumps({}),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)
    
    def test_specific_location(self):
        res = self.client().get('/location/1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['location'])
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['total_location'])

    def test_specific_location_ERROR(self):
        res = self.client().get('/location/501')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['error'], 404)

    def test_delete_location(self):
        res = self.client().delete('/location/1')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 1)
    
    def test_delete_location_ERROR(self):
        res = self.client().delete('/location')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        
class TopicTestCase(unittest.TestCase):
    '''Topic test case'''
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client
        self.database_path = database_path
        setup_db(self.app, self.database_path)

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            #create all tables
            self.db.create_all()

        self.sample_topic = {
            'name':'Ur Moms House',
            'description':'banged'
        }

    def tearDown(self):
        '''executed after each test'''
        pass

    def test_get_insert_topic(self):
        res = self.client().post('/topic',
                                  data=json.dumps(self.sample_topic),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['new_topic'])
        self.assertIsNotNone(data['created'])

    def test_get_topic_ERROR(self):
        res = self.client().post('/topic',
                                  data=json.dumps({}),
                                  content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)
    
    def test_specific_topic(self):
        res = self.client().get('/topic/1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertIsNotNone(data['topic'])
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['total_topic'])

    def test_specific_topic_ERROR(self):
        res = self.client().get('/topic/501')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['error'], 404)

    def test_delete_topic(self):
        res = self.client().delete('/topic/1')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 1)
    
    def test_delete_topic_ERROR(self):
        res = self.client().delete('/topic')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
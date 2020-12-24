import os
import unittest
import json

from api import create_app
from models import setup_db, User, Location, Topic, Post, Comment
from passwords import Passwords

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

        self.new_user = {
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

    def test_404_requesting_beyond_valid_page(self):
        res = self.client().get('/users')
        #TODO:: Finish this test case
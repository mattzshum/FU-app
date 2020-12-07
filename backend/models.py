import os
from sqlalchemy import Column, String, Integer, create_engine, ForeignKey, Float, ARRAY, TIMESTAMP
import json
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate


# TODO:
'''
-- Schema Instantiation
'''

# Changelog:
'''
--Version 0.1.0 F*ck You
    -- Star Schema Instantiation
'''

db_path = {
    'dialect':'postgresql',
    'username':'postgres',
    'password':'8949',
    'host':'localhost:5432',
    'database_name':'fu-app'
}
database_path = f'{db_path["dialect"]}://{db_path["username"]}:{db_path["password"]}@{db_path["host"]}/{db_path["database_name"]}'
db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    '''
    binds flask application and SQLAlchemy service
    '''
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)

class User(db.Model):
    __tablename__='User'
    '''
    User

    Relationships:
    '''
    id = Column(Integer, primary_key=True)
    f_name = Column(String(150), nullable=False)
    l_name = Column(String(150), nullable=False)
    u_name = Column(String(150), nullable=False)

    def __init__(self, f_name, l_name, u_name):
        self.f_name = f_name
        self.l_name = l_name
        self.u_name = u_name
    
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def format(self):
        return{
            'id':self.id,
            'f_name':self.f_name,
            'l_name':self.l_name,
            'u_name':self.u_name
        }

class Location(db.Model):
    __tablename__='Location'
    '''
    Location

    Relationships:
    '''
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    def __init__(self, name):
        self.name = name
    
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def format(self):
        return{
            'id':self.id,
            'name':self.name
        }

class Topic(db.Model):
    __tablename__='Topic'
    '''
    Topic

    Relationships:
    '''
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def format(self):
        return{
            'id':self.id,
            'name':self.name,
            'description':self.description
        }

class Post(db.Model):
    __tablename__='Post'
    '''
    Post

    Relationships:
    '''
    id = Column(Integer, primary_key=True)
    title = Column(String(150), nullable=False)
    body = Column(String, nullable=False)
    num_fu = Column(Integer, nullable=False)
    tag = Column(Array(String))

    def __init__(self, title, body, num_fu, tag):
        self.title = title
        self.body = body
        self.num_fu = num_fu
        self.tag = tag
    
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
    
    def format(self):
        return{
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'num_fu':self.num_fu,
            'tag':self.tag
        }
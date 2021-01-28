import os
from sqlalchemy import Column, String, Integer, create_engine, ForeignKey, Float, ARRAY, TIMESTAMP, Table, MetaData, DateTime
import json
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate
from datetime import datetime
from pytz import timezone

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from passwords import Passwords


# TODO:
'''
-- Schema Instantiation
'''

# Changelog:
'''
--Version 0.1.0 F*ck You
    -- Star Schema Instantiation
'''

metadata = MetaData()
Base = declarative_base(metadata=metadata)
fmt = "%Y-%m-%d %H:%M:%S %Z%z"

db_path = {
    'dialect':'postgresql',
    'username':'postgres',
    'password':Passwords.password,
    'host':'localhost:5432',
    'database_name':'fu-app'
}
database_path = f'{db_path["dialect"]}://{db_path["username"]}:{db_path["password"]}@{db_path["host"]}/{db_path["database_name"]}'
db = SQLAlchemy(metadata=metadata)


def setup_db(app, database_path=database_path):
    '''
    binds flask application and SQLAlchemy service
    '''
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)

topic_post_association_table = Table('t_p', Base.metadata,
    Column('Topic_id', Integer, ForeignKey('Topic.id')),
    Column('Post_id', Integer, ForeignKey('Post.id'))
)

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
    phone = Column(String(15), nullable=False)
    date_created = Column(DateTime(), nullable=False)
    user_post = db.relationship('Post',backref='Post',lazy=True)
    user_comment = db.relationship('Comment',backref='Comment',lazy=True)


    def __init__(self, f_name, l_name, u_name, phone):
        self.f_name = f_name
        self.l_name = l_name
        self.u_name = u_name
        self.phone = phone
        self.date_created = datetime.now(timezone('UTC')).astimezone(timezone('US/Pacific'))
    
    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()

    def update(self):
        db.session.commit()
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def format(self):
        return{
            'id':self.id,
            'f_name':self.f_name,
            'l_name':self.l_name,
            'u_name':self.u_name,
            'phone':self.phone,
            'date_created':self.date_created,
        }
        

class Location(db.Model):
    __tablename__='Location'
    '''
    Location

    Relationships:
    '''
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    date_created = Column(DateTime(), nullable=False)

    def __init__(self, name):
        self.name = name
        self.date_created = datetime.now(timezone('UTC')).astimezone(timezone('US/Pacific'))
    
    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
            db.session.remove()
            db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def format(self):
        return{
            'id':self.id,
            'name':self.name,
            'date_created':self.date_created,
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
    date_created = Column(DateTime(), nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.date_created = datetime.now(timezone('UTC')).astimezone(timezone('US/Pacific'))

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()

    def update(self):
        db.session.commit()
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def format(self):
        return{
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'date_created':self.date_created,
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
    tag = Column(ARRAY(String))
    date_created = Column(DateTime(), nullable=False)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    comments = db.relationship('Comment',backref='Comments',lazy=True)

    def __init__(self, title, body, num_fu, tag, user_id):
        self.title = title
        self.body = body
        self.num_fu = num_fu
        self.tag = tag
        self.user_id = user_id
        self.date_created = datetime.now(timezone('UTC')).astimezone(timezone('US/Pacific'))
    
    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def update(self):
        db.session.commit()
        
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def format(self):
        return{
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'num_fu':self.num_fu,
            'tag':self.tag,
            'user_id':self.user_id,
            'date_created':self.date_created,
        }

class Comment(db.Model):
    __tablename__='Comment'
    
    id = Column(Integer, primary_key=True)
    body = Column(String, nullable=False)
    prev = Column(Integer)
    date_created = Column(DateTime(), nullable=False)
    post_id = Column(Integer, ForeignKey('Post.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    
    def __init__(self, body, prev, post_id, user_id):
        self.body = body
        self.prev = prev
        self.post_id = post_id
        self.user_id = user_id
        self.date_created = datetime.now(timezone('UTC')).astimezone(timezone('US/Pacific'))

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def update(self):
        db.session.commit()
        
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as E:
            print(E)
            db.session.rollback()
    
    def format(self):
        return {
            'id':self.id,
            'body':self.body,
            'prev':self.prev,
            'post_id':self.post_id,
            'user_id':self.user_id,
            'date_created':self.date_created,
        }

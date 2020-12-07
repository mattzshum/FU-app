# fu-app
 A social media based app that focuses on letting people connect on their negative feelings towards events/ideas. The degree of controversy/opinion on a subject will be measured by a 'f*ck you' rather than a 'like'.
 ```
Example: 'Gov Gavin Newsom orders lockdowns across California starting tonight!'
         -F*cks Given: 200,000
         -Comments:
         --> Fuck Covid
         ---->Agreed
 ```

## Getting Started
#### Installing Dependencies
- Python3
- To install dependencies, navigate to the project directory and locate ```requirements.txt```. In this folder, run the command: ``` pip install -r requirements.txt```.
#### Vital Software
- Flask: micro web framework written in Python
- SQLAlchemy: open-source SQL toolkit and object relational mapping for Python
- Flask-CORS: extension for handling Cross Origin Resource sharing
- React JS: open source, front end, JavaScript library for building user interfaces or UI components

## Backend
### Database
Database_Path (when testing local): ```postgresql://postgres:8949@localhost:5432/fu-app```
#### Table Heirarchy:
```
User
  id             : primary_key
  f_name         : first name
  l_name         : last name
  u_name         : username

Location
  id             : primary_key
  name           : name

Topic
  id             : primary_key
  name           : name
  description    : description

Post
  id             : primary_key
  title          : topic name
  body           : OP opinion/reaction to topic
  num_fu         : number of F*cks Given
  tag            : Array of tags that can be affiliated to a post (will most likely be array of ```ints``` (primary_keys))
```


## Frontend
TODO -- programmed with React.js
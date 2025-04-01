import os
from dotenv import load_dotenv

from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.id import ID


# Load variables from .env file
load_dotenv()

# Access the variables
api_key = os.getenv("SECRET_APPWRITE_API_KEY")
project_id = os.getenv("PUBLIC_APPWRITE_PROJECT_ID")
database_id = os.getenv("PUBLIC_APPWRITE_DATABASE_ID")
collection_id = os.getenv("PUBLIC_APPWRITE_FILES_COLLECTION_ID")

# Appwrite client
client = Client()
client.set_endpoint('https://cloud.appwrite.io/v1')
client.set_project(project_id)
client.set_key(api_key)

# Initialize database
db = Databases(client)


todoDatabase = None
todoCollection = None

def prepare_database():
  global todoDatabase
  global todoCollection

  todoDatabase = db.create(
    database_id=ID.unique(),
    name='TodosDB'
  )

  todoCollection = db.create_collection(
    database_id=todoDatabase['$id'],
    collection_id=ID.unique(),
    name='Todos'
  )

  db.create_string_attribute(
    database_id=todoDatabase['$id'],
    collection_id=todoCollection['$id'],
    key='title',
    size=255,
    required=True
  )

  db.create_string_attribute(
    database_id=todoDatabase['$id'],
    collection_id=todoCollection['$id'],
    key='description',
    size=255,
    required=False,
    default='This is a test description.'
  )

  db.create_boolean_attribute(
    database_id=todoDatabase['$id'],
    collection_id=todoCollection['$id'],
    key='isComplete',
    required=True
  )

# Add Documents
def seed_database():
  testTodo1 = {
    'title': "Buy apples",
    'description': "At least 2KGs",
    'isComplete': True
  }

  db.create_document(
    database_id=todoDatabase['$id'],
    collection_id=todoCollection['$id'],
    document_id=ID.unique(),
    data=testTodo1
  )


# Retrieve documents
def get_todos():
  todos = db.list_documents(database_id,collection_id)
  return todos

def get_todo(document_id: str):
  todo = db.get_document(database_id, collection_id, document_id)
  return todo

def create_todo(data):
  todo = db.create_document(database_id, collection_id, ID.unique(), data)
  return todo

def update_todos(document_id: str, data):
  todos = db.update_document(database_id, collection_id, document_id, data)
  return todos

def delete_todo(document_id: str):
  todo = db.delete_document(database_id, collection_id, document_id)
  return todo



if __name__ == "__main__":
  get_todos()
  get_todo()
  update_todos()
  delete_todo()
from models.user_model import User
from extensions import db

def create_user(uid, name, email):
    print(f"Service: Creating user with UID={uid}, Name={name}, Email={email}")
    
    # Create new user instance
    new_user = User(uid=uid, name=name, email=email)
    
    print(f"Service: User object created: {new_user}")
    
    # Add to the database
    db.session.add(new_user)
    db.session.commit()
    
    print(f"Service: User saved to database with ID={new_user.id}")
    
    return new_user

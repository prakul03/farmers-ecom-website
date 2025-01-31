from extensions import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)  # Firebase UID
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)

    def __init__(self, uid, name, email):
        print(f"Creating a new User object with UID: {uid}, Name: {name}, Email: {email}")
        self.uid = uid
        self.name = name
        self.email = email

    def __repr__(self):
        return f'<User {self.name}>'

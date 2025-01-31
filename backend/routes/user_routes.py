from flask import Blueprint, request, jsonify
from services.user_service import create_user

user_bp = Blueprint('user', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()    
    uid = data.get("uid")  #UID from Firebase Authentication
    name = data.get("name")
    email = data.get("email")
    if not uid or not name or not email:
        return jsonify({"error": "UID, name, and email are required"}),400
    user = create_user(uid, name, email)
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }),201

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

# Database created
db = client["RANDOM-CHAT"]

# User table created here
User = db["User"]

def create_user(signupData:dict):
    response = User.insert_one(dict(signupData))
    return str(response.inserted_id)

def fetch_user(loginData:dict):
    user = User.find_one({"name":loginData.get("name"),"password":loginData.get("password")})
    return user

def fetch_user_on_username(name:str):
    user = User.find_one({"name":name})
    return user

def update_online(email:str,isActive:bool):
    user = User.update_one({"email":email},{"$set":{"isActive":isActive}})
    return user.modified_count


def get_all_user(username:str):
    users = User.find({"name":{"$ne":username}},{})
    return users
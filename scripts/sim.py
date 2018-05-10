import requests
import json
from random import randint
import time
# 
# # # # CONFIGURATION OPTIONS # # # # 
#
# Simulated Application Name
application_name = "application_1"
# Host of API
hostname = "localhost"
# Number of users to simulate
number_of_users = 200
# Weight features
user_feature_weights = {
  "add-image": 1,
  "add-post": 1,
  "view-timeline": 24,
  "view-friends-timeline": 24,
}
#
# # # --- DON'T EDIT BELOW THIS LINE --- # # # 
#
headers_json = {
  "Content-Type":"application/json"
}
user_features = []
new_user_feature = "add-video"

# Loop over the features and the weights and addpend to new array
for feature, weight in user_feature_weights.items():
  for x in xrange(randint(0, weight)):
    user_features.append(feature)

def user(random_max):
  for x in xrange(randint(0, number_of_users)):
    total_feature_length = len(user_features) - 1
    send_data = {
      "application_name": application_name,
      "function_name": user_features[randint(0, total_feature_length)],
      "usage": randint(0, random_max)
    }
    simulation(send_data)
    random_sleep = random_max / 24
    time.sleep(random_sleep)

def simulation(send_data):
  print(send_data)
  send_data = json.dumps(send_data)
  r = requests.post("http://"+hostname, headers=headers_json, data=send_data)
  print(r.status_code, r.reason)

starttime=time.time()
new_feature_count = 0
# Endless loop simulating users
while True:
  print "Metrics collected"
  random_max = randint(0, randint(0, 50))
  new_feature_count = new_feature_count + 1
  user(random_max)
  if new_feature_count == 200:
    for x in xrange(0, 3):
      user_features.append(new_user_feature)
  time.sleep(1.0 - ((time.time() - starttime) % 1.0))
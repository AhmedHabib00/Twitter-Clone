from __future__ import annotations

from locust import HttpUser, between

from locustfiles.sign_in import SignIn
from locustfiles.tweet import Tweet
from locustfiles.sign_up import Sign_up


class PrimaryUser(HttpUser):
    wait_time = between(1, 5)
    host = 'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api'
    tasks = [Tweet, Sign_up, SignIn]


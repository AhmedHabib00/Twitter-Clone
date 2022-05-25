import json
from http import HTTPStatus
from locust import SequentialTaskSet, task


class Sign_up(SequentialTaskSet):
    def __init__(self, parent):
        super().__init__(parent)
        self.registererId = ""

    @task
    def sign_up_1(self):
        data = {
            "birthdate": "2005-11-18",
            "email": "fgjfj@gmail.com",
            "name": "Yasmeen Zaki"
        }
        with self.client.post("/signUp", name="signup", data=data, catch_response=True) as response:
            if response.status_code == 201:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

            # response_data = json.loads(response.text)
            # self.registererId = response_data['registererId']

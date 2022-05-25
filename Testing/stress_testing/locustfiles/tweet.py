import json
from http import HTTPStatus
from locust import SequentialTaskSet, task


class Tweet(SequentialTaskSet):
    def __init__(self, parent):
        super().__init__(parent)
        self.token = ""

    @task
    def on_start(self):
        # launch url
        self.client.get("http://habibs.me/", name="launch_url")
        # log in
        data = {
            "emailOrUsername": "merna.youssef01@eng-st.cu.edu.eg",
            "password": "Merna%1234"
        }
        with self.client.post("/login", name="signin", data=data, catch_response=True) as response:
            response_data = json.loads(response.text)
            self.token = response_data['x-auth-token']

    @task
    def tweet_text_only(self):
        headers = {
            "x-auth-token": self.token,
            "content": "this is a tweet"
        }
        with self.client.post("/tweets", name="tweet_text_only",
                              headers=headers,
                              catch_response=True) as response:
            if response.status_code == HTTPStatus.OK:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

    @task
    def tweet_text_and_image(self):
        headers = {
            "x-auth-token": self.token
        }
        data = {
            'content': 'tweeet',
            'images': '@"E:\Sem 6\Software Engineering\Whisper\Testing\stress_testing\locustfiles\test.jpg"'
        }
        with self.client.post("/tweets", name="tweet_with_image", headers=headers, data=data,
                              catch_response=True) as response:
            if response.status_code == HTTPStatus.OK:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

    @task
    def stop(self):
        self.interrupt()

    def on_stop(self):
        pass

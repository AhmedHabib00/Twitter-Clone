from locust import TaskSet, task
from http import HTTPStatus


class SignIn(TaskSet):
    @task
    def sign_in(self):
        data = {
            "emailOrUsername": "@YasmeenZaki13",
            "password": "BnSuliman@1"
        }
        with self.client.post("/login", name="signin", data=data, catch_response=True) as response:
            if response.status_code == HTTPStatus.OK:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

    def stop(self):
        self.interrupt()

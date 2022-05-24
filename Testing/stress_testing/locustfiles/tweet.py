from http import HTTPStatus
from locust import TaskSet, task


class Tweet(TaskSet):
    def on_start(self):
        data = {
            "emailOrUsername": "@YasmeenZaki13",
            "password": "BnSuliman@1"
        }
        with self.client.post("/login", name="signin", data=data, catch_response=True) as response:
            if response.status_code == HTTPStatus.OK:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

   # @task
  #  def tweet_text_only(self):
  #      data = {
  #          "content": "stress test"
  #      }
  #      with self.client.post("/tweets", name="tweet_text_only", data=data, catch_response=True) as response:
  #          if response.status_code == HTTPStatus.OK:
  #              response.success()
  #          else:
  #              response.failure(f"Failed! Http Code `{response.status_code}`")

    @task
    def tweet_text_and_image(self):
        data = {
            'content': 'tweeet',
            'images': '@"E:\Sem 6\Software Engineering\Whisper\Testing\stress_testing\locustfiles\test.jpg"'
        }
        with self.client.post("/tweets", name="tweet_with_image", data=data, catch_response=True) as response:
            if response.status_code == HTTPStatus.OK:
                response.success()
            else:
                response.failure(f"Failed! Http Code `{response.status_code}`")

    @task
    def stop(self):
        self.interrupt()

    def on_stop(self):
        pass

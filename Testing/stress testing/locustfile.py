import time
from locust import HttpUser, task, between


# user
class QuickstartUser(HttpUser):
    wait_time = between(1, 5)  # wait time between each task

    @task
    def hello_world(self):  # first task
        self.client.get("/hello")
        self.client.get("/world")

    @task(3)  # bigger weight on task to get chosen more
    def view_items(self):
        for item_id in range(10):
            self.client.get(f"/item?id={item_id}", name="/item")
            time.sleep(1)

    def on_start(self):
        self.client.post("/login", json={"username": "foo", "password": "bar"})

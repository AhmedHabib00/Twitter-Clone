build_test:
	docker build -t whisper/test --target=test .
	docker build -t whisper/audit --target=audit --build-arg MICROSCANNER_TOKEN=$MICROSCANNER .

run_test:
	docker run -e CI=true whisper/test

test: build_test run_test

.PHONY: test
.PHONY: build_test
.PHONY: run_test


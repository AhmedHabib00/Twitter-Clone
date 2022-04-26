build_test:
	docker build -t whispertest -f ./Testing/Dockerfile.test .

run_test:
	docker run -e CI=true whispertest

test: build_test run_test

.PHONY: test
.PHONY: build_test
.PHONY: run_test


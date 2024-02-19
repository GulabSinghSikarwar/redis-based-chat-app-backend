# Running Zookeeper and Kafka with Docker

This guide will help you set up Zookeeper and Kafka using Docker containers. Zookeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and group services. Kafka is a distributed event streaming platform that allows you to publish and subscribe to streams of records.

## Prerequisites

- Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

## Running Zookeeper

To run Zookeeper, execute the following command:

```bash
docker run -p 2181:2181 zookeeper
```

# Running Kafka with Docker

This guide will help you set up Kafka using Docker containers. Kafka is a distributed event streaming platform that allows you to publish and subscribe to streams of records.

## Prerequisites

- Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

## Running Kafka

To run Kafka, execute the following command:

```bash
docker run -p 9092:9092 \
    -e KAFKA_ZOOKEEPER_CONNECT=192.168.29.221:2181 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.29.221:9092 \
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
    confluentinc/cp-kafka

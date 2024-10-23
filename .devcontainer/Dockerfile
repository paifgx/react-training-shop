FROM node:lts-slim

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

EXPOSE 5173

CMD ["/bin/bash"]

FROM node:8.11.1

RUN mkdir -p /tests

# Download wait-for-it as binary waitforit, see  https://github.com/vishnubob/wait-for-it
ENV WAITFORIT_VERSION db04971
ENV WAITFORIT_DOWNLOAD_SHA dd7511b88c5eaf3f8953167ab498f66589143649142a9a2f49a8f33e08584aaf
ENV WAITFORIT_DOWNLOAD_URL https://github.com/vishnubob/wait-for-it/archive/$WAITFORIT_VERSION.tar.gz
RUN curl -SL "$WAITFORIT_DOWNLOAD_URL" --output waitforit.tar.gz \
  && echo "$WAITFORIT_DOWNLOAD_SHA waitforit.tar.gz" | sha256sum -c - \
  && mkdir -p /usr/local/waitforit \
  && tar -xzf "waitforit.tar.gz" -C /usr/local/waitforit --strip-components=1 \
  && rm waitforit.tar.gz \
  && mv /usr/local/waitforit/wait-for-it.sh /usr/local/bin/waitforit \
  && chmod +x /usr/local/bin/waitforit \
  && rm -rf /usr/local/waitforit

WORKDIR /tests

COPY package.json /tests
COPY package-lock.json /tests

RUN npm i

COPY . /tests

CMD tail -f /dev/null

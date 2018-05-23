FROM crossbario/crossbar:cpy3-18.3.1

USER root

RUN apk --update upgrade \
    && apk add nodejs

USER crossbar
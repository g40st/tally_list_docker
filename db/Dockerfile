FROM postgres

ADD ./db_schema/tallyList.sql /docker-entrypoint-initdb.d
RUN chmod 777 /docker-entrypoint-initdb.d/tallyList.sql

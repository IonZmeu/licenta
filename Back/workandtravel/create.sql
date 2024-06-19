
    create sequence com_sequence start with 1 increment by 1;

    create sequence img_sequence start with 1 increment by 1;

    create sequence job_sequence start with 1 increment by 1;

    create sequence thread_sequence start with 1 increment by 1;

    create sequence user_sequence start with 1 increment by 1;

    create table comment_entity (
        depth bigint,
        id bigint not null,
        job_id bigint,
        parent_id bigint,
        thread_id bigint,
        time_created timestamp(6),
        user_id bigint,
        comment_content varchar(255),
        username varchar(255),
        primary key (id)
    );

    create table followed_threads (
        thread_id bigint not null,
        user_id bigint not null
    );

    create table image_entity (
        id bigint not null,
        job_id bigint,
        thread_id bigint,
        image_type varchar(255),
        image_url varchar(255),
        primary key (id)
    );

    create table job_entity (
        likes integer not null,
        salary float(53) not null,
        salary_inusd float(53) not null,
        author_id bigint,
        id bigint not null,
        time_created timestamp(6),
        contact_info varchar(255),
        country varchar(255),
        currency varchar(255),
        description varchar(255),
        email varchar(255),
        job varchar(255),
        lat_coordinate varchar(255),
        long_coordinate varchar(255),
        name varchar(255),
        primary key (id)
    );

    create table thread_entity (
        author_id bigint,
        dislikes bigint,
        id bigint not null,
        likes bigint,
        time_created timestamp(6),
        thread_content varchar(255),
        thread_title varchar(255),
        primary key (id)
    );

    create table user_entity (
        id bigint not null,
        email varchar(255),
        password varchar(255),
        role varchar(255),
        username varchar(255),
        primary key (id)
    );

    alter table if exists comment_entity 
       add constraint FK54wgc0a95a34d0ngtrjl6cthi 
       foreign key (job_id) 
       references job_entity;

    alter table if exists comment_entity 
       add constraint FKrbrdtv4pxa0fw38r208p5xxt3 
       foreign key (parent_id) 
       references comment_entity;

    alter table if exists comment_entity 
       add constraint FKmwsd6h7nw3iq6lnfx4gyu67x5 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists comment_entity 
       add constraint FK7u6osru73338guaca8ukops8l 
       foreign key (user_id) 
       references user_entity;

    alter table if exists followed_threads 
       add constraint FK29h6jelxmgkx4q1vevk6e6q7g 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists followed_threads 
       add constraint FKkygtaou2852cu7rd9a6ln8600 
       foreign key (user_id) 
       references user_entity;

    alter table if exists image_entity 
       add constraint FK5ljh1ineuouuu38fm3e9i2i3d 
       foreign key (job_id) 
       references job_entity;

    alter table if exists image_entity 
       add constraint FKej61ym3815dldo8pmxvfbpx4a 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists job_entity 
       add constraint FK50t6gok8p3qjlxsruqhjgbofx 
       foreign key (author_id) 
       references user_entity;

    alter table if exists thread_entity 
       add constraint FKftrpe8ko5d3iyi84ijtkxb9sh 
       foreign key (author_id) 
       references user_entity;

    create sequence com_sequence start with 1 increment by 1;

    create sequence img_sequence start with 1 increment by 1;

    create sequence job_sequence start with 1 increment by 1;

    create sequence thread_sequence start with 1 increment by 1;

    create sequence user_sequence start with 1 increment by 1;

    create table comment_entity (
        depth bigint,
        id bigint not null,
        job_id bigint,
        parent_id bigint,
        thread_id bigint,
        time_created timestamp(6),
        user_id bigint,
        comment_content varchar(255),
        username varchar(255),
        primary key (id)
    );

    create table followed_threads (
        thread_id bigint not null,
        user_id bigint not null
    );

    create table image_entity (
        id bigint not null,
        job_id bigint,
        thread_id bigint,
        image_type varchar(255),
        image_url varchar(255),
        primary key (id)
    );

    create table job_entity (
        likes integer not null,
        salary float(53) not null,
        salary_inusd float(53) not null,
        author_id bigint,
        id bigint not null,
        time_created timestamp(6),
        contact_info varchar(255),
        country varchar(255),
        currency varchar(255),
        description varchar(255),
        email varchar(255),
        job varchar(255),
        lat_coordinate varchar(255),
        long_coordinate varchar(255),
        name varchar(255),
        primary key (id)
    );

    create table thread_entity (
        author_id bigint,
        dislikes bigint,
        id bigint not null,
        likes bigint,
        time_created timestamp(6),
        thread_content varchar(255),
        thread_title varchar(255),
        primary key (id)
    );

    create table user_entity (
        id bigint not null,
        email varchar(255),
        password varchar(255),
        role varchar(255),
        username varchar(255),
        primary key (id)
    );

    alter table if exists comment_entity 
       add constraint FK54wgc0a95a34d0ngtrjl6cthi 
       foreign key (job_id) 
       references job_entity;

    alter table if exists comment_entity 
       add constraint FKrbrdtv4pxa0fw38r208p5xxt3 
       foreign key (parent_id) 
       references comment_entity;

    alter table if exists comment_entity 
       add constraint FKmwsd6h7nw3iq6lnfx4gyu67x5 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists comment_entity 
       add constraint FK7u6osru73338guaca8ukops8l 
       foreign key (user_id) 
       references user_entity;

    alter table if exists followed_threads 
       add constraint FK29h6jelxmgkx4q1vevk6e6q7g 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists followed_threads 
       add constraint FKkygtaou2852cu7rd9a6ln8600 
       foreign key (user_id) 
       references user_entity;

    alter table if exists image_entity 
       add constraint FK5ljh1ineuouuu38fm3e9i2i3d 
       foreign key (job_id) 
       references job_entity;

    alter table if exists image_entity 
       add constraint FKej61ym3815dldo8pmxvfbpx4a 
       foreign key (thread_id) 
       references thread_entity;

    alter table if exists job_entity 
       add constraint FK50t6gok8p3qjlxsruqhjgbofx 
       foreign key (author_id) 
       references user_entity;

    alter table if exists thread_entity 
       add constraint FKftrpe8ko5d3iyi84ijtkxb9sh 
       foreign key (author_id) 
       references user_entity;

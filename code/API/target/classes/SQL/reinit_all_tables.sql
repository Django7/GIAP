/*
 * This sql builds the tables initially needed.
 * Important: It deletes the tables (if they exist) and creates them new. So make sure, everything is backed up!
 */

/* Disable foreign key checks */
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  uid       INT NOT NULL AUTO_INCREMENT,
  name      TINYTEXT,
  pwd       TINYTEXT,
  mail      TINYTEXT,
  login     BIT              DEFAULT 1,
  login_ctr SMALLINT         DEFAULT 0,
  PRIMARY KEY (uid)
);

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  gid   INT NOT NULL AUTO_INCREMENT,
  id    TINYTEXT,
  name  TINYTEXT,
  basic BIT              DEFAULT 0,
  PRIMARY KEY (gid)
);

DROP TABLE IF EXISTS users_groups;
CREATE TABLE users_groups (
  uid INT,
  gid INT,
  FOREIGN KEY (uid) REFERENCES users (uid),
  FOREIGN KEY (gid) REFERENCES `groups` (gid)
);

DROP TABLE IF EXISTS users_groups_commands;
CREATE TABLE users_groups_commands (
  cmdid        INT NOT NULL AUTO_INCREMENT,
  gid          INT,
  command      TINYTEXT,
  trigger_cmds TEXT,
  sql_command  TEXT,
  FOREIGN KEY (gid) REFERENCES `groups` (gid),
  PRIMARY KEY (cmdid, gid)
);

DROP TABLE IF EXISTS game_td_points;
CREATE TABLE game_td_points (
  uid                INT,
  points             DOUBLE,
  points_incr        DOUBLE,
  representation     TINYTEXT,
  visible_for_others BIT DEFAULT 0,
  last_update        DATETIME,
  FOREIGN KEY (uid) REFERENCES users (uid)
);

DROP TABLE IF EXISTS absolute_leaderboard;
CREATE TABLE absolute_leaderboard (
  uid                INT,
  points             DOUBLE,
  points_incr        DOUBLE,
  representation     TINYTEXT,
  visible_for_others BIT DEFAULT 0,
  last_update        DATETIME,
  FOREIGN KEY (uid) REFERENCES users (uid)
);

DROP TABLE IF EXISTS relative_leaderboard;
CREATE TABLE relative_leaderboard (
  uid                INT,
  points             DOUBLE,
  points_incr        DOUBLE,
  representation     TINYTEXT,
  visible_for_others BIT DEFAULT 0,
  last_update        DATETIME,
  FOREIGN KEY (uid) REFERENCES users (uid)
);

DROP TABLE IF EXISTS choice;
CREATE TABLE choice (
  uid                INT,
  points             DOUBLE,
  points_incr        DOUBLE,
  chosen_group		 INT, /*0 = not chosen yet;1 = absolute leaderboard chosen;2= relative leaderboard chosen*/
  tutorial			INT,
  representation     TINYTEXT,
  visible_for_others BIT DEFAULT 0,
  last_update        DATETIME,
  FOREIGN KEY (uid) REFERENCES users (uid)
);

DROP TABLE IF EXISTS game_custom_jokes;
CREATE TABLE game_custom_jokes (
  jid  INT NOT NULL AUTO_INCREMENT,
  joke TEXT,
  PRIMARY KEY (jid)
);

DROP TABLE IF EXISTS users_game_custom_jokes;
CREATE TABLE users_game_custom_jokes (
  uid       INT,
  jid       INT,
  last_used DATETIME,
  FOREIGN KEY (uid) REFERENCES users (uid),
  FOREIGN KEY (jid) REFERENCES game_custom_jokes (jid)
);

DROP TABLE IF EXISTS images;
CREATE TABLE images (
  iid                 INT NOT NULL AUTO_INCREMENT,
  name                TEXT,
  basic_image         BIT              DEFAULT 0,
  extra_round_counter SMALLINT         DEFAULT 0,
  PRIMARY KEY (iid)
);

DROP TABLE IF EXISTS image_log;
CREATE TABLE image_log (
  uid        INT,
  iid        INT,
  start_time DATETIME,
  end_time   DATETIME,
  in_work    BIT DEFAULT 0,
  FOREIGN KEY (uid) REFERENCES users (uid),
  FOREIGN KEY (iid) REFERENCES images (iid)
);

DROP TABLE IF EXISTS image_tags;
CREATE TABLE image_tags (
  uid INT,
  iid INT,
  tag TEXT,
  FOREIGN KEY (uid) REFERENCES users (uid),
  FOREIGN KEY (iid) REFERENCES images (iid)
);

DROP TABLE IF EXISTS achievements;
CREATE TABLE achievements (
  aid            INT NOT NULL AUTO_INCREMENT,
  name           TINYTEXT,
  description    TEXT,
  pts_to_trigger DOUBLE,
  PRIMARY KEY (aid)
);

DROP TABLE IF EXISTS achievements_users;
CREATE TABLE achievements_users (
  aid INT,
  uid INT,
  FOREIGN KEY (aid) REFERENCES achievements (aid),
  FOREIGN KEY (uid) REFERENCES users (uid)
);

DROP TABLE IF EXISTS questionnaires;
CREATE TABLE questionnaires (
  qid        INT NOT NULL AUTO_INCREMENT,
  quest_name TEXT,
  json_quest TEXT,
  PRIMARY KEY (qid)
);

DROP TABLE IF EXISTS questionnaires_users;
CREATE TABLE questionnaires_users (
  qid         INT,
  uid         INT,
  json_answer TEXT,
  submit_time DATETIME,
  FOREIGN KEY (qid) REFERENCES questionnaires (qid),
  FOREIGN KEY (uid) REFERENCES users (uid),
  UNIQUE KEY qid (qid, uid)
);

DROP TABLE IF EXISTS questionnaires_duration;
CREATE TABLE questionnaires_duration (
  uid        INT,
  quest_name TINYTEXT,
  duration   TINYTEXT,
  FOREIGN KEY (uid) REFERENCES users (uid)
);

/* #############  Pre defined GAME ELEMENTS ############### */
DROP TABLE IF EXISTS goals;
CREATE TABLE goals (
  gid        INT NOT NULL AUTO_INCREMENT,
  text       TEXT,
  type       TINYTEXT,
  comparator TINYTEXT,
  PRIMARY KEY (gid)
);

DROP TABLE IF EXISTS goals_users;
CREATE TABLE goals_users (
  gid         INT,
  uid         INT,
  identifier  TEXT,
  trigger_val TINYTEXT,
  FOREIGN KEY (gid) REFERENCES goals (gid),
  FOREIGN KEY (uid) REFERENCES users (uid)
);


/* Allow the foreign key checks again */
SET FOREIGN_KEY_CHECKS = 1;


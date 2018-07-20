###################################################################################################
#       Commands to get information from the database and the participants                        #
###################################################################################################

# Get the number of finished questionnaires for the respective groups
SELECT
  gid,
  count(qid)
FROM questionnaires_users
  INNER JOIN users_groups ON questionnaires_users.uid = users_groups.uid
WHERE qid = 2 AND gid != 7
GROUP BY gid;

###########################  FILTERING OUT THE INVALID USERS ######################################

DELETE FROM image_tags
WHERE
  length(tag) = 0 OR
  uid NOT IN
  (518,520,544,546,581,584,589,592,598,604);

DELETE FROM image_log
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

DELETE FROM questionnaires_users
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

DELETE FROM questionnaires_duration
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

DELETE FROM users_groups
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

DELETE FROM game_td_points
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

DELETE FROM users
WHERE uid NOT IN
      (518,520,544,546,581,584,589,592,598,604);

###################################################################################################

# Get all tags
SELECT
  uid,
  iid,
  lower(tag)
FROM image_tags
WHERE length(tag) > 0;

# Get duration for images for each user
SELECT
  image_log.uid,
  gid,
  iid,
  time_to_sec(timediff(end_time, start_time)) AS timediff
FROM image_log
  INNER JOIN users_groups ON image_log.uid = users_groups.uid;

# Get average duration for image for each user (basic images  + bonus)
SELECT
  image_log.uid,
  GROUP_CONCAT(DISTINCT gid)                       AS group_list,
  avg(time_to_sec(timediff(end_time, start_time))) AS timediff
FROM image_log
  INNER JOIN users_groups ON image_log.uid = users_groups.uid
WHERE iid > 3
GROUP BY uid;

# Get average duration for image for each user (basic images)
SELECT
  image_log.uid,
  avg(time_to_sec(timediff(end_time, start_time))) AS timediff
FROM image_log
  INNER JOIN users_groups ON image_log.uid = users_groups.uid
WHERE iid > 3 AND iid <= 18
GROUP BY uid;

# Get average duration for image for each user (bonus images)
SELECT
  image_log.uid,
  GROUP_CONCAT(DISTINCT gid)                       AS group_list,
  avg(time_to_sec(timediff(end_time, start_time))) AS timediff
FROM image_log
  INNER JOIN users_groups ON image_log.uid = users_groups.uid
WHERE iid > 18
GROUP BY uid;

# Get duration for questionnaires for each user
SELECT
  questionnaires_duration.uid,
  group_concat(gid),
  quest_name,
  duration
FROM questionnaires_duration
  INNER JOIN users_groups ON questionnaires_duration.uid = users_groups.uid
GROUP BY questionnaires_duration.uid, quest_name;

# Number of images solved in total (incl. tutorial)
SELECT
  image_log.uid,
  count(iid) AS num_of_images_solved
FROM image_log
GROUP BY uid;

# number of images solved in total (excl. tutorial)
SELECT
  image_log.uid,
  count(iid) AS num_of_images_solved
FROM image_log
WHERE iid > 3
GROUP BY uid;

# number of extra images solved
SELECT
  image_log.uid,
  count(iid) AS num_of_extra_images_solved
FROM image_log
WHERE iid > 18
GROUP BY uid;

# number of extra rounds solved
SELECT
  image_log.uid,
  Floor(count(iid) / 5) AS num_of_extra_rounds_solved
FROM image_log
WHERE iid > 18
GROUP BY uid;

# Get all tags for all images
SELECT *
FROM image_tags
WHERE length(tag) > 0;

# Get all tags, grouped by image and tag
SELECT
  iid,
  count(tag) AS frequency,
  lower(tag)
FROM image_tags
WHERE length(tag) > 0
GROUP BY iid, lower(tag);

# get total number of tags for each user
SELECT
  uid,
  count(tag)
FROM image_tags
WHERE length(tag) > 0
GROUP BY uid;

# get total number of tags (tutorial) for each user
SELECT
  uid,
  count(tag)
FROM image_tags
WHERE length(tag) > 0 AND iid <= 3
GROUP BY uid;

# get total number of tags (basic) for each user
SELECT
  uid,
  count(tag)
FROM image_tags
WHERE length(tag) > 0 AND iid > 3 AND iid <= 18
GROUP BY uid;

# get total number of tags (extra) for each user
SELECT
  uid,
  count(tag)
FROM image_tags
WHERE length(tag) > 0 AND iid > 18
GROUP BY uid;

######################################################################################################
############################################### RATING ###############################################
ALTER TABLE image_tags
  ADD rating INT(11);

ALTER TABLE image_tags
  ADD rating_2 INT(11);

# ******************************* RATING 1 ***************************

# get average quality (all images)
SELECT
  uid,
  avg(rating) AS avg_rating
FROM image_tags
GROUP BY uid
ORDER BY uid;

# get average quality (tutorial only)
SELECT
  uid,
  avg(rating) AS avg_rating
FROM image_tags
WHERE iid <= 3
GROUP BY uid
ORDER BY uid;

# get average quality (basic only)
SELECT
  uid,
  avg(rating) AS avg_rating
FROM image_tags
WHERE iid > 3 AND iid <= 18
GROUP BY uid
ORDER BY uid;

# get average quality (extra only)
SELECT
  uid,
  avg(rating) AS avg_rating
FROM image_tags
WHERE iid > 18
GROUP BY uid
ORDER BY uid;

# ********************************* RATING 2 *******************************
# get average quality (all images)
SELECT
  uid,
  avg(rating_2) AS avg_rating
FROM image_tags
GROUP BY uid
ORDER BY uid;

# get average quality (tutorial only)
SELECT
  uid,
  avg(rating_2) AS avg_rating
FROM image_tags
WHERE iid <= 3
GROUP BY uid
ORDER BY uid;

# get average quality (basic only)
SELECT
  uid,
  avg(rating_2) AS avg_rating
FROM image_tags
WHERE iid > 3 AND iid <= 18
GROUP BY uid
ORDER BY uid;

# get average quality (extra only)
SELECT
  uid,
  avg(rating_2) AS avg_rating
FROM image_tags
WHERE iid > 18
GROUP BY uid
ORDER BY uid;

# ********************************* RATING MEANS *******************************

# get average quality (tutorial only)
SELECT
  uid,
  avg((rating + rating_2)/2) AS avg_rating
FROM image_tags
WHERE iid <= 3
GROUP BY uid
ORDER BY uid;

# get average quality (basic only)
SELECT
  uid,
  avg((rating + rating_2)/2) AS avg_rating
FROM image_tags
WHERE iid > 3 AND iid <= 18
GROUP BY uid
ORDER BY uid;

# get average quality (extra only)
SELECT
  uid,
  avg((rating + rating_2)/2) AS avg_rating
FROM image_tags
WHERE iid > 18
GROUP BY uid
ORDER BY uid;

######################################################################################################

# Finished questionnaires in numbers
SELECT
  gid,
  count(users_groups.uid)
FROM questionnaires_duration
  INNER JOIN users_groups ON questionnaires_duration.uid = users_groups.uid AND quest_name != '"demographics"'
GROUP BY gid;

# Finished questionnaires (non demographics) --> finished studies of part 1
SELECT
  questionnaires_duration.uid,
  quest_name,
  gid,
  count(gid)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
WHERE quest_name != '"demographics"' AND questionnaires_duration.uid > 43
GROUP BY gid;

# Finished questionnaires (demographics)
SELECT
  questionnaires_duration.uid,
  quest_name,
  gid,
  count(gid)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
WHERE quest_name = '"demographics"' AND questionnaires_duration.uid > 43
GROUP BY gid;

# Registered users
SELECT count(*)
FROM users
WHERE uid > 43;

# Users with 0 logins (registered, but not logged in = mobile devices)
SELECT *
FROM users
WHERE uid > 43 AND login_ctr = 0;

# Logins in total
SELECT sum(login_ctr)
FROM users
WHERE uid > 43;

# Tags in total
SELECT count(*)
FROM image_tags
WHERE uid > 43;

# Tags without tutorial images
SELECT count(*)
FROM image_tags
WHERE uid > 43
      AND iid > 3;

# Users number of images
SELECT
  uid,
  count(*)
FROM image_log
WHERE uid > 43
GROUP BY uid
ORDER BY count(*);

# Get the number of tutorial tags for each participants
SELECT
  questionnaires_duration.uid,
  gid - 1,
  count(tag)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
  INNER JOIN image_tags ON questionnaires_duration.uid = image_tags.uid
WHERE quest_name = '"end_normal"' AND length(tag) > 0 AND iid <= 3
GROUP BY questionnaires_duration.uid;

# Get the number of tags for each participants (exclusive extra round)
SELECT
  questionnaires_duration.uid,
  gid - 1,
  count(tag)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
  INNER JOIN image_tags ON questionnaires_duration.uid = image_tags.uid
WHERE quest_name = '"end_normal"' AND length(tag) > 0 AND iid > 3 AND iid <= 18
GROUP BY questionnaires_duration.uid;

# Get the number of EXTRA ROUND tags for each participants
SELECT
  questionnaires_duration.uid,
  gid - 1,
  count(tag)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
  INNER JOIN image_tags ON questionnaires_duration.uid = image_tags.uid
WHERE quest_name = '"end_normal"' AND length(tag) > 0 AND iid > 18
GROUP BY questionnaires_duration.uid;

# Get the number of tags for each participant in each image
SELECT
  questionnaires_duration.uid,
  gid - 1,
  iid,
  count(tag)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
  INNER JOIN image_tags ON questionnaires_duration.uid = image_tags.uid
WHERE quest_name = '"end_normal"' AND length(tag) > 0 AND iid > 3 AND iid <= 18
GROUP BY questionnaires_duration.uid, iid;

# Get the number of tags for each participant in each EXTRA ROUND image
SELECT
  questionnaires_duration.uid,
  gid - 1,
  iid,
  count(tag)
FROM questionnaires_duration
  INNER JOIN users_groups ON users_groups.uid = questionnaires_duration.uid
  INNER JOIN image_tags ON questionnaires_duration.uid = image_tags.uid
WHERE quest_name = '"end_normal"' AND length(tag) > 0 AND iid > 18
GROUP BY questionnaires_duration.uid, iid;

# ------------------ Image + image Tags ------------------------- #
SELECT *
FROM images;

SELECT count(*) AS 'Number of images (total)'
FROM images;

SELECT count(*) AS 'Number of non-basic images'
FROM images
WHERE basic_image = 0;

SELECT *
FROM image_tags
ORDER BY uid ASC;

SELECT *
FROM image_tags
ORDER BY iid ASC;

SELECT count(*) AS 'Number of tagged images'
FROM image_tags;

# ---------------- Questionnaire answers ----------------- #
SELECT *
FROM questionnaires_users
ORDER BY qid;

SELECT *
FROM questionnaires_users
ORDER BY uid;

SELECT count(*) 'Number of finished questionnaires (total)'
FROM questionnaires_users;

# -------------------- Users ----------------------------- #
SELECT *
FROM users;

SELECT count(*) AS 'Users'
FROM users;

# No gamification
SELECT count(*) AS 'No gamification'
FROM users_groups
WHERE gid = 1;

# Top down gamification (Points + Leaderboard)
SELECT count(*) AS 'Top down gamification'
FROM users_groups
WHERE gid = 2;

# Design task
SELECT count(*) AS 'design task'
FROM users_groups
WHERE gid = 4;

# ------------- Users finished final questionnaire ----------- #
# The final questionnaire (total)
SELECT count(*) 'Number of finished studies'
FROM questionnaires_users
WHERE qid = (
  SELECT qid
  FROM questionnaires
  WHERE quest_name = 'end_normal');

# The final questionnaire for the design
SELECT count(*) 'Number of finished studies'
FROM questionnaires_users
WHERE qid = (
  SELECT qid
  FROM questionnaires
  WHERE quest_name = 'end_design');

# Get the finished questionnaires of a certain group and certain
SELECT count(*) AS num
FROM users_groups
  INNER JOIN questionnaires_users ON users_groups.uid = questionnaires_users.uid
WHERE gid = (SELECT gid
             FROM groups
             WHERE name = 'design_task')
      AND qid = (SELECT qid
                 FROM questionnaires
                 WHERE quest_name = 'design');

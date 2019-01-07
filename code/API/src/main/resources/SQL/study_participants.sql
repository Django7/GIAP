#############################################################################################
#                                       GROUP SPECIFIC                                      #
#############################################################################################

# Statistics group commands
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_my_tag_count', '',
         'SELECT count(*) AS num FROM image_tags WHERE length(tag) > 0 AND iid > 3 AND uid = %UID%');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_my_last_image_tag_count', '',
         'SELECT count(*) AS num FROM image_tags WHERE length(tag)>0 AND uid=%UID% AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND iid > 3 ORDER BY end_time DESC LIMIT 1)');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_mood_count_for_this_image', '',
         'SELECT count(*) AS num FROM (SELECT lower(tag) AS num FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag) ) AS tags_for_this_image');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_most_40_tags_for_this_image', '',
         'SELECT count(lower(tag)) AS num, tag FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag), tag ORDER BY count(lower(tag)) DESC LIMIT 40');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_most_25_tags_for_this_image', '',
         'SELECT count(lower(tag)) AS num, tag FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag), tag ORDER BY count(lower(tag)) DESC LIMIT 25');


INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_most_20_tags_for_this_image', '',
         'SELECT count(lower(tag)) AS num, tag FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag), tag ORDER BY count(lower(tag)) DESC LIMIT 20');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_most_15_tags_for_this_image', '',
         'SELECT count(lower(tag)) AS num, tag FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag), tag ORDER BY count(lower(tag)) DESC LIMIT 15');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_most_10_tags_for_this_image', '',
         'SELECT count(lower(tag)) AS num, tag FROM image_tags WHERE length(tag) > 0 AND iid = (SELECT iid FROM image_log WHERE uid = %UID% AND in_work = 1) GROUP BY lower(tag), tag ORDER BY count(lower(tag)) DESC LIMIT 10');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'statistics'), 'get_worked_images', '',
         'SELECT count(*) AS num FROM image_log WHERE uid=%UID% AND iid > 3');

#############################################################################################
#                                       CONCEPT SPECIFIC                                    #
#############################################################################################

/**
####################### Points 17 (151) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_151', 'id_points_151', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 151;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (151, (SELECT gid
               FROM groups
               WHERE name = 'id_points_151'));

INSERT INTO users_groups (uid, gid)
  VALUE (151, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));


/**
####################### POINTS REVIEW 15 (210) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_review_210', 'id_points_review_210', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 210;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (210, (SELECT gid
               FROM groups
               WHERE name = 'id_points_review_210'));

INSERT INTO users_groups (uid, gid)
  VALUE (210, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### Aquarium 21 (339) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_aquarium_339', 'id_aquarium_339', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 339;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (339, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (339, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### teams_simple 6 (104) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_teams_simple_104', 'id_teams_simple_104', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 104;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (104, (SELECT gid
               FROM groups
               WHERE name = 'id_teams_simple_104'));

INSERT INTO users_groups (uid, gid)
  VALUE (104, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### Points 5 (96) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_96', 'id_points_96', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 96;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (96, (SELECT gid
              FROM groups
              WHERE name = 'id_points_96'));

INSERT INTO users_groups (uid, gid)
  VALUE (96, (SELECT gid
              FROM groups
              WHERE id = 'statistics'));

/**
####################### complex 8 (115) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_complex_115', 'id_complex_115', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 115;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (115, (SELECT gid
               FROM groups
               WHERE name = 'id_complex_115'));

INSERT INTO users_groups (uid, gid)
  VALUE (115, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### POINTS REVIEW 9 (125) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_review_125', 'id_points_review_125', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 125;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (125, (SELECT gid
               FROM groups
               WHERE name = 'id_points_review_125'));

INSERT INTO users_groups (uid, gid)
  VALUE (125, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### POINTS SIMILAR 4 (61) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_similar_61', 'id_points_similar_61', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 61;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (61, (SELECT gid
              FROM groups
              WHERE name = 'id_points_similar_61'));

INSERT INTO users_groups (uid, gid)
  VALUE (61, (SELECT gid
              FROM groups
              WHERE id = 'statistics'));

/**
####################### POINTS REVIEW 31 (438) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_points_review_438', 'id_points_review_438', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 438;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (438, (SELECT gid
               FROM groups
               WHERE name = 'id_points_review_438'));

INSERT INTO users_groups (uid, gid)
  VALUE (438, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### single_teams (407) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_single_teams_407', 'id_single_teams_407', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 407;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (407, (SELECT gid
               FROM groups
               WHERE name = 'id_single_teams_407'));

INSERT INTO users_groups (uid, gid)
  VALUE (407, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

/**
####################### beat your friend 1 (51) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_beat_friend_51', 'id_beat_friend_51', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 51;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (51, (SELECT gid
              FROM groups
              WHERE name = 'id_beat_friend_51'));

INSERT INTO users_groups (uid, gid)
  VALUE (51, (SELECT gid
              FROM groups
              WHERE id = 'statistics'));

/**
####################### levels 41 (498) #################
 */

# Group definitions
INSERT INTO groups (id, name, basic) VALUE ('id_levels_498', 'id_levels_498', 0);

# Change design group to design implemented
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 498;

# Add user to respective groups
INSERT INTO users_groups (uid, gid)
  VALUE (498, (SELECT gid
               FROM groups
               WHERE name = 'id_levels_498'));

INSERT INTO users_groups (uid, gid)
  VALUE (498, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# /**
# ####################### teams_points 24 (369) #################
#  */
#
# # Group definitions
# INSERT INTO groups (id, name, basic) VALUE ('id_teams_points_369', 'id_teams_points_369', 0);
#
# # Change design group to design implemented
# UPDATE users_groups
# SET gid = (SELECT gid
#            FROM groups
#            WHERE name = 'design_implemented')
# WHERE uid = 369;
#
# # Add user to respective groups
# INSERT INTO users_groups (uid, gid)
#   VALUE (369, (SELECT gid
#               FROM groups
#               WHERE name = 'id_teams_points_369'));
#
# INSERT INTO users_groups (uid, gid)
#   VALUE (369, (SELECT gid
#               FROM groups
#               WHERE id = 'statistics'));


/**
####################### SHORT_NAME CID (UID) #################
 */

# Group definitions

# Change design group to design implemented

# Add user to respective groups

# Add commands

# Others

/**
################ TEST USER ######################
 */
# 494
# https://dobuch.de/?usr=qo7Z67v1NB&pwd=glVL0fJ7CE


# UPDATE users_groups
# SET gid = (SELECT gid
#            FROM groups
#            WHERE name = 'design_implemented')
# WHERE uid = 494;
#
# INSERT INTO users_groups (uid, gid)
#   VALUE (494, (SELECT gid
#               FROM groups
#               WHERE name = 'generic_implementation'));
#
# INSERT INTO users_groups (uid, gid)
#   VALUE (494, (SELECT gid
#               FROM groups
#               WHERE name = 'id_levels_498'));
#
# INSERT INTO users_groups (uid, gid)
#   VALUE (494, (SELECT gid
#               FROM groups
#               WHERE id = 'statistics'));


/**
####################### USERS THAT USE THE PREDEFINED IMPLEMENTATION #################
 */

# Group definitions
# Only one time
INSERT INTO groups (id, name, basic) VALUE ('generic_implementation', 'generic_implementation', 0);

# ##########  55  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 55;

INSERT INTO users_groups (uid, gid)
  VALUE (55, (SELECT gid
              FROM groups
              WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (55, (SELECT gid
              FROM groups
              WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (55, (SELECT gid
              FROM groups
              WHERE id = 'statistics'));

# ##########  59  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 59;

INSERT INTO users_groups (uid, gid)
  VALUE (59, (SELECT gid
              FROM groups
              WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (59, (SELECT gid
              FROM groups
              WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (59, (SELECT gid
              FROM groups
              WHERE id = 'statistics'));

# ##########  105  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 105;

INSERT INTO users_groups (uid, gid)
  VALUE (105, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (105, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (105, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  132  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 132;

INSERT INTO users_groups (uid, gid)
  VALUE (132, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (132, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (132, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  135  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 135;

INSERT INTO users_groups (uid, gid)
  VALUE (135, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (135, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (135, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  155  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 155;

INSERT INTO users_groups (uid, gid)
  VALUE (155, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (155, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (155, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  183  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 183;

INSERT INTO users_groups (uid, gid)
  VALUE (183, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (183, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (183, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  209  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 209;

INSERT INTO users_groups (uid, gid)
  VALUE (209, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (209, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (209, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  216  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 216;

INSERT INTO users_groups (uid, gid)
  VALUE (216, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (216, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (216, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  292  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 292;

INSERT INTO users_groups (uid, gid)
  VALUE (292, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (292, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (292, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  300  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 300;

INSERT INTO users_groups (uid, gid)
  VALUE (300, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (300, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (300, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  301  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 301;

INSERT INTO users_groups (uid, gid)
  VALUE (301, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (301, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (301, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  341  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 341;

INSERT INTO users_groups (uid, gid)
  VALUE (341, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (341, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (341, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  369  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 369;

INSERT INTO users_groups (uid, gid)
  VALUE (369, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (369, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (369, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  353  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 353;

INSERT INTO users_groups (uid, gid)
  VALUE (353, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (353, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (353, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  381  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 381;

INSERT INTO users_groups (uid, gid)
  VALUE (381, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (381, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (381, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  398  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 398;

INSERT INTO users_groups (uid, gid)
  VALUE (398, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (398, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (398, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  426  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 426;

INSERT INTO users_groups (uid, gid)
  VALUE (426, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (426, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (426, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  432  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 432;

INSERT INTO users_groups (uid, gid)
  VALUE (432, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (432, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (432, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  441  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 441;

INSERT INTO users_groups (uid, gid)
  VALUE (441, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (441, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (441, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  449  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 449;

INSERT INTO users_groups (uid, gid)
  VALUE (449, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (449, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (449, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  456  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 456;

INSERT INTO users_groups (uid, gid)
  VALUE (456, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (456, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (456, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  471  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 471;

INSERT INTO users_groups (uid, gid)
  VALUE (471, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (471, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (471, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  384  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 384;

INSERT INTO users_groups (uid, gid)
  VALUE (384, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (384, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (384, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  461  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 461;

INSERT INTO users_groups (uid, gid)
  VALUE (461, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (461, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (461, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  488  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 488;

INSERT INTO users_groups (uid, gid)
  VALUE (488, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (488, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (488, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

# ##########  502  ###############
UPDATE users_groups
SET gid = (SELECT gid
           FROM groups
           WHERE name = 'design_implemented')
WHERE uid = 502;

INSERT INTO users_groups (uid, gid)
  VALUE (502, (SELECT gid
               FROM groups
               WHERE name = 'generic_implementation'));

INSERT INTO users_groups (uid, gid)
  VALUE (502, (SELECT gid
               FROM groups
               WHERE name = 'id_aquarium_339'));

INSERT INTO users_groups (uid, gid)
  VALUE (502, (SELECT gid
               FROM groups
               WHERE id = 'statistics'));

#############################################################################################
#                                       TD AQUARIUM USERS                                   #
#############################################################################################

# Make user group assignment unique
# WARNING: TABLE structure change!
ALTER TABLE users_groups
  ADD UNIQUE (uid, gid);

# Make aquarium a basic condition
# WARNING: Don't forget to change in API properties as well
UPDATE groups
SET basic = TRUE
WHERE id = 'id_aquarium_339';

# Adds A SPECIFIC USER to the statistics group (should get done in an automatic way)
#INSERT IGNORE INTO users_groups (uid, gid) VALUE (604, (SELECT gid FROM groups WHERE id = 'statistics'));

# Adds the user to the statistic group after logging in, if it's not yet in.
# After logging in means: If the user does not yet belong to the statistics group, the client wont see it, until logging in again.
# On the current platform, this is not a problem (all other stuff is done on the server), but keep this in mind when extending the platform
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE id = 'id_aquarium_339'), 'add_user_to_statistics_group', 'LOGIN',
         'INSERT IGNORE INTO users_groups (uid, gid) VALUE (%UID%, (SELECT gid FROM groups WHERE id = \'statistics\'))');

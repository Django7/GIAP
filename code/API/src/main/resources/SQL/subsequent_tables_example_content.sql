/**
  Contains SQL statements that need to get executed after the basic transmission.
  It relies on the newly created table content and hence MUST get executed after  it.
 */

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE
  ((SELECT gid
    FROM groups
    WHERE name = 'design_implemented'),
   'get_concept', '', 'select json_answer from questionnaires_users where uid=%UID% and qid=(select qid from questionnaires where quest_name=\'design\')');

/* Insert the sql commands for the -currently existing- groups */
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE
  ((SELECT gid
    FROM groups
    WHERE name = 'game_td_points'),
   'get_points', '', 'SELECT points, points_incr FROM game_td_points WHERE uid = %UID%');
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE
  ((SELECT gid
    FROM groups
    WHERE name = 'game_td_points'),
   'get_leaderboard', '',
   'SELECT users.name, points FROM game_td_points INNER JOIN users ON game_td_points.uid = users.uid WHERE game_td_points.uid = %UID% OR visible_for_others = 1 ORDER BY points DESC');
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE
  ((SELECT gid
    FROM groups
    WHERE name = 'game_td_points'),
   'set_points', '', 'INSERT INTO game_td_points (points, last_update) VALUE (?, ?)');
/* INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE
  ((SELECT gid
    FROM groups
    WHERE name = 'game_custom_jokes'),
   'get_joke', '', 'SELECT * FROM game_custom_jokes ORDER BY RAND() LIMIT 1'); */
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_td_points'),
         'inc_points', 'POST',
         'UPDATE game_td_points SET points = ((SELECT count(*) FROM image_tags WHERE uid=%UID% AND length(tag) > 0 AND iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\')) * points_incr) WHERE uid=%UID%');

/* achievements */
/* INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'achievement'), 'get_achievements', '',
         'SELECT name, description, pts_to_trigger, (points >= pts_to_trigger) as triggered FROM achievements INNER JOIN game_td_points WHERE uid = %UID%');
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'achievement'), 'get_points', '',
         'SELECT points, points_incr FROM game_td_points WHERE uid = %UID%');
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'achievement'), 'inc_points', 'POST',
         'UPDATE game_td_points SET points = ((SELECT count(*) FROM image_tags WHERE uid=%UID% AND length(tag) > 0 AND iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\')) * points_incr) WHERE uid=%UID%');
*/

/* goals */
/* INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_custom_goals'), 'get_stats', '',
         'SELECT count(*) AS tag_counter, TIMESTAMPDIFF(SECOND, start_time, end_time) AS duration FROM image_tags INNER JOIN image_log ON image_log.iid = image_tags.iid WHERE image_tags.uid=%UID% AND image_log.uid=%UID%  AND length(tag) > 0 AND image_tags.iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\') GROUP BY image_log.iid, start_time, end_time;');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_levels_farm'), 'get_stats', '',
         'SELECT count(*) AS tag_counter, TIMESTAMPDIFF(SECOND, start_time, end_time) AS duration FROM image_tags INNER JOIN image_log ON image_log.iid = image_tags.iid WHERE image_tags.uid=%UID% AND image_log.uid=%UID%  AND length(tag) > 0 AND image_tags.iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\') GROUP BY image_log.iid, start_time, end_time;');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_custom_goals'), 'get_goals', '',
         'SELECT text, type, comparator, gu.identifier, trigger_val FROM goals INNER JOIN goals_users gu ON goals.gid = gu.gid WHERE uid = %UID%');
*/
/* Compare others */
/* INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_compare_others'), 'get_others_tags', '',
         'SELECT lower(tag) AS tag, count(*) AS tag_count FROM image_tags WHERE iid IN (IFNULL((SELECT iid FROM image_log WHERE uid=%UID% AND in_work = 1), (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\'))) AND length(tag) > 0 GROUP BY lower(tag) ORDER BY count(*) DESC LIMIT 20;');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_compare_others'), 'get_accordance', '',
         'SELECT count(*) AS accordance FROM image_tags it_1 INNER JOIN image_tags it_2 ON it_1.iid = it_2.iid WHERE it_1.uid = %UID% AND it_2.uid != %UID% AND it_1.tag = it_2.tag;');
*/
/* Compare with timer */
/*INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_compare_time'), 'get_all_tags', '',
         'SELECT tag FROM image_tags WHERE uid=%UID% AND iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\') AND Length(tag) > 0;');
*/
/* Dictionary */
/*INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_dictionary'), 'get_all_tags', '',
         'SELECT tag FROM image_tags WHERE uid=%UID% AND iid NOT IN (SELECT iid FROM images WHERE name LIKE \'TUTORIAL%\') AND Length(tag) > 0 GROUP BY tag;');
*/
/* Summary */
/*INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_summary'), 'get_all_my_tags', '',
         'SELECT name, GROUP_CONCAT(DISTINCT tag SEPARATOR \', \') AS my_tags FROM images INNER JOIN image_tags it ON images.iid = it.iid WHERE uid = %UID% AND name NOT LIKE \'TUTORIAL%\' AND length(tag) > 0 GROUP BY images.iid;');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_summary'), 'get_all_others_tags', '',
         'SELECT name, GROUP_CONCAT(DISTINCT tag SEPARATOR \', \') AS others_tags FROM images INNER JOIN image_tags it ON images.iid = it.iid WHERE uid != %UID% AND name NOT LIKE \'TUTORIAL%\' AND length(tag) > 0 GROUP BY images.iid;');
*/
/* Questionnaire duration update */
INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'none'), 'set_questionnaire_duration', '',
         'INSERT INTO questionnaires_duration (uid, quest_name, duration) VALUE (%UID%, ?, ?);');


INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'game_td_points'), 'set_questionnaire_duration', '',
         'INSERT INTO questionnaires_duration (uid, quest_name, duration) VALUE (%UID%, ?, ?);');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'design_implemented'), 'set_questionnaire_duration', '',
         'INSERT INTO questionnaires_duration (uid, quest_name, duration) VALUE (%UID%, ?, ?);');

INSERT INTO users_groups_commands (gid, command, trigger_cmds, sql_command)
  VALUE ((SELECT gid
          FROM groups
          WHERE name = 'design_task'), 'set_questionnaire_duration', '',
         'INSERT INTO questionnaires_duration (uid, quest_name, duration) VALUE (%UID%, ?, ?);');

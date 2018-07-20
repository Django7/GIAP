####################################################################################
#
#
# !WARNING! !WARNING! !WARNING! !WARNING! !WARNING! !WARNING! !WARNING! !WARNING!
#
#
# Those commands delete every entry of all participants of the first study.
# Make sure you have a backup
#
####################################################################################

DELETE FROM image_tags
WHERE uid < 516;
DELETE FROM image_log
WHERE uid < 516;
DELETE FROM questionnaires_users
WHERE uid < 516;
DELETE FROM questionnaires_duration
WHERE uid < 516;
DELETE FROM users_groups
WHERE uid < 516;
DELETE FROM game_td_points
WHERE uid < 516;
DELETE FROM users
WHERE uid < 516;

/*
 * Inserts example data to the database tables.
 */

/* Regular users */
INSERT INTO users (name, pwd, mail) VALUE ('user_name', 'safe1', 'mail1');
INSERT INTO users (name, pwd, mail) VALUE ('max', 'safe2', 'mail2');
INSERT INTO users (name, pwd, mail) VALUE ('pascal', 'safe3', 'mail3');
INSERT INTO users (name, pwd, mail) VALUE ('peter', 'safe4', 'mail4');

/* Fixed users for leaderboard */
INSERT INTO users (name, pwd, mail, login) VALUE ('verdani', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('neo23', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('legolas', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('anork85', '', '', 0);

/* the groups */
INSERT INTO groups (name, id, basic) VALUE ('none', 'none', 1);
INSERT INTO groups (name, id, basic) VALUE ('game_td_points', 'td', 1);
INSERT INTO groups (name, id, basic) VALUE ('design_task', 'design', 1);
INSERT INTO groups (name, id, basic) VALUE ('design_implemented', 'design_implemented', 0);

/* map users to user groups */
INSERT INTO users_groups (uid, gid) VALUE (1, 1);
INSERT INTO users_groups (uid, gid) VALUE (2, 2);
INSERT INTO users_groups (uid, gid) VALUE (3, 3);
INSERT INTO users_groups (uid, gid) VALUE (4, 4);
INSERT INTO users_groups (uid, gid) VALUE (5, 5);

/* insert default points to users */
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (1, 0, 100, 'points', NOW(), 0);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update)
  VALUE (2, 0, 100, 'points', NOW());
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update)
  VALUE (4, 0, 100, 'points', NOW());
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 0, 100, 'points', NOW(), 0);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (618, 6000, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (619, 2900, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (620, 1100, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (621, 10200, 0, 'points', NOW(), 1);

# Insert the tutorial image to the
INSERT INTO images (name, basic_image) VALUE ('TUTORIAL_1', 0);
INSERT INTO images (name, basic_image) VALUE ('TUTORIAL_2', 0);
INSERT INTO images (name, basic_image) VALUE ('TUTORIAL_3', 0);

/* Basic images (15) */
INSERT INTO images (name, basic_image) VALUE ('abstract_0010.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0056.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0061.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0075.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0106.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0119.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0120.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0134.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0168.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0197.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0202.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0207.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0239.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0256.jpg', 1);
INSERT INTO images (name, basic_image) VALUE ('abstract_0278.jpg', 1);

/* Images for additional rounds (100) */
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0004.jpg', 0, 1);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0005.jpg', 0, 2);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0006.jpg', 0, 3);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0007.jpg', 0, 4);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0008.jpg', 0, 5);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0009.jpg', 0, 6);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0011.jpg', 0, 7);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0012.jpg', 0, 8);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0013.jpg', 0, 9);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0014.jpg', 0, 10);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0015.jpg', 0, 11);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0016.jpg', 0, 12);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0018.jpg', 0, 13);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0019.jpg', 0, 14);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0020.jpg', 0, 15);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0021.jpg', 0, 16);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0022.jpg', 0, 17);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0023.jpg', 0, 18);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0025.jpg', 0, 19);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0026.jpg', 0, 20);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0027.jpg', 0, 1);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0028.jpg', 0, 2);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0029.jpg', 0, 3);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0030.jpg', 0, 4);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0031.jpg', 0, 5);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0032.jpg', 0, 6);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0033.jpg', 0, 7);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0034.jpg', 0, 8);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0035.jpg', 0, 9);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0036.jpg', 0, 10);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0037.jpg', 0, 11);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0038.jpg', 0, 12);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0039.jpg', 0, 13);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0040.jpg', 0, 14);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0041.jpg', 0, 15);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0042.jpg', 0, 16);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0043.jpg', 0, 17);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0044.jpg', 0, 18);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0045.jpg', 0, 19);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0046.jpg', 0, 20);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0047.jpg', 0, 1);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0048.jpg', 0, 2);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0049.jpg', 0, 3);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0050.jpg', 0, 4);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0051.jpg', 0, 5);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0052.jpg', 0, 6);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0053.jpg', 0, 7);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0054.jpg', 0, 8);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0055.jpg', 0, 9);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0057.jpg', 0, 10);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0058.jpg', 0, 11);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0059.jpg', 0, 12);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0060.jpg', 0, 13);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0062.jpg', 0, 14);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0063.jpg', 0, 15);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0064.jpg', 0, 16);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0065.jpg', 0, 17);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0066.jpg', 0, 18);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0067.jpg', 0, 19);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0068.jpg', 0, 20);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0069.jpg', 0, 1);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0070.jpg', 0, 2);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0072.jpg', 0, 3);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0073.jpg', 0, 4);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0074.jpg', 0, 5);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0076.jpg', 0, 6);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0077.jpg', 0, 7);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0078.jpg', 0, 8);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0079.jpg', 0, 9);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0080.jpg', 0, 10);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0081.jpg', 0, 11);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0082.jpg', 0, 12);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0083.jpg', 0, 13);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0084.jpg', 0, 14);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0085.jpg', 0, 15);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0086.jpg', 0, 16);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0087.jpg', 0, 17);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0088.jpg', 0, 18);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0089.jpg', 0, 19);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0090.jpg', 0, 20);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0091.jpg', 0, 1);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0092.jpg', 0, 2);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0093.jpg', 0, 3);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0094.jpg', 0, 4);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0095.jpg', 0, 5);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0096.jpg', 0, 6);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0097.jpg', 0, 7);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0098.jpg', 0, 8);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0099.jpg', 0, 9);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0100.jpg', 0, 10);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0101.jpg', 0, 11);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0102.jpg', 0, 12);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0103.jpg', 0, 13);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0104.jpg', 0, 14);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0105.jpg', 0, 15);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0107.jpg', 0, 16);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0108.jpg', 0, 17);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0109.jpg', 0, 18);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0110.jpg', 0, 19);
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0111.jpg', 0, 20);

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('design', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_normal', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_design', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('demographics', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('big_five', '"dummy"');
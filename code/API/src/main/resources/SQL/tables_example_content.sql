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
INSERT INTO users (name, pwd, mail, login) VALUE ('Luis', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('lou95', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('eeeee', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('mia', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('Jan', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('12345', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('name', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('Michael7', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('David', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('marcccc', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('Manu', '', '', 0);
INSERT INTO users (name, pwd, mail, login) VALUE ('andi', '', '', 0);

/* the groups */
INSERT INTO `groups` (name, id, basic) VALUE ('none', 'none', 1);
INSERT INTO `groups` (name, id, basic) VALUE ('game_td_points', 'td', 1);
INSERT INTO `groups`(name, id, basic) VALUE ('design_task', 'design', 1);
INSERT INTO `groups`(name, id, basic) VALUE ('absolute_leaderboard', 'absolute', 1);
INSERT INTO `groups`(name, id, basic) VALUE ('relative_leaderboard', 'relative', 1);
INSERT INTO `groups`(name, id, basic) VALUE ('choice', 'choice', 1);
INSERT INTO `groups` (name, id, basic) VALUE ('design_implemented', 'design_implemented', 0);

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
  VALUE (3, 0, 100, 'points', NOW());
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (4, 0, 100, 'points', NOW(), 0);
 INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 6000, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (6, 2900, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (7, 1100, 0, 'points', NOW(), 1);
INSERT INTO game_td_points (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (8, 10200, 0, 'points', NOW(), 1); 
  
  /* insert default points to users in absolute_leaderboard condition*/
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (1, 0, 100, 'points', NOW(), 0);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update)
  VALUE (2, 0, 100, 'points', NOW());
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update)
  VALUE (3, 0, 100, 'points', NOW());
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (4, 0, 100, 'points', NOW(), 0);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (6, 1700, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (7, 2300, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (8, 2900, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (9, 3500, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (10, 4000, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (11, 4600, 0,   'points', NOW(), 1); 
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (12, 5300, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (13, 5800, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (14, 6500, 0,    'points', NOW(), 1); 
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (15, 7300, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (16, 7900, 0,    'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (17, 8600, 0,   'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (18, 9200, 0,    'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (19, 9700, 0,    'points', NOW(), 1);
 /*INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (6, 1600, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (7, 2000, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (8, 2400, 0, 'points', NOW(), 1); 
   INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (9, 2900, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (10, 3400, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (11, 3800, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (12, 4200, 0, 'points', NOW(), 1); 
   INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (13, 4800, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (14, 5300, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (15, 5700, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (16, 6300, 0, 'points', NOW(), 1); 
 INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (17, 7000, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (18, 7400, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (19, 7900, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (20, 8300, 0, 'points', NOW(), 1); 
   INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (21, 8800, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (22, 9200, 0, 'points', NOW(), 1);
INSERT INTO absolute_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (23, 9700, 0, 'points', NOW(), 1);*/


  /* insert default points to users in relative_leaderboard condition*/
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (1, 0, 100, 'points', NOW(), 0);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update)
  VALUE (2, 0, 100, 'points', NOW());
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update)
  VALUE (3, 0, 100, 'points', NOW());
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (4, 0, 100, 'points', NOW(), 0);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (6, 1700, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (7, 2300, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (8, 2900, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (9, 3500, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (10, 4000, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (11, 4600, 0,   'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (12, 5300, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (13, 5800, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (14, 6500, 0,    'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (15, 7300, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (16, 7900, 0,    'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (17, 8600, 0,   'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (18, 9200, 0,    'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (19, 9700, 0,    'points', NOW(), 1);
 /*INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (6, 1600, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (7, 2000, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (8, 2400, 0, 'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (9, 2900, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (10, 3400, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (11, 3800, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (12, 4200, 0, 'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (13, 4800, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (14, 5300, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (15, 5700, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (16, 6300, 0, 'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (17, 7000, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (18, 7400, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (19, 7900, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (20, 8300, 0, 'points', NOW(), 1); 
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (21, 8800, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (22, 9200, 0, 'points', NOW(), 1);
INSERT INTO relative_leaderboard (uid, points, points_incr, representation, last_update, visible_for_others)
  VALUE (23, 9700, 0, 'points', NOW(), 1);*/

INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (1, 0, 100, 0, 0,   'points', NOW(), 0);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update)
  VALUE (2, 0, 100, 0, 0,  'points', NOW());
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update)
  VALUE (3, 0, 100, 0, 0,  'points', NOW());
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (4, 0, 100, 0, 0, 'points', NOW(), 0);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (6, 1700, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (7, 2300, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (8, 2900, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (9, 3500, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (10, 4000, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (11, 4600, 0, 0, 0,  'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (12, 5300, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (13, 5800, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (14, 6500, 0, 0, 0,   'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (15, 7300, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (16, 7900, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (17, 8600, 0, 0,  0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (18, 9200, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (19, 9700, 0, 0, 0,   'points', NOW(), 1);
 /*INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (5, 1100, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (6, 1600, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (7, 2000, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (8, 2400, 0, 0, 0,  'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (9, 2900, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (10, 3400, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (11, 3800, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (12, 4200, 0, 0, 0,  'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (13, 4800, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (14, 5300, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (15, 5700, 0, 0, 0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (16, 6300, 0, 0, 0,   'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (17, 7000, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (18, 7400, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (19, 7900, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (20, 8300, 0, 0,  0,  'points', NOW(), 1); 
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (21, 8800, 0, 0,  0,  'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (22, 9200, 0, 0, 0,   'points', NOW(), 1);
INSERT INTO choice (uid, points, points_incr, chosen_group, tutorial, representation, last_update, visible_for_others)
  VALUE (23, 9700, 0, 0, 0,   'points', NOW(), 1);*/

 

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
/*INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0005.jpg', 0, 2);
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
INSERT INTO images (name, basic_image, extra_round_counter) VALUE ('abstract_0111.jpg', 0, 20);*/

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('design', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_normal', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_design', '"dummy"');

/*INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_absolute', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_relative', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_choice_absolute', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('end_choice_relative', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('demographics', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('big_five', '"dummy"');*/
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('kim_enjoyment_choice1', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('kim_enjoyment_choice2', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('imi', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('imi_control', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('task_perception', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('task_perception_control', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('lbs_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('lbs_rel', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('lbs_C_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('lbs_C_rel', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('choice_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('choice_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('choice_rel', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('choice_C_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('choice_C_rel', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('demographic_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('demographic_gami', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('basics_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('basics_gami', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('final_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('final_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('final_rel', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('final_C_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('final_C_rel', '"dummy"');

INSERT INTO questionnaires (quest_name, json_quest) VALUE ('debrief_control', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('debrief_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('debrief_rel', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('debrief_C_abs', '"dummy"');
INSERT INTO questionnaires (quest_name, json_quest) VALUE ('debrief_C_rel', '"dummy"');

INSERT INTO image_tags (uid, iid, tag) VALUES (1, 1, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 2, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 3, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 4, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 5, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 6, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 7, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 8, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 9, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 10, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 11, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 12, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 13, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 14, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 15, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 16, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 17, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 18, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 19, 'ruhig');
/*INSERT INTO image_tags (uid, iid, tag) VALUES (2, 20, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 21, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 22, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 23, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 24, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 25, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 26, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 27, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 28, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 29, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 30, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 31, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 32, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 33, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 34, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 35, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 36, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 37, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 38, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 39, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 40, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 41, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 42, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 43, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 44, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 45, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 46, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 47, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 48, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 49, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 50, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 51, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 52, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 53, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 54, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 55, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 56, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 57, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 58, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 59, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 60, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 61, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 62, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 63, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 64, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 65, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 66, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 67, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 68, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 69, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 70, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 71, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 72, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 73, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 74, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 75, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 76, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 77, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 78, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 79, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 80, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 81, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 82, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 83, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 84, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 85, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 86, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 87, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 88, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 89, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 90, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 91, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 92, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 93, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 94, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 95, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 96, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 97, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 98, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 99, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 100, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 101, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 102, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 103, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 104, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 105, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 106, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 107, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 108, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 109, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 110, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 111, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 112, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 113, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 114, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 115, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 116, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 117, 'ruhig');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 118, 'ruhig');*/

INSERT INTO image_tags (uid, iid, tag) VALUES (1, 1, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 2, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 3, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 4, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 5, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 6, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 7, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 8, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 9, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 10, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 11, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 12, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 13, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 14, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 15, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 16, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 17, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 18, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 19, 'entspannt');
/*INSERT INTO image_tags (uid, iid, tag) VALUES (2, 20, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 21, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 22, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 23, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 24, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 25, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 26, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 27, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 28, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 29, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 30, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 31, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 32, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 33, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 34, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 35, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 36, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 37, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 38, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 39, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 40, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 41, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 42, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 43, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 44, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 45, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 46, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 47, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 48, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 49, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 50, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 51, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 52, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 53, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 54, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 55, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 56, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 57, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 58, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 59, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 60, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 61, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 62, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 63, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 64, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 65, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 66, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 67, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 68, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 69, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 70, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 71, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 72, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 73, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 74, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 75, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 76, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 77, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 78, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 79, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 80, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 81, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 82, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 83, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 84, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 85, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 86, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 87, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 88, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 89, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 90, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 91, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 92, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 93, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 94, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 95, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 96, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 97, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 98, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 99, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 100, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 101, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 102, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 103, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 104, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 105, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 106, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 107, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 108, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 109, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 110, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 111, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 112, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 113, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 114, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 115, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 116, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 117, 'entspannt');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 118, 'entspannt');*/

INSERT INTO image_tags (uid, iid, tag) VALUES (1, 1, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 2, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 3, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 4, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 5, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 6, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 7, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 8, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 9, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 10, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 11, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 12, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 13, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 14, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (1, 15, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 16, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 17, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 18, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 19, 'BspTag');
/*INSERT INTO image_tags (uid, iid, tag) VALUES (2, 20, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 21, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 22, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 23, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 24, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 25, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 26, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 27, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 28, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 29, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (2, 30, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 31, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 32, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 33, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 34, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 35, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 36, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 37, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 38, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 39, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 40, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 41, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 42, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 43, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 44, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (3, 45, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 46, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 47, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 48, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 49, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 50, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 51, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 52, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 53, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 54, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 55, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 56, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 57, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 58, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 59, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (4, 60, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 61, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 62, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 63, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 64, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 65, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 66, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 67, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 68, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 69, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 70, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 71, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 72, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 73, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 74, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (5, 75, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 76, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 77, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 78, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 79, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 80, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 81, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 82, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 83, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 84, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 85, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 86, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 87, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 88, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 89, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (6, 90, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 91, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 92, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 93, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 94, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 95, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 96, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 97, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 98, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 99, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 100, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 101, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 102, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 103, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 104, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (7, 105, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 106, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 107, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 108, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 109, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 110, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 111, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 112, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 113, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 114, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 115, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 116, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 117, 'BspTag');
INSERT INTO image_tags (uid, iid, tag) VALUES (8, 118, 'BspTag');*/
SELECT 	bothTimes.uid AS user_id,
        bothTimes.group_list AS 'condition',
        bothTimes.timediff AS avg_time_img_basic_bonus,
        basicTimes.timediff AS avg_time_img_basic,
        COALESCE(bonusTimes.timediff, "") AS avg_time_img_bonus,
        numTagsTutorial.numTutorial AS tags_tutorial,
        numTagsBasic.numBasic AS tags_basic,
        COALESCE(numTagsExtra.numExtra, "") AS tags_bonus,
        COALESCE(numExtraRounds.num_of_extra_rounds_solved, 0) AS extra_rounds
FROM (((((
    # Get average duration for image for each user (basic images  + bonus)
    (SELECT
            image_log.uid,
            GROUP_CONCAT(DISTINCT gid)                       AS group_list,
            avg(time_to_sec(timediff(end_time, start_time))) AS timediff
     FROM image_log
            INNER JOIN users_groups ON image_log.uid = users_groups.uid
     WHERE iid > 3
     GROUP BY uid) AS bothTimes

        LEFT JOIN

        # Get average duration for image for each user (basic images)
        (SELECT
                image_log.uid,
                avg(time_to_sec(timediff(end_time, start_time))) AS timediff
         FROM image_log
                INNER JOIN users_groups ON image_log.uid = users_groups.uid
         WHERE iid > 3 AND iid <= 18
         GROUP BY uid) AS basicTimes

        ON bothTimes.uid = basicTimes.uid)

    LEFT JOIN

    # Get average duration for image for each user (bonus images)
    (SELECT
            image_log.uid,
         #GROUP_CONCAT(DISTINCT gid)                       AS group_list2,
            avg(time_to_sec(timediff(end_time, start_time))) AS timediff
     FROM image_log
            INNER JOIN users_groups ON image_log.uid = users_groups.uid
     WHERE iid > 18
     GROUP BY uid) AS bonusTimes

    ON bothTimes.uid = bonusTimes.uid)

    LEFT JOIN

    # get total number of tags (tutorial) for each user
    (SELECT
            uid,
            count(tag) AS numTutorial
     FROM image_tags
     WHERE length(tag) > 0 AND iid <= 3
     GROUP BY uid) AS numTagsTutorial

    ON bothTimes.uid = numTagsTutorial.uid)

    LEFT JOIN

    # get total number of tags (basic) for each user
    (SELECT
            uid,
            count(tag) AS numBasic
     FROM image_tags
     WHERE length(tag) > 0 AND iid > 3 AND iid <= 18
     GROUP BY uid) AS numTagsBasic

    ON bothTimes.uid = numTagsBasic.uid)

    LEFT JOIN

    # get total number of tags (extra) for each user
    (SELECT
            uid,
            count(tag) AS numExtra
     FROM image_tags
     WHERE length(tag) > 0 AND iid > 18
     GROUP BY uid) AS numTagsExtra

    ON bothTimes.uid = numTagsExtra.uid)

       LEFT JOIN

         (SELECT
                 image_log.uid,
                 Floor(count(iid) / 5) AS num_of_extra_rounds_solved
          FROM image_log
          WHERE iid > 18
          GROUP BY uid) AS numExtraRounds

         ON bothTimes.uid = numExtraRounds.uid
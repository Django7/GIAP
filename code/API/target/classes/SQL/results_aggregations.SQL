SELECT bothTimes.uid, bothTimes.group_list, bothTimes.timediff AS avg_time_img_basic_bonus, basicTimes.timediff AS avg_time_img_basic, COALESCE(bonusTimes.timediff, "") AS avg_time_img_bonus
FROM
# Get average duration for image for each user (basic images  + bonus)
     ((SELECT
              image_log.uid,
              GROUP_CONCAT(DISTINCT gid)                       AS group_list,
              avg(time_to_sec(timediff(end_time, start_time))) AS timediff
       FROM image_log
              INNER JOIN users_groups ON image_log.uid = users_groups.uid
       WHERE iid > 3
       GROUP BY uid)
         AS bothTimes

         LEFT JOIN

         # Get average duration for image for each user (basic images)
         (SELECT
                 image_log.uid,
                 avg(time_to_sec(timediff(end_time, start_time))) AS timediff
          FROM image_log
                 INNER JOIN users_groups ON image_log.uid = users_groups.uid
          WHERE iid > 3 AND iid <= 18
          GROUP BY uid)
             AS basicTimes

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
          GROUP BY uid)
             AS bonusTimes

         ON bothTimes.uid = bonusTimes.uid
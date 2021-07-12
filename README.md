# Repository content
This repository contains the code for the **Gamified Image Annotation Platform**.

It consists of two folders:
* *code* contains the actual code of several tools (API, frontend, questionnaire_analyzer, TagJudge).
* *images* contains the images used in the study. A separate licence is used for those.



# Setup

## Windows
 1. Clone Project

 2. Install JDK 11 / Corretto 11

 3. Install MySQL (Set authentication during installation to Version 5.x instead of 8.x.)

 4. Open "GIAP\code\frontend\" in Web IDE (e.g. VS Code)

 5. Open "GIAP\code\API\" in Java IDE. (e.g. IntelliJ)


## MySQL

 1. Create a Database

 2. Run the following code on your DB from API\src\main\resources\SQL:

    a) reinit_all_tables.sql

    b) tables_example_content.sql

    c) subsequent_tables_example_content.sql

## Java IDE:
1. Open settings.properties

2. Adjust database connection settings

3. Adjust image source path

4. Run Main


## Web IDE:

1. Adjust statics.js
2. Run index.html (On webserver to prevent CORS error -> VSCode: Live Server extension)





# Creating a new Game Concept

1. Group in DB anlegen nach dem Schema "id\_[concept name]_[id]"
2. Assign groupID to respective user in users_groups table (DB)
3. Create a HTML file in "views" (mst_id\_[concept name]_[id].html)
4. Add concept to mst_taggin_environment.html
5. Create a JS file in js/ge/ (id\_[concept name]_[id].js) 
6. Add js file to \<script> of index.html
7. In statics.js: 
   -> Create a variable for game concept
   -> Add to reinitGameElement()
8. In game_element_helpers.js: 
  -> Add to all functions in init_user_designed_game_elements(main_user_group_id) as new case

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
2. User anlegen mit zugewiesener groupID in users_groups Schema.
3. In "views" eine HTML Datei anlegen (id\_[concept name]_[id].html).
4. In js/ge/ eine JS datei anlegen und in der index.html einbinden (id\_[concept name]_[id].js).
5. In mst_taggin_environment.html einen Abschnitt für neues Game Concept einfügen.
6. In statics.js 
	-> eine variable für neues Game Concept anlegen.
	-> in reinitGameElement() hinterlegen.
7. In game_element_helpers.js 
	-> In allen Funktionen in init_user_designed_game_elements(main_user_group_id) neues Game Concept als case einfügen

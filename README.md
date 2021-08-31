
# Kraaft exercise

## Exercise

Here is the task you asked me to implement. I felt free to reorganize the files and folder following how I usually work.
Of course the app does not include a routing system or something like that since there is only one page.
You can upload pictures that can be converted to base64 into the chat (small ones).

## Few questions

- I feel like the users array in the assets should be implemented as a dictionary of id -> {id, username} instead of an array.
- For the messages, the tag system does not scale upon renaming a user. A homemade tag system replacing the username by the user id on creation would scale more, something like `Hello @Cedric` would become `Hello $id:udjIxP10xA$` in database, and would be replaced by the server before sending the information or on the go client side.

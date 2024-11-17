# Social-Media-Platform-API

Used Node.js, express, MongoDB

## To Run
##### npm install
##### node server.js
## MongoDB Schemas:

### * User registration with details.
### * Friend request management with statuses (pending, accepted, rejected).
### * Text-only post creation.
### * Comment creation on posts.

## APIs for Feed Operations:

### * An API that retrieves posts from friends.
### * Posts from non-friends where a friend has commented.

## Output
![image](https://github.com/user-attachments/assets/09b31743-0c94-4e3a-b13e-0d1a59a8fa19)

## DB

### users
![image](https://github.com/user-attachments/assets/05f18799-c3bc-4a80-8022-447e072ff45a)

### posts
![image](https://github.com/user-attachments/assets/e66f820b-20ab-4f1a-9491-67bc64191f1a)

### friendRequest
![image](https://github.com/user-attachments/assets/26599d72-dec9-4f38-9fde-3069d1eef459)

### comments
![image](https://github.com/user-attachments/assets/8acf8888-08aa-4894-9b9e-fc98bbed7e57)

## Explanation

The final output of the `GET /feed/:userId` API returns a user's content feed, which includes posts made by their friends and posts from non-friends that have comments from friends. In this example, the feed contains two posts. The first post was made by Mike (user `64bfa0c1d4f0e3b4567ac003`), with no comments, and it appears in the feed because Mike is a friend of the user. The second post is made by the user themselves (`64bfa0c1d4f0e3b4567ac001`), and it has a comment from another friend (user `64bfa0c1d4f0e3b4567ac002`), fulfilling the condition for displaying posts from non-friends if a friend has commented. Each post contains its unique ID, user ID, content, the list of comments, and the creation timestamp.

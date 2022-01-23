# [**Eighty Four**](https://eightyfour.vercel.app)

## **About**
This is a MVC pattern backend I made to link with my React front-end app. However, both repositories are completely open source, available to everyone as they wish. Maybe you can have fun making your front end application for this project.

# **How use it**
To start correctly, configure .env file with the required values.

`node src/app.js` or `yarn run start` to run.

```
± yarn start
yarn run v1.22.11
$ node src/app.js
We've taken off 🛫 on 3001 port
```

## **Middleware**

By passing the authorisation in the header, you may face 2 errors (I hope not).

`401` "token missing" | when the token wasn't sent.

or 

`401` "token invalid" | when the token isn't valid.

## **EndPoints**

`/login`

`/register`

`/search/:username`

`/rating/:rating/:ratedUser`

`/spotify/:search`

### **/login**
____
**Params**

Query

`username`

`password`

**Responses**

`200`

```JSON
{
	"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFmOTc1YzExYzI5YTk2NGYzNTBlZDUiLCJpYXQiOjE2NDI4ODcxMjEsImV4cCI6MTY0Mjk3MzUyMX0.n11gpJUlcoyI2rAonIXZg6nbRPP1cCVifuj7WTPcWQU",
	"user": {
		"_id": "61af975c11c29a964f350ed5",
		"username": "caian",
		"bio": "hi, i'm caian",
		"song": {
			"title": "Some Sand",
			"artist": "ibi",
			"preview": "https://p.scdn.co/mp3-preview/661bbaea4a70e4e9a615f1f81936dd3112c4d163?cid=a8b6887dec3c4cf59d78e5bd2a5a8d41",
			"cover": "https://i.scdn.co/image/ab67616d00001e0238e43285936cad759cea08bb"
		},
		"rating": 5
	},
	"ok": true
}
```

`400` "There is no user with that username"

`401` "User or password are incorrect"

### **/register**
____
**Params**

Body

`username`

`password` must be longer than 8 characters and shorter than 32 characters

`bio` limited to 120 chacraters 

`song` an object should be sent with details of the song
  
```JSON
"song": {
	"title": "Some Sand",
	"artist": "ibi",
	"preview": "https://p.scdn.co/mp3-preview/661bbaea4a70e4e9a615f1f81936dd3112c4d163?cid=a8b6887dec3c4cf59d78e5bd2a5a8d41",
	"cover": "https://i.scdn.co/image/ab67616d00001e0238e43285936cad759cea08bb"
    	}
  ```


**Responses**

`200` 

```JSON
{
 "ok": true
}
```

> Use the error description in JSON, due to the various reasons it may give an error

### **/search**
____
**Params**

> /search/:username

Header

`authorization` token

**Responses**

`200` 

```JSON
{
	"data": {
		"_id": "61af975c11c29a964f350ed5",
		"username": "caian",
		"bio": "hi, i'm caian",
		"song": {
			"title": "Some Sand",
			"artist": "ibi",
			"preview": "https://p.scdn.co/mp3-preview/661bbaea4a70e4e9a615f1f81936dd3112c4d163?cid=a8b6887dec3c4cf59d78e5bd2a5a8d41",
			"cover": "https://i.scdn.co/image/ab67616d00001e0238e43285936cad759cea08bb"
		},
		"__v": 0,
		"rating": 5,
		"userRating": {
			"alreadyRated": false
		}
	},
	"ok": true
}
```

`404` "There is no user with that username"

### **/rating**
____
**Params**

> /rating/:rating/:ratedUser

Header

`authorization` token

**Responses**

`200` 

```JSON
{
 "ok": true
}
```

`401` "You already rated this user".

`400` The request was sent with a rating that is either less than 0, or more than 5.

### **/spotify**
____
**Params**

> /spotify/:search

Body

 `spotify-jwt-token`

You don't have to send it the first time, the app creates a new token when the current is incorrect and sends it back.

**Responses**

`200`

```JSON
{
    "data": {
        //spotify data
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOiJCUUMxRVZlb3pmRDJJbW1LRE5GLWRlRTNlM2s1cjN5QlpZMkZkZWlLQ0gtWDhuZGdwYWxHVEhDYkdVcnJ5RU94MEtreU5aTmF4UU5peGdBek9fWSIsImlhdCI6MTY0Mjg4OTE1MSwiZXhwIjoxNjQyODkyNzUxfQ.p3c2fRA7pImdbuX3J3RMtR7uv3H8krjBkVcUyiUtynU",
	"ok": true
    }
}
```

>Save this token and send it on future requests, once the token expires, repeat the process.
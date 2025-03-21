db = db.getSiblingDB("mydb"); // Change "mydb" to your actual database name

// Insert Users
const users = [
    {
        _id: ObjectId(),
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "hashed_password1",
        profilePicture: "https://picsum.photos/200/200"
    },
    {
        _id: ObjectId(),
        name: "Bob Smith",
        email: "bob@example.com",
        password: "hashed_password2",
        profilePicture: "https://picsum.photos/200/201"
    },
    {
        _id: ObjectId(),
        name: "Charlie Davis",
        email: "charlie@example.com",
        password: "hashed_password3",
        profilePicture: "https://picsum.photos/200/202"
    }
];
db.users.insertMany(users);

// Insert Posts
const posts = [
    {
        _id: ObjectId(),
        author: users[0]._id,
        authorProfilePicture: users[0].profilePicture,
        createdAt: new Date(),
        fishType: "Bass",
        location: "Limerick",
        fishWeight: 4.5,
        message: "Caught a big one today!",
        image: "https://picsum.photos/400/300",
        likes: 3,
        likedBy: [users[1]._id, users[2]._id],
        comments: [
            {
                author: users[1]._id,
                authorProfilePicture: users[1].profilePicture,
                message: "Nice catch, Alice!",
                createdAt: new Date()
            }
        ]
    },
    {
        _id: ObjectId(),
        author: users[1]._id,
        authorProfilePicture: users[1].profilePicture,
        createdAt: new Date(),
        fishType: "Trout",
        location: "Limerick",
        fishWeight: 3.2,
        message: "Love fishing in the wild!",
        image: "https://picsum.photos/400/301",
        likes: 5,
        likedBy: [users[0]._id],
        comments: [
            {
                author: users[0]._id,
                authorProfilePicture: users[0].profilePicture,
                message: "Beautiful trout!",
                createdAt: new Date()
            }
        ]
    },
    {
        _id: ObjectId(),
        author: users[2]._id,
        authorProfilePicture: users[2].profilePicture,
        createdAt: new Date(),
        fishType: "Salmon",
        location: "Limerick",
        fishWeight: 6.7,
        message: "Best fishing trip ever!",
        image: "https://picsum.photos/400/302",
        likes: 7,
        likedBy: [users[0]._id, users[1]._id],
        comments: [
            {
                author: users[1]._id,
                authorProfilePicture: users[1].profilePicture,
                message: "That looks amazing!",
                createdAt: new Date()
            },
            {
                author: users[0]._id,
                authorProfilePicture: users[0].profilePicture,
                message: "Alaska is the best for fishing!",
                createdAt: new Date()
            }
        ]
    }
];
db.posts.insertMany(posts);
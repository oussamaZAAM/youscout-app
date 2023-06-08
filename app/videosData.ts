export interface VideoModel {
  id: number;
  username: string;
  videoUrl: string;
  caption: string;
  musicName: string;
  likes: number;
  commentsNum: number;
  userProfilePic: string;
}

export const videosData = [
  {
    id: 1,
    username: "karenbee7",
    videoUrl: "https://you-scout-media.s3.eu-west-3.amazonaws.com/PostVideos/27a52868-2979-4ea5-b95a-16411583a653_jugging.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    commentsNum: 11,
    userProfilePic: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  },
  {
    id: 2,
    username: "tsukihicchi",
    videoUrl: "https://you-scout-media.s3.eu-west-3.amazonaws.com/PostVideos/861be6eb-54d2-40a2-a078-60e8fc2c3851_running.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    commentsNum: 101,
    userProfilePic: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  },
  {
    id: 3,
    username: "hitagicrab",
    videoUrl: "https://you-scout-media.s3.eu-west-3.amazonaws.com/PostVideos/4a88bd55-de4d-4f49-be14-43d9e0c2328b_guarding.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    commentsNum: 18,
    userProfilePic: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  },
  {
    id: 4,
    username: "hitagicrab",
    videoUrl: "https://you-scout-media.s3.eu-west-3.amazonaws.com/PostVideos/e7370224-937a-4552-bd9e-d99c2bc0125c_shooting.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    commentsNum: 18,
    userProfilePic: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  },
];

export const notificationsData = [
  { id: "1", title: "Notification 1", message: "This is notification 1.", seen: true },
  { id: "2", title: "Notification 2", message: "This is notification 2.", seen: false },
  { id: "3", title: "Notification 3", message: "This is notification 3.", seen: true },
  { id: "4", title: "Notification 4", message: "This is notification 4.", seen: true },
  { id: "5", title: "Notification 5", message: "This is notification 5.", seen: false },
];


  // const posts = [
  //   {
  //     id: 1,
  //     username: "cutedog",
  //     videoUrl: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
  //     thumbUri: "https://i.ibb.co/fNqWrJX/image-2023-04-18-002637131.png",
  //     caption:
  //       "Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy",
  //     musicName: "Song #1",
  //     likes: 4321,
  //     commentsNum: 2841,
  //     userProfilePic: "https://wallpaperaccess.com/full/1669289.jpg",
  //   },
  //   {
  //     id: 2,
  //     username: "meow",
  //     videoUrl: "https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4",
  //     thumbUri: "https://i.ibb.co/6Z7pLq0/image-2023-04-18-003250756.png",
  //     caption: "Doggies eating candy #cute #puppy",
  //     musicName: "Song #2",
  //     likes: 2411,
  //     commentsNum: 1222,
  //     userProfilePic: "https://wallpaperaccess.com/thumb/266770.jpg",
  //   },
  //   {
  //     id: 3,
  //     username: "yummy",
  //     videoUrl: "https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4",
  //     thumbUri: "https://i.ibb.co/RNStBKZ/image.png",
  //     caption: "Brown little puppy #cute #puppy",
  //     musicName: "Song #3",
  //     likes: 3100,
  //     commentsNum: 801,
  //     userProfilePic: "https://wallpaperaccess.com/thumb/384178.jpg",
  //   },
  // ];

videosData;

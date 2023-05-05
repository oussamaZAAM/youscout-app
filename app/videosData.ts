export interface VideoModel {
  id: number;
  channelName: string;
  uri: string;
  caption: string;
  musicName: string;
  likes: number;
  comments: number;
  avatarUri: string;
}

const videosData = [
  {
    id: 1,
    channelName: "karenbee7",
    uri: "https://www.shutterstock.com/shutterstock/videos/1071557398/preview/stock-footage-cute-anime-girl-virtual-streamer-on-gaming-chair-with-neon-lights-kitchen-in-background-k.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    comments: 801,
    avatarUri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  },
  {
    id: 2,
    channelName: "karenbee7",
    uri: "https://editorial-cdn.shutterstock.com/wm-preview-mp4/13028521a/MeT6MaxcN9D4E7zcMDI0MDk=/Shutterstock_13028521a.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    comments: 801,
    avatarUri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  },
  {
    id: 3,
    channelName: "karenbee7",
    uri: "https://editorial-cdn.shutterstock.com/wm-preview-mp4/13436279a/M2T1M71cNdTcM148NTQ1MTQ=/Shutterstock_13436279a.mp4",
    caption: "Brown little puppy #cute #puppy",
    musicName: "Song #3",
    likes: 3100,
    comments: 801,
    avatarUri: "https://cdn.myanimelist.net/images/characters/9/295367.jpg",
  },
];


  // const posts = [
  //   {
  //     id: 1,
  //     channelName: "cutedog",
  //     uri: "https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4",
  //     thumbUri: "https://i.ibb.co/fNqWrJX/image-2023-04-18-002637131.png",
  //     caption:
  //       "Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy Cute dog shaking hands #cute #puppy",
  //     musicName: "Song #1",
  //     likes: 4321,
  //     comments: 2841,
  //     avatarUri: "https://wallpaperaccess.com/full/1669289.jpg",
  //   },
  //   {
  //     id: 2,
  //     channelName: "meow",
  //     uri: "https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4",
  //     thumbUri: "https://i.ibb.co/6Z7pLq0/image-2023-04-18-003250756.png",
  //     caption: "Doggies eating candy #cute #puppy",
  //     musicName: "Song #2",
  //     likes: 2411,
  //     comments: 1222,
  //     avatarUri: "https://wallpaperaccess.com/thumb/266770.jpg",
  //   },
  //   {
  //     id: 3,
  //     channelName: "yummy",
  //     uri: "https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4",
  //     thumbUri: "https://i.ibb.co/RNStBKZ/image.png",
  //     caption: "Brown little puppy #cute #puppy",
  //     musicName: "Song #3",
  //     likes: 3100,
  //     comments: 801,
  //     avatarUri: "https://wallpaperaccess.com/thumb/384178.jpg",
  //   },
  // ];

export default videosData;

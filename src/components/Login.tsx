
export default function Login() {


const handleClick = async () => {
  const client_id = import.meta.env.CLIENT_ID || "8d35d7493e1344f981a4e901732c850e";
  const redirect_uri = "https://spotify-wrapped-fun.vercel.app/render";
  // const redirect_uri2 = "http://localhost:5173/render";
  const api_uri = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
  ];
  window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
    " "
  )}&response_type=token&show_dialog=true`;
};

  
  
  return (
    <div className="flex justify-center items-center pb-2 flex-col">
      <div className="w-full mt-10 pt-2  px-4">
        <p className="text-4xl font-semibold">Spotify Wrapped</p>
        <div className="h-2"></div>
        <p className="text-2xl font-semibold">Let’s unwrap your 2024 soundtrack!</p>
        <div className="h-4"></div>
        <p className="text-md"> From your most-played songs to your top genres, discover the story of your year in music , Discover the tracks, artists, and genres that made your year unique</p>
      </div>
      <div className="p-4">
      <img
        className="rounded-md h-[400px]"
        src="/sad.jpg"
      />
      </div>
      <button onClick={handleClick} className="bg-green-500 rounded-md px-3 py-1 h-10 w-[96%] text-white">Get In Touch</button>
    </div>
  );
}

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   height: 100vh;
//   width: 100vw;
//   background-color: #1db954;
//   gap: 5rem;
//   img {
//     height: 20vh;
//   }
//   button {
//     padding: 1rem 5rem;
//     border-radius: 5rem;
//     background-color: black;
//     color: #49f585;
//     border: none;
//     font-size: 1.4rem;
//     cursor: pointer;
//   }
// `;
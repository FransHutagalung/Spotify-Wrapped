import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface Artist {
    id: string;
    name: string;
    images: { url: string }[]; // Update the type of images to an array of objects with a url property
    // other properties...
}

interface Profile {
    display_name: string
    images: { url: string }[]
}
interface Album {
    id: string;
    name: string;
    artist: string;
    images: { url: string }[];
}

interface Songs {
    id: string;
    name: string;
    artist: string;
    album: Album;
}



const bgImage = [
    '/sky1.png',
    '/sky2.png',
    '/sky3.png',
    '/sky4.png',
    '/sky5.png',
    '/sky6.png',
    '/sky7.png',
    '/sky8.png',
    '/sky9.png',
]

const musicQuotes = [
    "Music is the shorthand of emotion. - Leo Tolstoy",
    "Where words fail, music speaks. - Hans Christian Andersen",
    "Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything. - Plato",
    "One good thing about music, when it hits you, you feel no pain. - Bob Marley",
    "Without music, life would be a mistake. - Friedrich Nietzsche",
    "Music expresses that which cannot be put into words and that which cannot remain silent. - Victor Hugo",
    "Music can change the world because it can change people. - Bono",
    "Music is the wine that fills the cup of silence. - Robert Fripp",
    "Music is the strongest form of magic. - Marilyn Manson",
    "Music is what feelings sound like. - Anonymous",
    "Music is a piece of art that goes in the ears and straight to the heart. - Anonymous",
    "Music is the universal language of mankind. - Henry Wadsworth Longfellow",
    "Music washes away from the soul the dust of everyday life. - Berthold Auerbach",
    "Music is the mediator between the spiritual and the sensual life. - Ludwig van Beethoven",
    "When you’re happy, you enjoy the music. But when you’re sad, you understand the lyrics. - Frank Ocean",
    "Music has a poetry of its own, and that poetry is called melody. - Joshua Logan",
    "Music is the moonlight in the gloomy night of life. - Jean Paul Richter",
    "The only truth is music. - Jack Kerouac",
    "Music is the art which is most nigh to tears and memory. - Oscar Wilde",
    "Music is the divine way to tell beautiful, poetic things to the heart. - Pablo Casals",
    "Music should strike fire from the heart of man and bring tears from the eyes of woman. - Ludwig van Beethoven",
    "A painter paints pictures on canvas. But musicians paint their pictures on silence. - Leopold Stokowski",
    "Music is the universal language that brings people together. - Ella Fitzgerald",
    "Music touches us emotionally where words alone can’t. - Johnny Depp"
];


const ImageRender = () => {

    const [downloaded, setdownloaded] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [bestSongs, setBestSongs] = useState<Songs[]>([]);
    const [favArtists, setFavArtists] = useState<Artist[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [selectedBgImage, setSelectedBgImage] = useState<string | null>(null);
    const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
    // const [time, setTime] = useState('0.00');

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const expiresIn = Number(params.get('expires_in')) || 3600; // Default to 3600 seconds (1 hour)
    const accessToken = params.get('access_token');

    console.log('Access Token:', accessToken);

    useEffect(() => {
        // Generate random background image and quote only once
        if (!selectedBgImage) {
            const randomBg = bgImage[Math.floor(Math.random() * bgImage.length)];
            setSelectedBgImage(randomBg);
        }

        if (!selectedQuote) {
            const randomQuote = musicQuotes[Math.floor(Math.random() * musicQuotes.length)];
            setSelectedQuote(randomQuote);
        }
    }, [selectedBgImage, selectedQuote]);

    useEffect(() => {
        if (!accessToken) {
            window.location.href = '/';
            return;
        }

        const fetchData = async () => {
            setLoading(true); // Set loading to true when starting fetch

            try {
                const responseTopTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataTopTracks = await responseTopTracks.json();
                console.log(dataTopTracks);

                setBestSongs(dataTopTracks.items);

                const responseProfile = await fetch('https://api.spotify.com/v1/me', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile);

                const responseTopArtists = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataTopArtists = await responseTopArtists.json();
                setFavArtists(dataTopArtists.items);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const timer = setTimeout(() => {
            window.location.href = '/';
        }, expiresIn * 1000);

        return () => clearTimeout(timer);
    }, [accessToken, expiresIn]);

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        await setdownloaded(true);

        if (divRef.current) {
            const canvas = await html2canvas(divRef.current, {
                useCORS: true,
                backgroundColor: null,
                scale: 2,
            });
            const imgData = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'spotify-wrapper-hd.png';
            link.click();
        }

        setdownloaded(false);
    };

    return loading ? (
        <div className='flex flex-col items-center p-4'>
            <p>Loading...</p>
        </div>
    ) :
        (
            <div className='flex flex-col items-center p-4'>
                <div
                    ref={divRef}
                    className='
                bg-black
                w-[400px]
                h-[711px]
                flex 
                relative
                flex-col
                px-4
                py-[4px]
                '
                >
                    <div className="h-[32%] rounded-md flex flex-col bg-black w-full px-2 py-3 justify-between relative">

                        <div className="h-[40px] absolute flex items-center  w-[40px] left-1">
                            <img className=' rounded-full object-cover' src={profile?.images[0]?.url}
                                alt="" />
                        </div>
                        <div className="absolute top-2">
                            <p

                                className='mb-[20px] ms-[46px]  text-white text-xl'
                                style={{
                                    marginTop: downloaded ? '4px' : '10px',
                                    fontSize: downloaded ? '16px' : '16px'

                                }}
                            >
                                {profile?.display_name}
                            </p>
                        </div>



                        <div className="h-[40px] absolute flex items-center  w-[60px] right-[-10px]">
                            <img src="/spotify.png" alt="Spotify Logo" />
                            {/* </div> */}
                        </div>
                        <div className="h-24">

                        </div>

                        <div className="w-full mt-2  h-32 flex justify-center items-end gap-2 ">
                            <div className="h-[100px] flex flex-col justify-end items-center gap-2">
                                <div className="w-6 h-6">
                                    <img src="/2.png" alt="" />
                                </div>
                                <div className="h-[80px] w-[80px] mb-2  rounded-md">
                                    <img className='rounded-lg object-cover w-full h-[100%]'
                                        src={favArtists[1]?.images[0]?.url || '/placeholder.png'}
                                        alt="Album Cover" />
                                </div>
                            </div>
                            <div className="h-[100px] flex flex-col justify-end items-center gap-2">
                                <div className="w-6 h-6">
                                    <img src="/1.png" alt="" />
                                </div>
                                <div className="h-[110px] w-[110px] mb-2 bg-blue-300 rounded-lg">
                                    <img className='object-cover rounded-md w-full h-[100%]'
                                        src={favArtists[0]?.images[0]?.url || '/placeholder.png'}
                                        alt="Album Cover" />
                                </div>
                            </div>
                            <div className="h-[100px] flex flex-col justify-end items-center gap-2">
                                <div className="w-6 h-6">
                                    <img src="/3.png" alt="" />
                                </div>
                                <div className="h-[80px] w-[80px] mb-2  rounded-md">

                                    <img className='object-cover rounded-lg w-full h-[100%]'
                                        src={favArtists[2]?.images[0]?.url || '/placeholder.png'}
                                        alt="Album Cover" />
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex justify-end">

                        </div>
                    </div>
                    <div className="w-full  gap-1 flex  h-[56%]">
                        <div className="h-full w-1/5 rounded-lg flex flex-col items-center  justify-between bg-red-700 pb-4 ">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-32 mx-auto  ">
                                    <img className='object-fit opacity-85' src="/headset2.png" alt="" />
                                </div>
                                <div className="mt-[-20px]">
                                {bestSongs.slice(0, 3).map((e, index) => (
                                    <div key={index} className=' h-14 w-14 my-3'>
                                        <img className=' border-white border-2 rounded-full' src={e?.album.images[0]?.url} alt="" />
                                    </div>
                                ))}
                                </div>
                            </div>

                            <p
                                className='text-white text-2xl font-semibold'
                            >2024</p>


                            {/* <p>Total Listening Time</p> */}

                        </div>
                        <div className="flex w-4/5 gap-1 flex-col">
                            <div className="w-full h-1/2 rounded-md bg-green-700 relative">
                                <div className="flex w-full justify-between items-center px-2 pb-1 pt-2">
                                    <div className={`h-8 flex items-center pt-2 justify-center pb-3`}>
                                        <p className='p-1  text-black text-sm ' style={{ fontFamily: 'Montserrat' }} >Top Songs</p>
                                    </div>
                                    <div className="h-[32px] w-[32px] bg-white rounded-full p-1">
                                        <img className='' src="/music.png" alt="Music Icon" />
                                    </div>
                                </div>
                                <div className="h-1"></div>
                                <hr className='text-black bg-black border-black' />
                                {/* <div className="h-2"></div> */}
                                <div className="px-2">
                                    {bestSongs.map((e, index) => (
                                        <div key={index} className="flex flex-col  p-1 text-black">
                                            <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '13px' }}> {index + 1}. {e.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-1/2 rounded-md bg-yellow-600 ">
                                <div className="flex w-full justify-between items-center px-2 pb-1">
                                    <div className={`h-8 pt-2 flex items-center justify-center pb-3`}>
                                        <p className='p-1  text-black text-sm ' style={{ fontFamily: 'Montserrat' }} >Top Artists</p>
                                    </div>
                                    <div className="h-[32px] w-[32px] bg-white rounded-full p-1 mt-2">
                                        <img className='text-black' style={{ color: 'white' }} src="/singer.png" alt="Music Icon" />
                                    </div>
                                </div>
                                <div className="h-1"></div>
                                <hr className='text-black bg-black border-black' />
                                {/* <div className="h-2"></div> */}
                                <div className="px-2">
                                    {favArtists.map((e, index) => (
                                        <div key={index} className="flex flex-col p-1 text-black">
                                            <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '13px' }}> {index + 1}.  {e.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" mb-2 px-3 mt-2 h-[10%] w-full rounded-md  text-white flex justify-center  items-center relative ">
                        <div className="absolute w-full h-full">
                            <img className='object-cover z-0  w-full h-full' src={selectedBgImage ?? ''} alt="" />
                        </div>
                        <p className='z-10 align-middle mt-1 mb-4 mx-4'
                            style={{
                                fontWeight: 'bold',
                                fontSize: '15px',
                                opacity: '0.8',  // Perbaikan opacity
                                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                            }}

                        >
                            {selectedQuote ?? ''}
                        </p></div>
                </div>
                <button
                    onClick={handleDownload}
                    className='
                bg-blue-500
                mt-4
                px-4
                py-2
                mx-auto
                w-[90%]
                rounded-md
                hover:bg-blue-300
                cursor-pointer
                '
                >
                    Download HD Image
                </button>
            </div>

        );
};

export default ImageRender;
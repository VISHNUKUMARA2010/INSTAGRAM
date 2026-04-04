import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";

const getYouTubeEmbed = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v=")) {
        const id = url.split("v=")[1]?.split("&")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
};

const isDirectVideoUrl = (url) => /\.(mp4|webm|ogg|mov|m3u8)(\?.*)?$/i.test(url || "");

const FeedPost = ({ post }) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);
    const isVideoPost = post.mediaType === "video";
    const mediaSrc = post.mediaURL || post.imageURL;
    const youtubeEmbedUrl = getYouTubeEmbed(mediaSrc);
    const isDirectVideo = isDirectVideoUrl(mediaSrc);
    const mediaWrapperRef = useRef(null);
    const nativeVideoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!isVideoPost || !mediaWrapperRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.6);
            },
            { threshold: [0.3, 0.6, 0.9] }
        );

        observer.observe(mediaWrapperRef.current);

        return () => observer.disconnect();
    }, [isVideoPost]);

    useEffect(() => {
        if (!isDirectVideo || !nativeVideoRef.current) return;

        if (isInView) {
            nativeVideoRef.current.play().catch(() => {});
        } else {
            nativeVideoRef.current.pause();
        }
    }, [isInView, isDirectVideo]);

    return (
        <Box
            position='relative'
            mb={8}
            p={{ base: 3, md: 4 }}
            border='1px solid'
            borderColor='rgba(170, 228, 255, 0.3)'
            borderRadius={18}
            bg='linear-gradient(160deg, rgba(14, 28, 54, 0.58), rgba(5, 14, 30, 0.5))'
            backdropFilter='blur(14px)'
            boxShadow='inset 0 1px 0 rgba(255,255,255,0.18), 0 24px 44px rgba(0, 0, 0, 0.32), 0 0 28px rgba(98, 215, 255, 0.1)'
            transition='transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
            _hover={{
                transform: 'translateY(-2px)',
                borderColor: 'rgba(194, 235, 255, 0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 26px 50px rgba(0, 0, 0, 0.38), 0 0 32px rgba(98, 215, 255, 0.14)',
            }}
            _before={{
                content: '""',
                position: 'absolute',
                inset: '0 0 auto 0',
                height: '72px',
                borderTopRadius: '18px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
                pointerEvents: 'none',
            }}
        >
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={3} borderRadius={14} overflow={"hidden"} ref={mediaWrapperRef} border='1px solid' borderColor='rgba(164, 222, 255, 0.24)'>
                {isVideoPost ? (
                    youtubeEmbedUrl ? (
                        <iframe
                            src={`${youtubeEmbedUrl}?autoplay=${isInView ? 1 : 0}&mute=1&playsinline=1&rel=0`}
                            title='reel'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                            style={{ width: "100%", height: "500px", border: "none" }}
                        />
                    ) : isDirectVideo ? (
                        <video
                            ref={nativeVideoRef}
                            src={mediaSrc}
                            controls
                            playsInline
                            muted
                            loop
                            preload='metadata'
                            style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
                        />
                    ) : (
                        <Box w='full' maxH='600px'>
                            <ReactPlayer
                                url={mediaSrc}
                                width='100%'
                                height='500px'
                                controls={true}
                                playing={isInView}
                                muted={true}
                                loop={true}
                                playsinline={true}
                            />
                        </Box>
                    )
                ) : (
                    <Image src={mediaSrc} alt={"FEED POST IMG"} w='full' maxH='600px' objectFit='cover' />
                )}
            </Box>
            <PostFooter post={post} creatorProfile={userProfile} />
        </Box>
    );
};

export default FeedPost;
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
        <>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={2} borderRadius={4} overflow={"hidden"} ref={mediaWrapperRef}>
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
                    <Image src={mediaSrc} alt={"FEED POST IMG"} />
                )}
            </Box>
            <PostFooter post={post} creatorProfile={userProfile} />
        </>
    );
};

export default FeedPost;
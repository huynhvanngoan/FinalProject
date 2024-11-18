"use client";

import React from "react";

interface VideoEmbedProps {
    videoId: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId }) => {
    const vimeoSrc = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&autoplay=1&controls=0&loop=1`;

    return (
        <div className="max-w-full max-h-[600px] relative overflow-hidden bg-transparent pb-[56.25%]">
            <iframe
                src={vimeoSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                className="absolute top-0 left-0 size-full"
                title={`Vimeo video ${videoId}`}
            ></iframe>
        </div>
    );
};

export default VideoEmbed;

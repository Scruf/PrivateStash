import React from 'react'
import VideoListItem from './video_list_item'

const VideoList = (props)=>{
	
	const video_items = props.videos.map((el)=>{
		return <VideoListItem key={el.etag} video={el} />;
	});
	return (
		<ul className="col-md-4 list-group">
			{video_items}
		</ul>
	);
}
export default VideoList;
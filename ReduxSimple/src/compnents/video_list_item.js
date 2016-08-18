import React from 'react'
const VideoListIntem = ({video})=>{
	const image_url = video.snippet.thumbnails.default.url;

	return (
		<li className="list-group-item">
			<div className="video-list media">
				<div className ="media-left">
					<img className="media-object" src={image_url}/>
				</div>
				<div className="media-body">
					<div className="media-heading">
						{video.snippet.title}
					</div>
				</div> 
			</div>
		 </li>
	)
}
export default VideoListIntem;
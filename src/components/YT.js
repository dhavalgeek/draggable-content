import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import videosData from './VideosData';
import { useState } from 'react';

const DraggableVideos = () => {
	const [videos, setVideos] = useState(videosData);

	const handleDragEnd = (results) => {
		if (!results.destination) {
			return;
		}

		let allVideos = [...videos];
		let [selectedVideo] = allVideos.splice(results.source.index, 1);
		allVideos.splice(results.destination.index, 0, selectedVideo);
		setVideos(allVideos);
	};

	return (
		<DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
			<div className='container-fluid'>
				<div className='mt-3'>
					<h1 className="text-center">Draggable Videos List</h1>
				</div>
				<Droppable droppableId='droppableVideos'>
					{(provided) => {
						return (
							<div ref={provided.innerRef} {...provided.droppableProps} className="row m-2 mt-4">
								{videos?.map((video, index) => {
									return (
										<Draggable draggableId={'draggable-' + video?.id} index={index} key={video?.id}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className="col-3"
												>
													<img src={video?.src} width={450} height={200} alt={video?.title} />
													<p>
														{video?.title}
														<br />
														<small>{video?.channel}</small>
													</p>
												</div>
											)}
										</Draggable>
									);
								})}
								{/* {provided.placeholder} */}
							</div>
						)
					}}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default DraggableVideos;
import React from 'react';
import '../styles/Stories.css';

type Props = {}

const storiesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://i.pinimg.com/originals/a7/38/02/a73802c854e038d4e61d59de6d3b4818.jpg",
    story: "Using this app, I was able to set and achieve daily goals that transformed my productivity and overall well-being. It was a game-changer for me!"
  },
  {
    id: 2,
    name: "Michael Brown",
    image: "https://i.pinimg.com/236x/d7/7e/f8/d77ef8676a3879943b715a055dc6a78e.jpg",
    story: "This app helped me stay on track with my weekly challenges. I saw noticeable improvements in my fitness and mental health in just a few weeks!"
  },
  {
    id: 3,
    name: "Emily Davis",
    image: "https://i.pinimg.com/236x/48/4b/9c/484b9cda763b89fc5f1373c19dec170a.jpg",
    story: "I never thought I could achieve such a balanced lifestyle, but this app made it possible. It helped me prioritize my tasks and stay motivated every day."
  },
  {
    id: 4,
    name: "David Williams",
    image: "https://i.pinimg.com/236x/7f/e7/46/7fe7462210779620ddefc258a1db888f.jpg",
    story: "This app gave me the structure I needed to conquer my goals. The progress tracking feature kept me motivated and focused on my journey to success."
  }
];

const Stories = (props: Props) => {
  return (
    <div className="stories-container" id='stories'>
      <h1>Success Stories</h1>
      {storiesData.map(story => (
        <div key={story.id} className="story-card">
          <img src={story.image} alt={story.name} className="story-image" />
          <h3 className="story-name">{story.name}</h3>
          <p className="story-description">{story.story}</p>
        </div>
      ))}
    </div>
  )
}

export default Stories;

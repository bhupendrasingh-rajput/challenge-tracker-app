import React from 'react';
import '../styles/Features.css'

type Props = {}

const Features = (props: Props) => {
  const features = [
    {
      title: 'Seamless Collaboration',
      description: 'Work together with your team effortlessly, no matter where they are. Share ideas, track progress, and achieve more together.',
      icon: '🔗',
    },
    {
      title: 'Real-Time Analytics',
      description: 'Stay ahead with data-driven insights. Monitor performance and make informed decisions with up-to-the-minute analytics.',
      icon: '📊',
    },
    {
      title: 'Customizable Workflows',
      description: 'Tailor your processes to fit your unique needs. With customizable workflows, you’re in control of how you get things done.',
      icon: '⚙️',
    },
    {
      title: 'Robust Security',
      description: 'Your data is safe with us. Experience peace of mind with top-notch security features that protect your information 24/7.',
      icon: '🔒',
    },
  ];

  return (
    <div className='features-container' id='features'>
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Features
import '../styles/Home.css';
import Banner from '../assets/Banner.jpeg';

type Props = {}

const Home = (props: Props) => {
    return (
        <div className='home' id='home'>
            <img src={Banner} alt="banner" className='banner' />
            <div className="bannerInfo">
                <h1>Track Your Progress, Achieve Your Goals</h1>
                <p>
                    Conquer Your Goals with Style! Our app transforms your challenges into achievements. From daily runs to diet plans and book reading marathons, stay motivated with an intuitive, TypeScript-powered dashboard. Track progress, view active challenges, and never miss a beat—even after a page refresh!
                </p>
            </div>
        </div>
    )
}

export default Home
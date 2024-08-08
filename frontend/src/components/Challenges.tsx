import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles/Challenges.css';
import create from '../assets/createChallenge.jpeg';
import ChallengeModal from './ChallengeModal';
import { getChallengesByUser, createChallenge, updateChallenge, updateChallengeProgress } from '../services/challenges';

interface IChallenge {
    _id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    frequency: 'daily' | 'weekly';
    progress?: { date: string; completed: boolean }[];
    status?: string;
    userId: string;
}

const Challenges: React.FC = () => {
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [challengeToEdit, setChallengeToEdit] = useState<IChallenge | null>(null);
    const [filter, setFilter] = useState<string>('active');

    const fetchChallenges = useCallback(async () => {
        try {
            const data = await getChallengesByUser();
            setChallenges(data);
        } catch (error) {
            console.error('Error fetching challenges:', error);
        }
    }, []);

    useEffect(() => {
        fetchChallenges();
    }, [fetchChallenges]);

    const handleSaveChallenge = useCallback(async (challenge: IChallenge): Promise<void> => {
        try {
            if (challengeToEdit) {
                await updateChallenge(challengeToEdit._id!, challenge);
                setChallenges(prevChallenges =>
                    prevChallenges.map(ch => ch._id === challengeToEdit._id ? { ...challengeToEdit, ...challenge } : ch)
                );
            } else {
                const newChallenge = await createChallenge(challenge);
                setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
            }
        } catch (error) {
            console.error('Error saving challenge:', error);
        } finally {
            setIsModalOpen(false);
            setChallengeToEdit(null);
        }
    }, [challengeToEdit]);

    const handleEditChallenge = useCallback((challenge: IChallenge) => {
        setChallengeToEdit(challenge);
        setIsModalOpen(true);
    }, []);

    const handleNewChallenge = useCallback(() => {
        setChallengeToEdit(null);
        setIsModalOpen(true);
    }, []);

    const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }, []);

    const handleMarkProgress = useCallback(async (id: string, date: string, completed: boolean) => {
        try {
            await updateChallengeProgress(id, date, completed);
            setChallenges(prevChallenges =>
                prevChallenges.map(ch => ch._id === id ? {
                    ...ch,
                    progress: ch.progress
                        ? ch.progress.map(p => p.date === date ? { date, completed } : p)
                        : [{ date, completed }]
                } : ch)
            );
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }, []);

    const filteredChallenges = useMemo(() => {
        return challenges.filter(challenge => challenge.status === filter);
    }, [challenges, filter]);

    const getProgressPercentage = (progress?: { date: string; completed: boolean }[]) => {
        if (!progress || progress.length === 0) return 0;
        const completed = progress.filter(p => p.completed).length;
        return (completed / progress.length) * 100;
    };

    return (
        <div className='challenges' id='challenges'>
            <h1>Challenges</h1>
            <div className="container">
                <div className='creation' onClick={handleNewChallenge}>
                    <img src={create} alt="createBanner" className='createBanner' />
                    <div id='new'>
                        <p>Turn Your Goals into Achievements – Create a New Challenge Today!</p>
                        <span>New Challenge</span>
                    </div>
                </div>

                <div className='yourChallenges'>
                    <div className="filterRow">
                        <h3>Your Challenges</h3>
                        <select value={filter} onChange={handleFilterChange} required>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="missed">Missed</option>
                        </select>
                    </div>
                    {filteredChallenges.length === 0 ? (
                        <p>No challenges found.</p>
                    ) : (
                        <ul>
                            {filteredChallenges.map((challenge) => (
                                <li key={challenge._id}>
                                    <div className="challengeInfo">
                                        <span>
                                            <p>Name : {challenge?.title}</p>
                                            <p>Description : {challenge?.description}</p>
                                            <p>Start Date : {new Date(challenge?.startDate).toDateString()}</p>
                                            <p>End Date : {new Date(challenge?.endDate).toDateString()}</p>
                                            <p>Frequency : {challenge?.frequency}</p>
                                        </span>
                                        <button onClick={() => handleEditChallenge(challenge)}>Edit</button>
                                    </div>
                                    <div className="progress">
                                        <div className="progressBarContainer">
                                            <div
                                                className="progressBar"
                                                style={{ width: `${getProgressPercentage(challenge?.progress)}%` }}
                                            ></div>
                                        </div>
                                        {challenge.progress?.map((progressItem, index) => (
                                            <div key={index} className="progressItem">
                                                <span>{new Date(progressItem.date).toDateString()}</span>
                                                <button
                                                    onClick={() => handleMarkProgress(challenge._id!, progressItem.date, !progressItem.completed)}
                                                    className={progressItem.completed ? 'completed' : ''}
                                                >
                                                    {progressItem.completed ? 'Completed' : 'Mark as Completed'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <ChallengeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveChallenge}
                    challengeToEdit={challengeToEdit}
                />
            )}
        </div>
    );
};

export default Challenges;

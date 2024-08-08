import React, { useState, useEffect } from 'react';
import '../styles/ChallengeModal.css';

interface IChallenge {
    _id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    frequency: 'daily' | 'weekly';
}

interface ChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (challenge: IChallenge) => void;
    challengeToEdit?: IChallenge | null;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, onSave, challengeToEdit }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

    useEffect(() => {
        if (challengeToEdit) {
            const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];
            setTitle(challengeToEdit.title);
            setDescription(challengeToEdit.description);
            setStartDate(formatDate(challengeToEdit.startDate));
            setEndDate(formatDate(challengeToEdit.endDate));
            setFrequency(challengeToEdit.frequency);
        } else {
            resetForm();
        }
    }, [challengeToEdit]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setFrequency('daily');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newChallenge: IChallenge = { title, description, startDate, endDate, frequency };
        onSave(newChallenge);
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{challengeToEdit ? 'Update Challenge' : 'Create New Challenge'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Frequency</label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                            required
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">{challengeToEdit ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChallengeModal;

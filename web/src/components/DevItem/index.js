import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import ConfirmModal from '../ConfirmModal';

function DevItem({ dev, onDelete }) {
    const [showModal, setShowModal] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(`Tem certeza que deseja excluir ${dev.name}?`)

        if(!confirmed) return;

        await api.delete(`/delete?github_username=${dev.github_username}`);
        onDelete(dev._id);
        setShowModal(false);
    }
    return (
        <li key={dev._id} className='dev-item'>
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className='user-info'>
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <button
                    type="button"
                    className='delete-btn'
                    onClick={() => setShowModal(true)}
                    aria-label='Excluir dev'
                >
                    <FiTrash2 size={18} />
                </button>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            <ConfirmModal 
                isOpen={showModal}
                message={`Tem certeza que deseja excluir ${dev.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />
        </li>
    );
}

export default DevItem;
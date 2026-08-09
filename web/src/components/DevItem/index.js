import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import ConfirmModal from '../ConfirmModal';

function DevItem({ dev, onDelete, onUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(dev.name);
    const [techs, setTechs] = useState(dev.techs.join(', '));

    async function handleDelete() {
        await api.delete(`/delete?github_username=${dev.github_username}`);
        onDelete(dev._id);
        setShowModal(false);
    }

    async function handleSave() {
        const response = await api.put(`/update?github_username=${dev.github_username}`, {
            name,
            techs: techs.split(',').map(tech => tech.trim()),
        });

        onUpdate(response.data);
        setIsEditing(false);
    }

    function handleCancel() {
        setName(dev.name);
        setTechs(dev.techs.join(', '));
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <li className="dev-item">
                <div className="edit-form">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                        placeholder="Tecnologias (separadas por vírgula)"
                    />
                    <div className="edit-actions">
                        <button type="button" className="save-btn" onClick={handleSave}>Salvar</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </li>
        );
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
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Editar dev"
                >
                    <FiEdit2 size={18} />
                </button>
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
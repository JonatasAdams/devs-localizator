import './styles.css';

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="modal-btn cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="modal-btn confirm" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
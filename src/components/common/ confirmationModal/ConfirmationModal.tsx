
import "./ConfirmationModal.css"
interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="confirmation-modal">

        <h2>
          {title}
        </h2>

        <p>
          {message}
        </p>

        <div className="modal-actions">

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmationModal;
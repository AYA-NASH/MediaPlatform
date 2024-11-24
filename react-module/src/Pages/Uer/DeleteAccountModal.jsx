import { deleteAccount } from './profile-actions';
import { useLogout } from '../Authentication/Logout';
import './DeleteAccountModal.css';

function DeleteAccountModal({ onClose }) {
    const logout = useLogout();

    const handleDeleteAccount = async () => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        try {
            const result = await deleteAccount(auth.token);
            if (result && result.message) {
                alert(result.message);
                localStorage.removeItem("auth");
                localStorage.removeItem("profile");
                logout();
            }
        } catch (err) {
            console.error("Failed to delete account", err);
            alert("An error occurred while deleting your account.");
        }
    };

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <h3>Are you sure you want to delete your account?</h3>
                <p>This action cannot be undone.</p>
                <div className="modal-actions">
                    <button onClick={handleDeleteAccount} className="confirm-btn">
                        Yes, Delete
                    </button>
                    <button onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;
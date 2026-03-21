import ModalWrapper from "../components/ui/ModalWrapper";
import Input from "../components/ui/Input";
import ModalActions from "../components/ui/ModalActions";
import { useState } from "react";
import EmojiPicker from "../components/ui/EmojiPicker";

export default function EditCategoryModal({ category, onClose, onSave }) {
  const [name, setName] = useState(category.name);
  const [emoji, setEmoji] = useState(category.emoji);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name required");
      return;
    }

    try {
      setLoading(true);
      await onSave({ name, emoji });
      onClose();
    } catch  {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Edit Category" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Category Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        <div>
          <p className="text-sm mb-2 text-gray-500">Select Emoji</p>

          <EmojiPicker value={emoji} onSelect={(e) => setEmoji(e)} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <ModalActions
          loading={loading}
          onClose={onClose}
          submitText="Save Changes"
        />
      </form>
    </ModalWrapper>
  );
}

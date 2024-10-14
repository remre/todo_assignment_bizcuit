import React from 'react';

import { GroupModalProps } from '../../types/types';

const GroupModal: React.FC<GroupModalProps> = ({ isOpen, onClose, onSave }) => {
  const [groupName, setGroupName] = React.useState('');

  const handleSave = () => {
    onSave(groupName);
    setGroupName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Add New Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Group Name"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-green-500 text-white p-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;

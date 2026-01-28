import { useState } from "react";
import { Plus, Search, Edit2, MoreHorizontal, Trash, Copy } from "lucide-react";

const emptyForm = {
  accountNo: "",
  accountName: "",
  platform: "",
  url: "",
  dateReported: "",
  status: "Active",
  officer: "",
};

export default function CompromisedAccounts() {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  // Open Create Modal
  const openCreate = () => {
    setFormData(emptyForm);
    setEditingIndex(null);
    setIsOpen(true);
  };

  // Open Edit Modal
  const openEdit = (index) => {
    setFormData(rows[index]);
    setEditingIndex(index);
    setIsOpen(true);
    setMenuIndex(null);
  };

  // Save (Create or Edit)
  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...rows];
      updated[editingIndex] = formData;
      setRows(updated);
    } else {
      setRows([...rows, formData]);
    }
    setIsOpen(false);
    setFormData(emptyForm);
  };

  // Delete row
  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
    setMenuIndex(null);
  };

  // Duplicate row
  const handleDuplicate = (index) => {
    setRows([...rows, { ...rows[index] }]);
    setMenuIndex(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Top Bar */}
        <div className="flex justify-between mb-6">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded border-blue-500 text-blue-600 rounded-full hover:bg-blue-100"
          >
            <Plus size={18} />
            CREATE NEW
          </button>

          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            
            <input
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-full text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {[
                  "No.",
                  "Account Name",
                  "Platform",
                  "URL",
                  "Date Reported",
                  "Status",
                  "Officer",
                  "Action",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{row.accountName}</td>
                  <td className="px-4 py-3">{row.platform}</td>
                  <td className="px-4 py-3 text-blue-500">{row.url}</td>
                  <td className="px-4 py-3">{row.dateReported}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        row.status === "Active"
                          ? "bg-red-100 text-red-600"
                          : row.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{row.officer}</td>

                  {/* Actions */}
                  <td className="px-4 py-3 relative">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(i)}
                        className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => setMenuIndex(menuIndex === i ? null : i)}
                        className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {menuIndex === i && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-10">
                        <button
                          onClick={() => handleDuplicate(i)}
                          className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                        >
                          <Copy size={14} /> Duplicate
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-gray-100"
                        >
                          <Trash className="text-white" size={14} /> Delete
                          <Trash size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingIndex !== null ? "Edit Record" : "Create Record"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Account Name"
                value={formData.accountName}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm col-span-2"
              />

              <input
                placeholder="Platform"
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm col-span-2"
              />

              <input
                placeholder="URL"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm col-span-2"
              />

              {/* Date Picker */}
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">
                  Date Reported
                </label>
                <input
                  type="date"
                  value={formData.dateReported}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateReported: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>

              <input
                placeholder="Officer Responsible"
                value={formData.officer}
                onChange={(e) =>
                  setFormData({ ...formData, officer: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm col-span-2"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm col-span-2"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

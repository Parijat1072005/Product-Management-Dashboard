"use client"; // This makes the button interactive

import { useState } from "react"; // Added for loading state
import { Trash2, Loader2 } from "lucide-react"; // Added Loader2 for spinner
import { deleteProduct } from "@/actions/productActions";

export default function DeleteButton({ productId }) {
  const [isDeleting, setIsDeleting] = useState(false); // New state

  const handleDelete = async () => {
    // Confirmation dialog now works because this is a Client Component
    const confirmed = confirm("Are you sure you want to delete this product?");
    
    if (confirmed) {
      setIsDeleting(true); // Start loading
      try {
        await deleteProduct(productId);
      } catch (error) {
        alert("Failed to delete product");
        setIsDeleting(false); // Reset only on error (on success the row usually disappears)
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting} // Prevent double clicks
      className={`p-2 rounded-lg transition ${
        isDeleting 
          ? "text-gray-400 bg-gray-100 cursor-not-allowed" 
          : "text-red-600 hover:bg-red-100"
      }`}
      title="Delete Product"
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}
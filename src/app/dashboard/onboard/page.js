import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { registerAdmin } from "@/actions/authActions";

export default async function OnboardPage() {
  const session = await getServerSession(authOptions);

  // Security Check: If not logged in or not an admin, kick them out
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Onboard New Admin</h2>
      <p className="text-gray-500 mb-6 text-sm">
        This action will grant full administrative access to the new user.
      </p>

      <form action={registerAdmin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            name="name" 
            type="text" 
            required 
             
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            name="email" 
            type="email" 
            required 
             
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
          <input className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            name="password" 
            type="password" 
            required 
            
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Create Admin Account
        </button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </main>
    );
  }

  if (user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Party Room!</h1>
            <p className="text-gray-600">Your MMA Fantasy adventure awaits</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl">👤</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Logged in as:</p>
                <p className="text-green-600 font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg mr-3"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => auth.signOut()}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <span className="text-white text-2xl">🥊</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Party Room</h1>
          <p className="text-gray-600 font-medium">MMA Fantasy League</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {showSignup ? <SignupForm /> : <LoginForm />}
        </div>

        {/* Toggle Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowSignup(!showSignup)}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            {showSignup ? (
              <>
                Already have an account? <span className="text-blue-600 font-semibold">Sign in</span>
              </>
            ) : (
              <>
                Need an account? <span className="text-blue-600 font-semibold">Sign up</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
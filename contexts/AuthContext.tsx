import { auth, db } from '@/lib/firebase';
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserType = 'visitor' | 'exhibitor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: UserType, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setUserProfile({
              ...profileData,
              createdAt: profileData.createdAt?.toDate() || new Date(),
              updatedAt: profileData.updatedAt?.toDate() || new Date(),
            } as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: UserType, displayName?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: displayName || user.displayName || '',
        userType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Starting logout...');
      await signOut(auth);
      console.log('Logout successful');
      // Clear local state immediately
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedProfile: UserProfile = {
        ...userProfile!,
        ...updates,
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', user.uid), {
        ...updatedProfile,
        updatedAt: new Date(),
      });
      
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
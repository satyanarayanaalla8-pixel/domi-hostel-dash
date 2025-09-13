import { useState } from 'react';
import Login from '@/components/Login';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [user, setUser] = useState<{ role: 'student' | 'admin'; id: string } | null>(null);

  const handleLogin = (role: 'student' | 'admin', userId: string) => {
    setUser({ role, id: userId });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === 'student') {
    return <StudentDashboard userId={user.id} onLogout={handleLogout} />;
  }

  return <AdminDashboard userId={user.id} onLogout={handleLogout} />;
};

export default Index;

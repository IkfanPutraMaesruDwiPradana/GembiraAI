
import React, { useState } from 'react';
import { AppView, UserProfile } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { BicaraAI } from './components/BicaraAI';
import { SelfReflection } from './components/SelfReflection';
import { ProjectBuilder } from './components/ProjectBuilder';
import { Community } from './components/Community';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { EditProfile } from './components/Profile/EditProfile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.LOGIN);
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = (userData: UserProfile) => {
    // Memberikan XP awal jika data dummy
    setUser({
      ...userData,
      xp: userData.xp || 120,
      level: userData.level || 1,
      badges: userData.badges || ['Explorer']
    });
    setActiveView(AppView.DASHBOARD);
  };

  const handleRegister = (userData: UserProfile) => {
    setUser({
      ...userData,
      xp: 0,
      level: 1,
      badges: ['Newbie']
    });
    setActiveView(AppView.DASHBOARD);
  };

  const addXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    setUser({ ...user, xp: newXP, level: newLevel });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView(AppView.LOGIN);
  };

  const renderView = () => {
    if (!user) {
      if (activeView === AppView.REGISTER) {
        return <Register onRegister={handleRegister} onNavigateLogin={() => setActiveView(AppView.LOGIN)} />;
      }
      return <Login onLogin={handleLogin} onNavigateRegister={() => setActiveView(AppView.REGISTER)} />;
    }

    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard user={user} />;
      case AppView.LITERACY_LAB:
        return <BicaraAI />;
      case AppView.IKIGAI_ENGINE:
        return <SelfReflection />; // Will rename component later
      case AppView.INTEGRITY_STUDIO:
        return <ProjectBuilder />; // Will rename component later
      case AppView.ETHICAL_FORUM:
        return <Community />; // Will rename component later
      case AppView.EDIT_PROFILE:
        return <EditProfile user={user} onUpdate={(u) => { setUser(u); setActiveView(AppView.DASHBOARD); }} onCancel={() => setActiveView(AppView.DASHBOARD)} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} user={user} onLogout={handleLogout}>
      {renderView()}
    </Layout>
  );
};

export default App;

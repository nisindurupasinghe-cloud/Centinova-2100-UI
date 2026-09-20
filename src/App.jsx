import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HomeScreen from './components/screens/HomeScreen';
import JourneyDetailsScreen from './components/screens/JourneyDetailsScreen';
import LiveMapScreen from './components/screens/LiveMapScreen';
import { SAMPLE_ROUTES } from './data/transitData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedRoute, setSelectedRoute] = useState(SAMPLE_ROUTES[0]);

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setCurrentTab('details');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#040711] text-gray-100 transition-all font-sans pb-8">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Full-Width Main View Area */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 pt-6">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <HomeScreen
                onSelectRoute={handleSelectRoute}
              />
            </motion.div>
          )}

          {currentTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <JourneyDetailsScreen
                route={selectedRoute}
                onBack={() => setCurrentTab('home')}
                onTrackLive={() => setCurrentTab('map')}
              />
            </motion.div>
          )}

          {currentTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <LiveMapScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

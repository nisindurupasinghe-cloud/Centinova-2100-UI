export const TRANSPORT_MODES = [
  {
    id: 'air_pod',
    name: 'Autonomous Sky Pod',
    category: 'Air Transport',
    icon: 'Plane',
    color: '#00f3ff',
    badge: 'Aerial Spline',
    speed: '950 km/h',
    capacity: '6 Passengers',
    energy: 'Plasma Ion Core',
    description: 'High-altitude point-to-point autonomous air pod navigating dedicated atmospheric laser channels.',
    modelType: 'sky_pod'
  },
  {
    id: 'hyper_train',
    name: 'Quantum Hyper-Train',
    category: 'Autonomous Rail',
    icon: 'TrainTrack',
    color: '#ff007f',
    badge: 'Vacuum Tunnel',
    speed: '1,400 km/h',
    capacity: '240 Passengers',
    energy: 'Zero-Point MagLev',
    description: 'Ultra-velocity subterranean vacuum tube transport connecting subterranean sector hubs in seconds.',
    modelType: 'hyper_train'
  },
  {
    id: 'quantum_bus',
    name: 'Autonomous Quantum Bus',
    category: 'Autonomous Bus',
    icon: 'Bus',
    color: '#00ff88',
    badge: 'Street Swarm',
    speed: '120 km/h',
    capacity: '32 Passengers',
    energy: 'Inductive Road Power',
    description: 'Grid-aware street shuttle utilizing collective swarm AI to dynamically bypass city congestion.',
    modelType: 'quantum_bus'
  },
  {
    id: 'smart_road',
    name: 'Vector-2100 Cyber Car',
    category: 'Smart Road Cyber Car',
    icon: 'Car',
    color: '#00f3ff',
    badge: 'Autonomous Lane',
    speed: '220 km/h',
    capacity: '4 Passengers',
    energy: 'Solid-State Fusion',
    description: 'Autonomous high-speed cyber car riding dedicated smart roads with auto-platooning.',
    modelType: 'smart_road'
  }
];

export const CITY_NODES = [
  { id: 'node-1', name: 'Aethelgard Sky-Port', sector: 'Sector 1 - Sky Canopy', type: 'air_pod', coords: [0, 4, -2] },
  { id: 'node-2', name: 'Neo-Shibuya Hyper-Hub', sector: 'Sector 4 - Commercial Ring', type: 'hyper_train', coords: [-4, 0.5, 3] },
  { id: 'node-3', name: 'Olympus High-Altitude Ring', sector: 'Sector 9 - Cloud Platform', type: 'air_pod', coords: [5, 6, -4] },
  { id: 'node-4', name: 'Aegis Ocean Grid Terminal', sector: 'Sector 12 - Deep Bay', type: 'smart_road', coords: [6, -1, 4] },
  { id: 'node-5', name: 'Zenith Sub-Surface Station', sector: 'Sector 2 - Underground Core', type: 'hyper_train', coords: [-5, -2, -3] },
  { id: 'node-6', name: 'Quantum Spine Central', sector: 'Sector 0 - Capital Nexus', type: 'quantum_bus', coords: [0, 1, 0] }
];

export const SAMPLE_ROUTES = [
  {
    id: 'route-2100-alpha',
    title: 'Ultra-Velocity Quantum Express',
    totalTime: '4m 12s',
    transfers: 1,
    aiConfidence: '99.8%',
    energyUsage: '1.2 kWh / pax',
    carbonOffset: '100% Zero-Emission',
    accessibilityScore: '10/10 (Full Assist)',
    legs: [
      {
        legIndex: 1,
        modeId: 'air_pod',
        modeName: 'Autonomous Sky Pod #AP-902',
        from: 'Aethelgard Sky-Port (Pad 4B)',
        to: 'Quantum Spine Central',
        duration: '1m 45s',
        status: 'On Time - Boarding Node 4B',
        telemetry: { speed: '920 km/h', altitude: '450m', energy: '98%' },
        instruction: 'Ascend to Level 40 Cloud Concourse. Step onto Auto-Sync Ramp.'
      },
      {
        legIndex: 2,
        modeId: 'hyper_train',
        modeName: 'Quantum Hyper-Train #HT-01',
        from: 'Quantum Spine Central',
        to: 'Neo-Shibuya Hyper-Hub',
        duration: '2m 27s',
        status: 'On Time - Sub-Level Vacuum Tube 2',
        telemetry: { speed: '1380 km/h', altitude: '-35m', energy: '100%' },
        instruction: 'Cross Seamless Transfer Gate 03. Pod sync door opens automatically.'
      }
    ]
  },
  {
    id: 'route-2100-beta',
    title: 'Eco-Grid Skyway Panoramic',
    totalTime: '6m 50s',
    transfers: 0,
    aiConfidence: '98.5%',
    energyUsage: '0.8 kWh / pax',
    carbonOffset: '100% Solar-Assisted',
    accessibilityScore: '10/10 (Direct Low-Sensory)',
    legs: [
      {
        legIndex: 1,
        modeId: 'air_pod',
        modeName: 'Autonomous Sky Pod #AP-108',
        from: 'Aethelgard Sky-Port',
        to: 'Olympus High-Altitude Ring',
        duration: '6m 50s',
        status: 'On Time - Smooth Atmospheric Flow',
        telemetry: { speed: '740 km/h', altitude: '820m', energy: '94%' },
        instruction: 'Direct air transit. No transfers needed. Relax in zero-g recliner.'
      }
    ]
  },
  {
    id: 'route-2100-gamma',
    title: 'Accessible Smart Road Swarm',
    totalTime: '8m 15s',
    transfers: 0,
    aiConfidence: '99.9%',
    energyUsage: '1.5 kWh / pax',
    carbonOffset: '100% Zero-Emission',
    accessibilityScore: '10/10 (Zero-Step Ramp & Audio-Guided)',
    legs: [
      {
        legIndex: 1,
        modeId: 'smart_road',
        modeName: 'Smart Road Cyber-Pod #SR-44',
        from: 'Neo-Shibuya Hyper-Hub',
        to: 'Aegis Ocean Grid Terminal',
        duration: '8m 15s',
        status: 'On Time - Swarm Platooning',
        telemetry: { speed: '210 km/h', altitude: '12m', energy: '99%' },
        instruction: 'Direct street-level modular pod with automatic wheelchair lock and auditory cues.'
      }
    ]
  }
];

export const LIVE_VEHICLES = [
  {
    id: 'V-SKY-2100',
    name: 'SkyPod Unit Zenith-7',
    modeId: 'air_pod',
    status: 'ACTIVE_FLIGHT',
    currentLocation: 'Over Sector 1 Sky Canopy',
    nextStop: 'Quantum Spine Central',
    speed: '915 km/h',
    altitude: '480 m',
    battery: '97%',
    passengers: 4,
    coords: [1.2, 3.8, -1.5]
  },
  {
    id: 'V-HTRAIN-88',
    name: 'Hyper-Train Tube Alpha',
    modeId: 'hyper_train',
    status: 'VACUUM_CRUISE',
    currentLocation: 'Sub-Spine Vacuum Line 3',
    nextStop: 'Neo-Shibuya Hyper-Hub',
    speed: '1,390 km/h',
    altitude: '-42 m',
    battery: '100%',
    passengers: 184,
    coords: [-2.5, 0.2, 1.8]
  },
  {
    id: 'V-BUS-04',
    name: 'Quantum Bus Swarm-X',
    modeId: 'quantum_bus',
    status: 'AUTONOMOUS_NAV',
    currentLocation: 'Commercial Grid Ring 4',
    nextStop: 'Aegis Ocean Terminal',
    speed: '115 km/h',
    altitude: '4 m',
    battery: '88%',
    passengers: 22,
    coords: [2.1, 0.8, 2.5]
  },
  {
    id: 'V-ROAD-19',
    name: 'Smart-Road Pod Vector-3',
    modeId: 'smart_road',
    status: 'PLATOON_LANE',
    currentLocation: 'Oceanic Arterial Way',
    nextStop: 'Zenith Station',
    speed: '210 km/h',
    altitude: '8 m',
    battery: '95%',
    passengers: 2,
    coords: [3.8, -0.8, 3.2]
  }
];

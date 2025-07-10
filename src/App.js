import React, { useState, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Activity, AlertTriangle, TrendingUp, TrendingDown, Download,
  Filter, Map, FileText, Users, Zap, LogIn, Lock, User,
  Shield, LogOut, Eye, EyeOff, Table, Clock, Calendar,
  ChevronRight, FileSpreadsheet, BarChart3,
  AlertCircle
} from 'lucide-react';

const LoginScreen = ({
  username, setUsername,
  password, setPassword,
  role, setRole,
  showPassword, setShowPassword,
  handleLogin,
  userRoles
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="bg-blue-800 text-white p-6">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center">KSEBL Reliability Analysis System</h2>
        <p className="text-blue-200 text-center mt-2 text-sm">SAIDI/SAIFI & Ranking Analysis Module</p>
      </div>

      <form onSubmit={handleLogin} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              required
            >
              <option value="">Select your role</option>
              {userRoles.map(userRole => (
                <option key={userRole.id} value={userRole.id}>{userRole.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          Login
        </button>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-semibold mb-1">Demo Access:</p>
          <p>Username: demo / Password: demo123</p>
          <p className="mt-1">Select any role to explore features</p>
        </div>
      </form>

      <div className="bg-gray-50 px-6 py-4 border-t">
        <p className="text-xs text-gray-500 text-center">
          Compliant with KSERC Standards of Performance Regulations 2015
        </p>
      </div>
    </div>
  </div>
);

const Demo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCircle, setSelectedCircle] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedSubDivision, setSelectedSubDivision] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-06-30'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Master Data - Complete Hierarchy
  const masterData = {
    regions: [
      { id: 'north', name: 'North Region' },
      { id: 'central', name: 'Central Region' },
      { id: 'south', name: 'South Region' }
    ],
    circles: [
      { id: 'tvm', name: 'Thiruvananthapuram', regionId: 'south' },
      { id: 'klm', name: 'Kollam', regionId: 'south' },
      { id: 'ekm', name: 'Ernakulam', regionId: 'central' },
      { id: 'ktm', name: 'Kottayam', regionId: 'central' },
      { id: 'tsr', name: 'Thrissur', regionId: 'north' },
      { id: 'pkd', name: 'Palakkad', regionId: 'north' }
    ],
    divisions: [
      { id: 'tvm-city', name: 'TVM City', circleId: 'tvm' },
      { id: 'tvm-rural', name: 'TVM Rural', circleId: 'tvm' },
      { id: 'klm-city', name: 'Kollam City', circleId: 'klm' },
      { id: 'ekm-city', name: 'EKM City', circleId: 'ekm' },
      { id: 'ekm-rural', name: 'EKM Rural', circleId: 'ekm' },
      { id: 'ktm-central', name: 'KTM Central', circleId: 'ktm' },
      { id: 'tsr-city', name: 'TSR City', circleId: 'tsr' },
      { id: 'pkd-town', name: 'PKD Town', circleId: 'pkd' }
    ],
    subDivisions: [
      { id: 'kzk', name: 'Kazhakuttom', divisionId: 'tvm-city' },
      { id: 'ntr', name: 'Neyyattinkara', divisionId: 'tvm-rural' },
      { id: 'pnr', name: 'Punalur', divisionId: 'klm-city' },
      { id: 'prm', name: 'Perumbavoor', divisionId: 'ekm-city' },
      { id: 'ang', name: 'Angamaly', divisionId: 'ekm-rural' },
      { id: 'pla', name: 'Pala', divisionId: 'ktm-central' },
      { id: 'knk', name: 'Kunnamkulam', divisionId: 'tsr-city' },
      { id: 'otp', name: 'Ottapalam', divisionId: 'pkd-town' }
    ],
    sections: [
      { id: 'kzk-u1', name: 'Kazhakuttom Urban-1', subDivisionId: 'kzk', type: 'urban' },
      { id: 'kzk-u2', name: 'Kazhakuttom Urban-2', subDivisionId: 'kzk', type: 'urban' },
      { id: 'ntr-r1', name: 'Neyyattinkara Rural-1', subDivisionId: 'ntr', type: 'rural' },
      { id: 'ntr-r2', name: 'Neyyattinkara Rural-2', subDivisionId: 'ntr', type: 'rural' },
      { id: 'ntr-rem', name: 'Neyyattinkara Remote', subDivisionId: 'ntr', type: 'remote' },
      { id: 'pnr-u1', name: 'Punalur Urban-1', subDivisionId: 'pnr', type: 'urban' },
      { id: 'prm-u1', name: 'Perumbavoor Urban-1', subDivisionId: 'prm', type: 'urban' },
      { id: 'ang-r1', name: 'Angamaly Rural-1', subDivisionId: 'ang', type: 'rural' },
      { id: 'pla-r1', name: 'Pala Rural-1', subDivisionId: 'pla', type: 'rural' },
      { id: 'knk-u1', name: 'Kunnamkulam Urban-1', subDivisionId: 'knk', type: 'urban' },
      { id: 'otp-r1', name: 'Ottapalam Rural-1', subDivisionId: 'otp', type: 'rural' },
      { id: 'otp-rem', name: 'Ottapalam Remote', subDivisionId: 'otp', type: 'remote' }
    ]
  };

  // Feeder-Section Mapping (One feeder can have multiple sections)
  const feederSectionMapping = [
    { feederId: 'FDR-11KV-001', sectionIds: ['kzk-u1', 'kzk-u2'] },
    { feederId: 'FDR-11KV-002', sectionIds: ['ntr-r1'] },
    { feederId: 'FDR-11KV-003', sectionIds: ['ntr-r2', 'ntr-rem'] },
    { feederId: 'FDR-33KV-001', sectionIds: ['pnr-u1'] },
    { feederId: 'FDR-11KV-004', sectionIds: ['prm-u1'] },
    { feederId: 'FDR-11KV-005', sectionIds: ['ang-r1'] },
    { feederId: 'FDR-33KV-002', sectionIds: ['pla-r1'] },
    { feederId: 'FDR-11KV-006', sectionIds: ['knk-u1'] },
    { feederId: 'FDR-11KV-007', sectionIds: ['otp-r1', 'otp-rem'] }
  ];

  // Feeder Master Data with enhanced details
  const feederData = [
    { id: 'FDR-11KV-001', name: 'Technopark Feeder', voltage: '11kV', saidi: 42.3, saifi: 3.2, interruptions: 12, consumers: 3500, loading: 82 },
    { id: 'FDR-11KV-002', name: 'Neyyattinkara Rural', voltage: '11kV', saidi: 58.7, saifi: 4.8, interruptions: 18, consumers: 2100, loading: 75 },
    { id: 'FDR-11KV-003', name: 'Remote Area Feeder', voltage: '11kV', saidi: 72.5, saifi: 6.1, interruptions: 25, consumers: 1200, loading: 91 },
    { id: 'FDR-33KV-001', name: 'Punalur Main', voltage: '33kV', saidi: 35.2, saifi: 2.8, interruptions: 8, consumers: 5500, loading: 78 },
    { id: 'FDR-11KV-004', name: 'Perumbavoor Industrial', voltage: '11kV', saidi: 38.9, saifi: 3.1, interruptions: 10, consumers: 4200, loading: 85 },
    { id: 'FDR-11KV-005', name: 'Angamaly Township', voltage: '11kV', saidi: 45.6, saifi: 3.6, interruptions: 14, consumers: 3800, loading: 72 },
    { id: 'FDR-33KV-002', name: 'Pala Agricultural', voltage: '33kV', saidi: 55.3, saifi: 4.5, interruptions: 16, consumers: 3200, loading: 68 },
    { id: 'FDR-11KV-006', name: 'Kunnamkulam City', voltage: '11kV', saidi: 40.1, saifi: 3.2, interruptions: 11, consumers: 4500, loading: 79 },
    { id: 'FDR-11KV-007', name: 'Ottapalam Mixed', voltage: '11kV', saidi: 62.8, saifi: 5.2, interruptions: 20, consumers: 2800, loading: 88 }
  ];

  // DTR Data linked to Sections
  const dtrData = [
    { id: 'DTR-001', name: 'Tech-1', feederId: 'FDR-11KV-001', sectionId: 'kzk-u1', capacity: 200, peakLoad: 160, avgLoad: 130, consumers: 450 },
    { id: 'DTR-002', name: 'Tech-2', feederId: 'FDR-11KV-001', sectionId: 'kzk-u1', capacity: 250, peakLoad: 200, avgLoad: 165, consumers: 520 },
    { id: 'DTR-003', name: 'Tech-3', feederId: 'FDR-11KV-001', sectionId: 'kzk-u2', capacity: 200, peakLoad: 170, avgLoad: 140, consumers: 380 },
    { id: 'DTR-004', name: 'Rural-1', feederId: 'FDR-11KV-002', sectionId: 'ntr-r1', capacity: 160, peakLoad: 140, avgLoad: 110, consumers: 280 },
    { id: 'DTR-005', name: 'Rural-2', feederId: 'FDR-11KV-003', sectionId: 'ntr-r2', capacity: 160, peakLoad: 150, avgLoad: 120, consumers: 220 },
    { id: 'DTR-006', name: 'Remote-1', feederId: 'FDR-11KV-003', sectionId: 'ntr-rem', capacity: 100, peakLoad: 95, avgLoad: 75, consumers: 150 },
    { id: 'DTR-007', name: 'Urban-P1', feederId: 'FDR-33KV-001', sectionId: 'pnr-u1', capacity: 500, peakLoad: 380, avgLoad: 320, consumers: 850 },
    { id: 'DTR-008', name: 'Indus-1', feederId: 'FDR-11KV-004', sectionId: 'prm-u1', capacity: 315, peakLoad: 280, avgLoad: 240, consumers: 420 }
  ];

  // User roles and permissions
  const userRoles = [
    { id: 'section', name: 'Section Officer', access: 'Section-level reports' },
    { id: 'subdivision', name: 'Subdivision Officer', access: 'Subdivision aggregated statistics' },
    { id: 'division', name: 'Division Officer', access: 'Division-level reports' },
    { id: 'circle', name: 'Circle Officer', access: 'Circle summary reports' },
    { id: 'region', name: 'Regional Officer', access: 'Regional compliance reports' },
    { id: 'central', name: 'Central (DPMD/Directorate)', access: 'Full dashboard and analytics' },
    { id: 'public', name: 'Public Access', access: 'Limited view - Regional summaries only' }
  ];

  // Filter functions
  const getFilteredCircles = () => {
    if (selectedRegion === 'all') return masterData.circles;
    return masterData.circles.filter(c => c.regionId === selectedRegion);
  };

  const getFilteredDivisions = () => {
    if (selectedCircle === 'all') return masterData.divisions;
    return masterData.divisions.filter(d => d.circleId === selectedCircle);
  };

  const getFilteredSubDivisions = () => {
    if (selectedDivision === 'all') return masterData.subDivisions;
    return masterData.subDivisions.filter(sd => sd.divisionId === selectedDivision);
  };

  const getFilteredSections = () => {
    if (selectedSubDivision === 'all') return masterData.sections;
    return masterData.sections.filter(s => s.subDivisionId === selectedSubDivision);
  };

  // Get feeders based on selected section
  const getFilteredFeeders = useCallback(() => {
    if (selectedSection === 'all') {
      const filteredSectionIds = getFilteredSections().map(s => s.id);
      const feedersInSections = feederSectionMapping
        .filter(mapping => mapping.sectionIds.some(id => filteredSectionIds.includes(id)))
        .map(mapping => mapping.feederId);

      return feederData.filter(f => feedersInSections.includes(f.id));
    }

    const feedersInSection = feederSectionMapping
      .filter(mapping => mapping.sectionIds.includes(selectedSection))
      .map(mapping => mapping.feederId);

    return feederData.filter(f => feedersInSection.includes(f.id));
  }, [selectedRegion, selectedCircle, selectedDivision, selectedSubDivision, selectedSection]);

  // Calculate indices based on filters
  const reliabilityIndices = useMemo(() => {
    const filteredFeeders = getFilteredFeeders();

    if (filteredFeeders.length === 0) {
      return { saidi: '0', saifi: '0', caidi: '0', maifi: '0', caifi: '0' };
    }

    const totalConsumers = filteredFeeders.reduce((sum, f) => sum + f.consumers, 0);
    const weightedSaidi = filteredFeeders.reduce((sum, f) => sum + (f.saidi * f.consumers), 0) / totalConsumers;
    const weightedSaifi = filteredFeeders.reduce((sum, f) => sum + (f.saifi * f.consumers), 0) / totalConsumers;

    return {
      saidi: weightedSaidi.toFixed(2),
      saifi: weightedSaifi.toFixed(2),
      caidi: (weightedSaidi / weightedSaifi).toFixed(2),
      maifi: (weightedSaifi * 0.55).toFixed(2), // Estimated
      caifi: (weightedSaifi * 0.32).toFixed(2)  // Estimated
    };
  }, [selectedRegion, selectedCircle, selectedDivision, selectedSubDivision, selectedSection]);

  // Interruption data with dates
  const interruptionData = [
    { id: 'INT-001', date: '2024-03-15', time: '10:30', feederId: 'FDR-11KV-001', sectionId: 'kzk-u1', duration: 45, type: 'Sustained', cause: 'Tree Contact', consumers: 850 },
    { id: 'INT-002', date: '2024-03-16', time: '14:15', feederId: 'FDR-11KV-002', sectionId: 'ntr-r1', duration: 120, type: 'Sustained', cause: 'Equipment Failure', consumers: 650 },
    { id: 'INT-003', date: '2024-04-10', time: '09:00', feederId: 'FDR-33KV-001', sectionId: 'pnr-u1', duration: 3, type: 'Momentary', cause: 'Bird Contact', consumers: 2100 },
    { id: 'INT-004', date: '2024-04-22', time: '16:45', feederId: 'FDR-11KV-003', sectionId: 'ntr-rem', duration: 180, type: 'Sustained', cause: 'Storm', consumers: 450 },
    { id: 'INT-005', date: '2024-05-05', time: '11:20', feederId: 'FDR-11KV-004', sectionId: 'prm-u1', duration: 30, type: 'Sustained', cause: 'Maintenance', consumers: 1200 },
    { id: 'INT-006', date: '2024-05-18', time: '18:30', feederId: 'FDR-11KV-005', sectionId: 'ang-r1', duration: 2, type: 'Momentary', cause: 'Unknown', consumers: 1800 },
    { id: 'INT-007', date: '2024-06-02', time: '13:15', feederId: 'FDR-11KV-006', sectionId: 'knk-u1', duration: 60, type: 'Sustained', cause: 'Cable Fault', consumers: 950 },
    { id: 'INT-008', date: '2024-06-15', time: '07:45', feederId: 'FDR-11KV-007', sectionId: 'otp-rem', duration: 240, type: 'Sustained', cause: 'Remote Area Access', consumers: 320 }
  ];

  // Filter interruptions by date range
  const getFilteredInterruptions = () => {
    return interruptionData.filter(interruption => {
      const intDate = new Date(interruption.date);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      return intDate >= startDate && intDate <= endDate;
    });
  };

  // Trend data
  const trendData = [
    { month: 'Jan', saidi: 48.5, saifi: 4.1, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Feb', saidi: 46.2, saifi: 3.9, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Mar', saidi: 45.8, saifi: 3.8, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Apr', saidi: 44.1, saifi: 3.7, target_saidi: 40, target_saifi: 3.5 },
    { month: 'May', saidi: 43.5, saifi: 3.6, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Jun', saidi: 45.2, saifi: 3.8, target_saidi: 40, target_saifi: 3.5 }
  ];

  // Section type distribution
  const sectionTypeDistribution = [
    { name: 'Urban', value: 45, color: '#10b981' },
    { name: 'Rural', value: 40, color: '#f59e0b' },
    { name: 'Remote', value: 15, color: '#ef4444' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUsername('');
    setPassword('');
    setRole('');
    setSelectedView('dashboard');
  };

  // Check if user has access to a view
  const hasAccess = (view) => {
    if (userRole === 'public' && ['feeders', 'dtr', 'interruptions', 'quarterly'].includes(view)) {
      return false;
    }
    if (userRole === 'section' && ['quarterly'].includes(view)) {
      return false;
    }
    return true;
  };



  const MetricCard = ({ title, value, unit, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {value} <span className="text-lg text-gray-500">{unit}</span>
      </p>
    </div>
  );

  const Dashboard = () => {
    const filteredFeeders = getFilteredFeeders();
    const filteredInterruptions = getFilteredInterruptions();

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="SAIDI"
            value={reliabilityIndices.saidi}
            unit="min/cons"
            icon={Activity}
            trend={-5.2}
            color="bg-blue-500"
          />
          <MetricCard
            title="SAIFI"
            value={reliabilityIndices.saifi}
            unit="int/cons"
            icon={AlertTriangle}
            trend={-3.8}
            color="bg-purple-500"
          />
          <MetricCard
            title="CAIDI"
            value={reliabilityIndices.caidi}
            unit="min/int"
            icon={Zap}
            color="bg-green-500"
          />
          <MetricCard
            title="MAIFI"
            value={reliabilityIndices.maifi}
            unit="int/cons"
            icon={Activity}
            color="bg-orange-500"
          />
          <MetricCard
            title="CAIFI"
            value={reliabilityIndices.caifi}
            unit="int/cons"
            icon={Users}
            color="bg-pink-500"
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Feeders</p>
            <p className="text-2xl font-bold">{filteredFeeders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Consumers</p>
            <p className="text-2xl font-bold">{filteredFeeders.reduce((sum, f) => sum + f.consumers, 0).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Interruptions (Period)</p>
            <p className="text-2xl font-bold">{filteredInterruptions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Avg Loading</p>
            <p className="text-2xl font-bold">{(filteredFeeders.reduce((sum, f) => sum + f.loading, 0) / filteredFeeders.length || 0).toFixed(1)}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">SAIDI/SAIFI Trend Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saidi" stroke="#3b82f6" strokeWidth={2} name="SAIDI" />
                <Line type="monotone" dataKey="saifi" stroke="#8b5cf6" strokeWidth={2} name="SAIFI" />
                <Line type="monotone" dataKey="target_saidi" stroke="#ef4444" strokeDasharray="5 5" name="Target SAIDI" />
                <Line type="monotone" dataKey="target_saifi" stroke="#f59e0b" strokeDasharray="5 5" name="Target SAIFI" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Section Type Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Above SAIDI Threshold - Consumer Distribution by Section Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectionTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectionTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Worst Performing Feeders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Critical Feeders - Highest SAIDI</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredFeeders.sort((a, b) => b.saidi - a.saidi).slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="saidi" fill="#ef4444" name="SAIDI (min/consumer)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const FeederRanking = () => {
    const filteredFeeders = getFilteredFeeders();

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Feeder Performance Ranking</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeder ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voltage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAIDI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAIFI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interruptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeeders
                .sort((a, b) => a.saidi - b.saidi)
                .map((feeder, index) => {
                  const sections = feederSectionMapping
                    .find(m => m.feederId === feeder.id)?.sectionIds
                    .map(sId => masterData.sections.find(s => s.id === sId))
                    .filter(Boolean) || [];

                  return (
                    <tr key={feeder.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.voltage}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {sections.map(section => (
                            <span key={section.id} className={`px-2 py-1 text-xs rounded-full ${section.type === 'urban' ? 'bg-green-100 text-green-800' :
                              section.type === 'rural' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                              {section.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.saidi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.saifi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.interruptions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.consumers.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">{feeder.loading}%</div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${feeder.loading > 90 ? 'bg-red-500' : feeder.loading > 75 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                              style={{ width: `${feeder.loading}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const DTRAnalysis = () => {
    const filteredSections = getFilteredSections();
    const filteredDTRs = dtrData.filter(dtr =>
      filteredSections.some(section => section.id === dtr.sectionId)
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">DTR Loading Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredDTRs.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="peakLoad" fill="#ef4444" name="Peak Load (A)" />
              <Bar dataKey="avgLoad" fill="#3b82f6" name="Average Load (A)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">DTR Performance Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DTR ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (A)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Load (A)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Load (A)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDTRs.map((dtr, index) => {
                  const section = masterData.sections.find(s => s.id === dtr.sectionId);
                  const utilization = ((dtr.peakLoad / dtr.capacity) * 100).toFixed(1);

                  return (
                    <tr key={dtr.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.feederId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 text-xs rounded-full ${section?.type === 'urban' ? 'bg-green-100 text-green-800' :
                          section?.type === 'rural' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {section?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.peakLoad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.avgLoad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.consumers}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">{utilization}%</div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${utilization > 90 ? 'bg-red-500' : utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                              style={{ width: `${utilization}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const InterruptionReport = () => {
    const filteredInterruptions = getFilteredInterruptions();

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Interruption Details Report</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Total Interruptions</p>
            <p className="text-xl font-bold">{filteredInterruptions.length}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Sustained (&gt;5 min)</p>
            <p className="text-xl font-bold">{filteredInterruptions.filter(i => i.type === 'Sustained').length}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Momentary (≤5 min)</p>
            <p className="text-xl font-bold">{filteredInterruptions.filter(i => i.type === 'Momentary').length}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Affected Consumers</p>
            <p className="text-xl font-bold">{filteredInterruptions.reduce((sum, i) => sum + i.consumers, 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (min)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cause</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumers</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInterruptions.map((interruption, index) => {
                const section = masterData.sections.find(s => s.id === interruption.sectionId);

                return (
                  <tr key={interruption.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.feederId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 text-xs rounded-full ${section?.type === 'urban' ? 'bg-green-100 text-green-800' :
                        section?.type === 'rural' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {section?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${interruption.type === 'Sustained' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {interruption.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.cause}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.consumers.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Reports = () => {
    const reportTypes = [
      {
        id: 'quarterly',
        title: 'Quarterly Performance Report - Q2 2024',
        subtitle: 'Annexure I - Feeder-wise Reliability Indices',
        icon: FileText,
        color: 'text-blue-500',
        status: 'Submitted',
        statusColor: 'bg-green-100 text-green-800',
        generated: '01-Jul-2024',
        description: 'Complete quarterly analysis of all reliability indices by feeder and section'
      },
      {
        id: 'area',
        title: 'Area-wise Performance Summary - Q2 2024',
        subtitle: 'Annexure II - Urban/Rural/Remote Areas',
        icon: PieChart,
        color: 'text-purple-500',
        status: 'Submitted',
        statusColor: 'bg-green-100 text-green-800',
        generated: '01-Jul-2024',
        description: 'Comparative analysis across different section types'
      },
      {
        id: 'heatmap',
        title: 'Interruption Heatmap Report - June 2024',
        subtitle: 'Geographic distribution of power interruptions',
        icon: Map,
        color: 'text-green-500',
        status: 'Draft',
        statusColor: 'bg-blue-100 text-blue-800',
        generated: '28-Jun-2024',
        description: 'Visual representation of interruption density across regions'
      },
      {
        id: 'trend',
        title: 'Trend Analysis Report - H1 2024',
        subtitle: 'Six-month performance trends and projections',
        icon: TrendingUp,
        color: 'text-orange-500',
        status: 'In Progress',
        statusColor: 'bg-yellow-100 text-yellow-800',
        generated: '15-Jun-2024',
        description: 'Historical trend analysis with future projections'
      },
      {
        id: 'ranking',
        title: 'Feeder & DTR Ranking Report - June 2024',
        subtitle: 'Performance-based ranking of all assets',
        icon: BarChart3,
        color: 'text-red-500',
        status: 'Published',
        statusColor: 'bg-green-100 text-green-800',
        generated: '05-Jul-2024',
        description: 'Comprehensive ranking based on reliability metrics'
      },
      {
        id: 'compliance',
        title: 'KSERC Compliance Report - Annual 2023',
        subtitle: 'Complete regulatory submission package',
        icon: Shield,
        color: 'text-indigo-500',
        status: 'Approved',
        statusColor: 'bg-purple-100 text-purple-800',
        generated: '15-Jan-2024',
        description: 'Official submission to Kerala State Electricity Regulatory Commission'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Report Management Center</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <FileText className="w-4 h-4" />
              Generate New Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <Icon className={`w-8 h-8 ${report.color} mt-1`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{report.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-2">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${report.statusColor}`}>
                        {report.status}
                      </span>
                      <span className="text-gray-500">Generated: {report.generated}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Report Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm font-medium">Excel Report</span>
              <span className="text-xs text-gray-500 mt-1">Generate .xlsx format</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <FileText className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm font-medium">PDF Report</span>
              <span className="text-xs text-gray-500 mt-1">Generate .pdf format</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Table className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm font-medium">CSV Export</span>
              <span className="text-xs text-gray-500 mt-1">Raw data export</span>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Regulatory Compliance Note</p>
              <p className="text-sm text-blue-800 mt-1">
                All reports are generated as per Regulation 7 of KSERC Standards of Performance of Distribution Licensees Regulations, 2015.
                Quarterly reports must be submitted within 30 days of quarter end.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
        userRoles={userRoles}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">KSEBL Reliability Analysis System</h1>
              <p className="text-blue-200 text-sm">SAIDI/SAIFI & Ranking Analysis Module</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{userRoles.find(r => r.id === userRole)?.name}</p>
                <p className="text-xs text-blue-200">{userRoles.find(r => r.id === userRole)?.access}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'feeders', label: 'Feeder Ranking', icon: Zap },
              { id: 'dtr', label: 'DTR Analysis', icon: AlertTriangle },
              { id: 'interruptions', label: 'Interruptions', icon: Clock },
              { id: 'reports', label: 'Reports', icon: FileText }
            ].map(({ id, label, icon: Icon }) => {
              if (!hasAccess(id)) return null;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedView(id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${selectedView === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-3">
            {/* Hierarchical Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Location:</span>
              </div>

              {/* Region */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setSelectedCircle('all');
                    setSelectedDivision('all');
                    setSelectedSubDivision('all');
                    setSelectedSection('all');
                  }}
                  className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  {masterData.regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
                {selectedRegion !== 'all' && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>

              {/* Circle */}
              {selectedRegion !== 'all' && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCircle}
                    onChange={(e) => {
                      setSelectedCircle(e.target.value);
                      setSelectedDivision('all');
                      setSelectedSubDivision('all');
                      setSelectedSection('all');
                    }}
                    className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Circles</option>
                    {getFilteredCircles().map(circle => (
                      <option key={circle.id} value={circle.id}>{circle.name}</option>
                    ))}
                  </select>
                  {selectedCircle !== 'all' && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              )}

              {/* Division */}
              {selectedCircle !== 'all' && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedSubDivision('all');
                      setSelectedSection('all');
                    }}
                    className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Divisions</option>
                    {getFilteredDivisions().map(division => (
                      <option key={division.id} value={division.id}>{division.name}</option>
                    ))}
                  </select>
                  {selectedDivision !== 'all' && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              )}

              {/* Sub Division */}
              {selectedDivision !== 'all' && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSubDivision}
                    onChange={(e) => {
                      setSelectedSubDivision(e.target.value);
                      setSelectedSection('all');
                    }}
                    className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Sub Divisions</option>
                    {getFilteredSubDivisions().map(subDiv => (
                      <option key={subDiv.id} value={subDiv.id}>{subDiv.name}</option>
                    ))}
                  </select>
                  {selectedSubDivision !== 'all' && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              )}

              {/* Section */}
              {selectedSubDivision !== 'all' && (
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Sections</option>
                  {getFilteredSections().map(section => (
                    <option key={section.id} value={section.id}>
                      {section.name} ({section.type})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Date Range:</span>
              </div>

              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span className="text-sm text-gray-500">to</span>

              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'dashboard' && <Dashboard />}
        {selectedView === 'feeders' && <FeederRanking />}
        {selectedView === 'dtr' && <DTRAnalysis />}
        {selectedView === 'interruptions' && <InterruptionReport />}
        {selectedView === 'reports' && <Reports />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              © 2024 Kerala State Electricity Board Limited (KSEBL) | Compliant with KSERC SOP Regulations 2015
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Integrated with TRANS | OrumaNet | SCADA | GIS Systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;
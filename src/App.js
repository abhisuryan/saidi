import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, AlertTriangle, TrendingUp, TrendingDown, Download, 
  Filter, Map, FileText, Users, Zap, LogIn, Lock, User, 
  Shield, LogOut, Eye, EyeOff, Table, Clock, Calendar 
} from 'lucide-react';

const Demo = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCircle, setSelectedCircle] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [timeRange, setTimeRange] = useState('quarterly');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '', role: '' });

  // Sample hierarchical data structure
  const hierarchyData = {
    regions: [
      { id: 'north', name: 'North Region', circles: ['thrissur', 'palakkad'] },
      { id: 'central', name: 'Central Region', circles: ['ernakulam', 'kottayam'] },
      { id: 'south', name: 'South Region', circles: ['trivandrum', 'kollam'] }
    ],
    circles: {
      'thrissur': { name: 'Thrissur Circle', divisions: ['kunnamkulam', 'chalakudy'] },
      'palakkad': { name: 'Palakkad Circle', divisions: ['ottapalam', 'mannarkkad'] },
      'ernakulam': { name: 'Ernakulam Circle', divisions: ['perumbavoor', 'angamaly'] },
      'kottayam': { name: 'Kottayam Circle', divisions: ['pala', 'changanassery'] },
      'trivandrum': { name: 'Trivandrum Circle', divisions: ['kazhakoottam', 'neyyattinkara'] },
      'kollam': { name: 'Kollam Circle', divisions: ['punalur', 'karunagappally'] }
    }
  };

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

  // Calculate indices based on filters
  const reliabilityIndices = useMemo(() => {
    const baseValues = {
      saidi: 45.2,
      saifi: 3.8,
      caidi: 11.89,
      maifi: 2.1,
      caifi: 1.2
    };

    // Apply filters effect
    const regionMultiplier = selectedRegion === 'north' ? 1.1 : selectedRegion === 'south' ? 0.9 : 1;
    const areaMultiplier = selectedArea === 'rural' ? 1.3 : selectedArea === 'urban' ? 0.8 : 1;

    return {
      saidi: (baseValues.saidi * regionMultiplier * areaMultiplier).toFixed(2),
      saifi: (baseValues.saifi * regionMultiplier * areaMultiplier).toFixed(2),
      caidi: (baseValues.caidi).toFixed(2),
      maifi: (baseValues.maifi * regionMultiplier).toFixed(2),
      caifi: (baseValues.caifi).toFixed(2)
    };
  }, [selectedRegion, selectedArea]);

  // Sample feeder data
  const feederData = [
    { name: 'FDR-11KV-001', saidi: 52.3, saifi: 4.2, interruptions: 15, consumers: 2850, area: 'urban', loading: 85, voltage: '11kV', section: 'Kunnamkulam-1' },
    { name: 'FDR-11KV-002', saidi: 38.7, saifi: 3.1, interruptions: 11, consumers: 3200, area: 'urban', loading: 72, voltage: '11kV', section: 'Kunnamkulam-2' },
    { name: 'FDR-11KV-003', saidi: 61.5, saifi: 5.3, interruptions: 19, consumers: 1950, area: 'rural', loading: 91, voltage: '11kV', section: 'Chalakudy-1' },
    { name: 'FDR-33KV-001', saidi: 45.2, saifi: 3.6, interruptions: 13, consumers: 5100, area: 'urban', loading: 78, voltage: '33kV', section: 'Thrissur-Central' },
    { name: 'FDR-11KV-004', saidi: 71.8, saifi: 6.1, interruptions: 22, consumers: 1600, area: 'rural', loading: 95, voltage: '11kV', section: 'Ottapalam-Rural' },
    { name: 'FDR-11KV-005', saidi: 33.4, saifi: 2.8, interruptions: 10, consumers: 4100, area: 'urban', loading: 68, voltage: '11kV', section: 'Ernakulam-City' },
    { name: 'FDR-33KV-002', saidi: 55.9, saifi: 4.7, interruptions: 17, consumers: 3800, area: 'rural', loading: 82, voltage: '33kV', section: 'Pala-Industrial' },
    { name: 'FDR-11KV-006', saidi: 42.1, saifi: 3.4, interruptions: 12, consumers: 2950, area: 'urban', loading: 74, voltage: '11kV', section: 'Trivandrum-North' }
  ];

  // DTR performance data
  const dtrData = [
    { name: 'DTR-001', feeder: 'FDR-11KV-001', peakLoad: 150, avgLoad: 120, interruptions: 5, capacity: 200, utilization: 75 },
    { name: 'DTR-002', feeder: 'FDR-11KV-001', peakLoad: 180, avgLoad: 145, interruptions: 3, capacity: 200, utilization: 90 },
    { name: 'DTR-003', feeder: 'FDR-11KV-002', peakLoad: 165, avgLoad: 132, interruptions: 7, capacity: 250, utilization: 66 },
    { name: 'DTR-004', feeder: 'FDR-11KV-002', peakLoad: 142, avgLoad: 115, interruptions: 2, capacity: 200, utilization: 71 },
    { name: 'DTR-005', feeder: 'FDR-11KV-003', peakLoad: 195, avgLoad: 160, interruptions: 9, capacity: 200, utilization: 97.5 },
    { name: 'DTR-006', feeder: 'FDR-11KV-003', peakLoad: 175, avgLoad: 140, interruptions: 6, capacity: 250, utilization: 70 }
  ];

  // Interruption details data
  const interruptionData = [
    { id: 'INT-001', date: '2024-06-15', time: '10:30', feeder: 'FDR-11KV-001', duration: 45, type: 'Sustained', cause: 'Tree Contact', consumers: 850 },
    { id: 'INT-002', date: '2024-06-15', time: '14:15', feeder: 'FDR-11KV-003', duration: 120, type: 'Sustained', cause: 'Equipment Failure', consumers: 1950 },
    { id: 'INT-003', date: '2024-06-16', time: '09:00', feeder: 'FDR-33KV-001', duration: 3, type: 'Momentary', cause: 'Bird Contact', consumers: 5100 },
    { id: 'INT-004', date: '2024-06-16', time: '16:45', feeder: 'FDR-11KV-002', duration: 30, type: 'Sustained', cause: 'Maintenance', consumers: 1200 },
    { id: 'INT-005', date: '2024-06-17', time: '11:20', feeder: 'FDR-11KV-004', duration: 90, type: 'Sustained', cause: 'Storm', consumers: 1600 },
    { id: 'INT-006', date: '2024-06-17', time: '18:30', feeder: 'FDR-11KV-005', duration: 2, type: 'Momentary', cause: 'Unknown', consumers: 4100 }
  ];

  // Quarterly performance data for tabular reports
  const quarterlyData = [
    { 
      circle: 'Thrissur', 
      division: 'Kunnamkulam', 
      q1_saidi: 42.3, q1_saifi: 3.5, q1_caidi: 12.1,
      q2_saidi: 45.2, q2_saifi: 3.8, q2_caidi: 11.9,
      q3_saidi: 43.7, q3_saifi: 3.6, q3_caidi: 12.1,
      q4_saidi: 41.8, q4_saifi: 3.4, q4_caidi: 12.3,
      annual_saidi: 43.3, annual_saifi: 3.6, annual_caidi: 12.0
    },
    { 
      circle: 'Ernakulam', 
      division: 'Perumbavoor', 
      q1_saidi: 38.5, q1_saifi: 3.2, q1_caidi: 12.0,
      q2_saidi: 36.7, q2_saifi: 3.0, q2_caidi: 12.2,
      q3_saidi: 37.2, q3_saifi: 3.1, q3_caidi: 12.0,
      q4_saidi: 35.9, q4_saifi: 2.9, q4_caidi: 12.4,
      annual_saidi: 37.1, annual_saifi: 3.1, annual_caidi: 12.0
    },
    { 
      circle: 'Trivandrum', 
      division: 'Kazhakoottam', 
      q1_saidi: 40.2, q1_saifi: 3.3, q1_caidi: 12.2,
      q2_saidi: 39.8, q2_saifi: 3.3, q2_caidi: 12.1,
      q3_saidi: 38.5, q3_saifi: 3.2, q3_caidi: 12.0,
      q4_saidi: 37.1, q4_saifi: 3.0, q4_caidi: 12.4,
      annual_saidi: 38.9, annual_saifi: 3.2, annual_caidi: 12.2
    }
  ];

  // Trend data for line chart
  const trendData = [
    { month: 'Jan', saidi: 48.5, saifi: 4.1, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Feb', saidi: 46.2, saifi: 3.9, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Mar', saidi: 45.8, saifi: 3.8, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Apr', saidi: 44.1, saifi: 3.7, target_saidi: 40, target_saifi: 3.5 },
    { month: 'May', saidi: 43.5, saifi: 3.6, target_saidi: 40, target_saifi: 3.5 },
    { month: 'Jun', saidi: 45.2, saifi: 3.8, target_saidi: 40, target_saifi: 3.5 }
  ];

  // Area distribution data
  const areaDistribution = [
    { name: 'Urban', value: 45, color: '#10b981' },
    { name: 'Rural', value: 40, color: '#f59e0b' },
    { name: 'Difficult', value: 15, color: '#ef4444' }
  ];

  // Filter feeders based on selection
  const filteredFeeders = feederData.filter(feeder => 
    selectedArea === 'all' || feeder.area === selectedArea
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password && loginData.role) {
      setIsAuthenticated(true);
      setUserRole(loginData.role);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setLoginData({ username: '', password: '', role: '' });
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

  const LoginScreen = () => (
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
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
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
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
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
                value={loginData.role}
                onChange={(e) => setLoginData({...loginData, role: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">Select your role</option>
                {userRoles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
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

  const Dashboard = () => (
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

        {/* Area Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Consumer Distribution by Area Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={areaDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {areaDistribution.map((entry, index) => (
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
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="saidi" fill="#ef4444" name="SAIDI (min/consumer)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const FeederRanking = () => (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voltage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAIDI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAIFI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interruptions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading %</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFeeders
              .sort((a, b) => a.saidi - b.saidi)
              .map((feeder, index) => (
                <tr key={feeder.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.voltage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.saidi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.saifi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.interruptions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feeder.consumers.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      feeder.area === 'urban' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feeder.area}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{feeder.loading}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            feeder.loading > 90 ? 'bg-red-500' : feeder.loading > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${feeder.loading}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const DTRAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">DTR Loading Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dtrData}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (A)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Load (A)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Load (A)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interruptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dtrData.map((dtr, index) => (
                <tr key={dtr.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.feeder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.peakLoad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.avgLoad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dtr.interruptions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">{dtr.utilization}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dtr.utilization > 90 ? 'bg-red-500' : dtr.utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${dtr.utilization}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const InterruptionReport = () => (
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
          <p className="text-xl font-bold">{interruptionData.length}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Sustained (&gt;5 min)</p>
          <p className="text-xl font-bold">{interruptionData.filter(i => i.type === 'Sustained').length}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Momentary (≤5 min)</p>
          <p className="text-xl font-bold">{interruptionData.filter(i => i.type === 'Momentary').length}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Affected Consumers</p>
          <p className="text-xl font-bold">{interruptionData.reduce((sum, i) => sum + i.consumers, 0).toLocaleString()}</p>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (min)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cause</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumers</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interruptionData.map((interruption, index) => (
              <tr key={interruption.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.feeder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    interruption.type === 'Sustained' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {interruption.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.cause}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interruption.consumers.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const QuarterlyReport = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">KSERC Quarterly Performance Report - 2024</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FileText className="w-4 h-4" />
            Generate PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Report Period:</strong> January 2024 - December 2024 | <strong>Status:</strong> Draft | 
          <strong>Compliance:</strong> As per Regulation 7(3) of KSERC SOP 2015
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Circle</th>
              <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
              <th colSpan="3" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l">Q1 2024</th>
              <th colSpan="3" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l">Q2 2024</th>
              <th colSpan="3" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l">Q3 2024</th>
              <th colSpan="3" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l">Q4 2024</th>
              <th colSpan="3" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l bg-yellow-50">Annual 2024</th>
            </tr>
            <tr>
              {['Q1', 'Q2', 'Q3', 'Q4', 'Annual'].map((quarter, idx) => (
                <React.Fragment key={quarter}>
                  <th className={`px-2 py-2 text-xs text-gray-500 ${idx > 0 ? 'border-l' : ''} ${quarter === 'Annual' ? 'bg-yellow-50' : ''}`}>SAIDI</th>
                  <th className={`px-2 py-2 text-xs text-gray-500 ${quarter === 'Annual' ? 'bg-yellow-50' : ''}`}>SAIFI</th>
                  <th className={`px-2 py-2 text-xs text-gray-500 ${quarter === 'Annual' ? 'bg-yellow-50' : ''}`}>CAIDI</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quarterlyData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.circle}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.division}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border-l">{row.q1_saidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q1_saifi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q1_caidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border-l">{row.q2_saidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q2_saifi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q2_caidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border-l">{row.q3_saidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q3_saifi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q3_caidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border-l">{row.q4_saidi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q4_saifi}</td>
                <td className="px-2 py-3 text-sm text-gray-900">{row.q4_caidi}</td>
                <td className="px-2 py-3 text-sm font-semibold text-gray-900 border-l bg-yellow-50">{row.annual_saidi}</td>
                <td className="px-2 py-3 text-sm font-semibold text-gray-900 bg-yellow-50">{row.annual_saifi}</td>
                <td className="px-2 py-3 text-sm font-semibold text-gray-900 bg-yellow-50">{row.annual_caidi}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td colSpan="2" className="px-4 py-3 text-sm font-semibold text-gray-900">State Average</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900 border-l">40.3</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">3.3</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">12.2</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900 border-l">40.6</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">3.4</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">11.9</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900 border-l">39.8</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">3.3</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">12.1</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900 border-l">38.3</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">3.1</td>
              <td className="px-2 py-3 text-sm font-semibold text-gray-900">12.4</td>
              <td className="px-2 py-3 text-sm font-bold text-gray-900 border-l bg-yellow-100">39.8</td>
              <td className="px-2 py-3 text-sm font-bold text-gray-900 bg-yellow-100">3.3</td>
              <td className="px-2 py-3 text-sm font-bold text-gray-900 bg-yellow-100">12.1</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-semibold text-green-800">Performance Target Met</p>
          <p className="text-xs text-green-700 mt-1">SAIDI &lt; 40 min/consumer achieved in Q3 & Q4</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm font-semibold text-yellow-800">Improvement Areas</p>
          <p className="text-xs text-yellow-700 mt-1">Rural feeders require infrastructure upgrades</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-800">Next Submission</p>
          <p className="text-xs text-blue-700 mt-1">Q1 2025 Report due by April 15, 2025</p>
        </div>
      </div>
    </div>
  );

  const Reports = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Regulatory Reports - KSERC Compliance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <h4 className="font-medium">Quarterly Performance Report - Q2 2024</h4>
                <p className="text-sm text-gray-600">Annexure I - Feeder-wise Reliability Indices</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Submitted</span>
            <span className="text-gray-500">Generated: 01-Jul-2024</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <h4 className="font-medium">Area-wise Performance Summary - Q2 2024</h4>
                <p className="text-sm text-gray-600">Annexure II - Urban/Rural/Difficult Areas</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Submitted</span>
            <span className="text-gray-500">Generated: 01-Jul-2024</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Map className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-medium">Interruption Heatmap Report - June 2024</h4>
                <p className="text-sm text-gray-600">Geographic distribution of power interruptions</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Draft</span>
            <span className="text-gray-500">Generated: 28-Jun-2024</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-500" />
              <div>
                <h4 className="font-medium">Annual Performance Report - 2023</h4>
                <p className="text-sm text-gray-600">Comprehensive reliability analysis</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Published</span>
            <span className="text-gray-500">Generated: 15-Jan-2024</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All reports are generated as per Regulation 7 of KSERC Standards of Performance of Distribution Licensees Regulations, 2015.
        </p>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return <LoginScreen />;
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
              { id: 'quarterly', label: 'Quarterly Report', icon: Table },
              { id: 'reports', label: 'Reports', icon: FileText }
            ].map(({ id, label, icon: Icon }) => {
              if (!hasAccess(id)) return null;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedView(id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    selectedView === id
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
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Regions</option>
              {hierarchyData.regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>

            <select
              value={selectedCircle}
              onChange={(e) => setSelectedCircle(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Circles</option>
              {selectedRegion !== 'all' && hierarchyData.regions
                .find(r => r.id === selectedRegion)?.circles
                .map(circleId => (
                  <option key={circleId} value={circleId}>
                    {hierarchyData.circles[circleId].name}
                  </option>
                ))}
            </select>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Areas</option>
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
              <option value="difficult">Difficult</option>
            </select>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'dashboard' && <Dashboard />}
        {selectedView === 'feeders' && <FeederRanking />}
        {selectedView === 'dtr' && <DTRAnalysis />}
        {selectedView === 'interruptions' && <InterruptionReport />}
        {selectedView === 'quarterly' && <QuarterlyReport />}
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

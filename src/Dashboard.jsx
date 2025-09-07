import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// The initial JSON structure for the dashboard's widgets.
const initialDashboardData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: (
            <div className="flex flex-col items-center justify-center p-4">
              <svg className="w-24 h-24" viewBox="0 0 36 36">
                <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="4" fill="none"></path>
                <path className="text-blue-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" strokeDasharray="50, 100" strokeWidth="4" fill="none"></path>
              </svg>
              <p className="mt-2 text-3xl font-bold">2</p>
              <div className="mt-4 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 mr-2 bg-blue-600 rounded-full"></span>
                  Connected (2)
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 mr-2 bg-gray-400 rounded-full"></span>
                  Not Connected (2)
                </div>
              </div>
            </div>
          ),
          default: true,
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          content: (
            <div className="flex flex-col items-center justify-center p-4">
               <svg className="w-24 h-24" viewBox="0 0 36 36">
                <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="4" fill="none"></path>
                <path className="text-red-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" strokeDasharray="10, 100" strokeWidth="4" fill="none"></path>
                <path className="text-yellow-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" strokeDasharray="5, 100" strokeDashoffset="-10" strokeWidth="4" fill="none"></path>
                <path className="text-gray-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" strokeDasharray="5, 100" strokeDashoffset="-15" strokeWidth="4" fill="none"></path>
                <path className="text-green-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" strokeDasharray="80, 100" strokeDashoffset="-20" strokeWidth="4" fill="none"></path>
               </svg>
              <p className="mt-2 text-2xl font-bold">9659</p>
              <p className="text-xs">Total</p>
              <ul className="mt-4 text-sm">
                <li className="flex items-center"><span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span> Failed (1089)</li>
                <li className="flex items-center"><span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span> Warming (68)</li>
                <li className="flex items-center"><span className="w-2 h-2 mr-2 bg-gray-400 rounded-full"></span> Not available (38)</li>
                <li className="flex items-center"><span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span> Passed (7253)</li>
              </ul>
            </div>
          ),
          default: true,
        },
      ],
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          content: <p className="p-4 text-center text-gray-400">No Graph data available</p>,
          default: true,
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: <p className="p-4 text-center text-gray-400">No Graph data available</p>,
          default: true,
        },
      ],
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          content: (
            <div className="flex flex-col items-start p-4">
              <p className="text-xl font-bold">1470</p>
              <p className="text-xs">Total Vulnerabilities</p>
              <div className="w-full h-4 mt-4 bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-l-full" style={{ width: '10%' }}></div>
                <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                <div className="h-full bg-green-500 rounded-r-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          ),
          default: true,
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          content: (
            <div className="flex flex-col items-start p-4">
              <p className="text-xl font-bold">2</p>
              <p className="text-xs">Total Images</p>
              <div className="w-full h-4 mt-4 bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-l-full" style={{ width: '30%' }}></div>
                <div className="h-full bg-yellow-500" style={{ width: '50%' }}></div>
                <div className="h-full bg-green-500 rounded-r-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          ),
          default: true,
        },
      ],
    },
  ],
  availableWidgets: [
    { id: 'widget-A', name: 'Widget A', content: <p className="p-4">Content for Widget A</p> },
    { id: 'widget-B', name: 'Widget B', content: <p className="p-4">Content for Widget B</p> },
    { id: 'widget-C', name: 'Widget C', content: <p className="p-4">Content for Widget C</p> },
  ],
};

// Main App Component
const App = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newWidget, setNewWidget] = useState({ name: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Function to remove a widget
  const handleRemoveWidget = (categoryId, widgetId) => {
    setDashboardData(prevData => {
      const newCategories = prevData.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId)
          };
        }
        return category;
      });
      return { ...prevData, categories: newCategories };
    });
  };

  // Function to show the add widget modal for a specific category
  const handleAddWidgetClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAddWidgetModal(true);
  };

  // Function to add a new custom widget
  const handleAddNewWidget = () => {
    if (newWidget.name && newWidget.content && selectedCategory) {
      const newId = newWidget.name.toLowerCase().replace(/\s/g, '-');
      const widgetToAdd = {
        id: newId,
        name: newWidget.name,
        content: <p className="p-4">{newWidget.content}</p>,
        default: false,
      };

      setDashboardData(prevData => {
        const newCategories = prevData.categories.map(category => {
          if (category.id === selectedCategory) {
            return {
              ...category,
              widgets: [...category.widgets, widgetToAdd]
            };
          }
          return category;
        });

        return { ...prevData, categories: newCategories };
      });
      setNewWidget({ name: '', content: '' });
      setShowAddWidgetModal(false);
    }
  };
  
  // Function to add a pre-defined widget
  const handleAddPredefinedWidget = (widgetId) => {
    const widgetToAdd = initialDashboardData.availableWidgets.find(w => w.id === widgetId);
    if (widgetToAdd && selectedCategory) {
        setDashboardData(prevData => {
            const newCategories = prevData.categories.map(category => {
                if (category.id === selectedCategory) {
                    return {
                        ...category,
                        widgets: [...category.widgets, widgetToAdd]
                    };
                }
                return category;
            });
            return { ...prevData, categories: newCategories };
        });
        setShowAddWidgetModal(false);
    }
};

  const filteredAvailableWidgets = initialDashboardData.availableWidgets.filter(widget =>
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold">Dashboard V2</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Add Widget
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Last 2 days
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {dashboardData.categories.map(category => (
          <section key={category.id} className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <button
                onClick={() => handleAddWidgetClick(category.id)}
                className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Widget
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.widgets.map(widget => (
                <div
                  key={widget.id}
                  className="relative p-6 bg-white rounded-lg shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-medium">{widget.name}</h3>
                  <div className="text-sm text-gray-600">
                    {widget.content}
                  </div>
                  <button
                    onClick={() => handleRemoveWidget(category.id, widget.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 rounded-full hover:bg-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Add Widget Modal */}
      {showAddWidgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 m-4 bg-white rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold">Add Widget to {dashboardData.categories.find(c => c.id === selectedCategory)?.name}</h2>
            <button onClick={() => setShowAddWidgetModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-4">
               <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search available widgets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {filteredAvailableWidgets.length > 0 ? (
                  filteredAvailableWidgets.map(widget => (
                    <li key={widget.id} className="flex items-center justify-between p-2 border rounded-md">
                      <span>{widget.name}</span>
                      <button onClick={() => handleAddPredefinedWidget(widget.id)} className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Add</button>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No widgets found.</p>
                )}
              </ul>
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Create a New Widget</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="widget-name" className="block text-sm font-medium text-gray-700">Widget Name</label>
                    <input
                      id="widget-name"
                      type="text"
                      value={newWidget.name}
                      onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                      className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="widget-content" className="block text-sm font-medium text-gray-700">Widget Content</label>
                    <textarea
                      id="widget-content"
                      value={newWidget.content}
                      onChange={(e) => setNewWidget({ ...newWidget, content: e.target.value })}
                      className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={handleAddNewWidget}
                  className="w-full px-4 py-2 mt-4 text-sm text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Confirm and Add New Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Root rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Add the Tailwind CSS script for styling
const script = document.createElement('script');
script.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(script);

import React from 'react';
import { BarChart3, TrendingUp, Download, Filter, Calendar } from 'lucide-react';

const Reportes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reportes</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <Calendar size={16} className="text-gray-500" />
            <span>Último mes</span>
          </div>
          <button className="flex items-center gap-2 bg-primary-blue text-white px-3 py-1.5 rounded-lg hover:bg-primary-blue/90 transition-colors text-sm">
            <Download size={16} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Clientes Nuevos</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-800">$12,580</p>
            </div>
            <div className="bg-primary-orange/10 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-primary-orange" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+8%</span>
            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Tickets Resueltos</p>
              <p className="text-2xl font-bold text-gray-800">42</p>
            </div>
            <div className="bg-primary-blue/10 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-primary-blue" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+15%</span>
            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Servicios Vendidos</p>
              <p className="text-2xl font-bold text-gray-800">18</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">-5%</span>
            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Ventas por Servicio</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-blue">
              <Filter size={14} />
              <span>Filtrar</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500 text-sm">Gráfico de barras - Ventas por tipo de servicio</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Ingresos Mensuales</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-blue">
              <Filter size={14} />
              <span>Filtrar</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500 text-sm">Gráfico de línea - Ingresos mensuales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
import React, { useState } from 'react';
import { CreditCard, Filter, Download, Search, DollarSign } from 'lucide-react';
import { movimientosSimulados } from '../services/mockData';

const MovimientosYPagos: React.FC = () => {
  const [filtro, setFiltro] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMovimiento, setSelectedMovimiento] = useState<number | null>(null);
  
  // Filtrar movimientos según el estado seleccionado y búsqueda
  const movimientosFiltrados = movimientosSimulados
    .filter(mov => 
      (filtro === 'Todos' || mov.estado === filtro) &&
      (
        searchTerm === '' || 
        mov.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mov.factura.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
  const handlePayment = (id: number) => {
    setSelectedMovimiento(id);
    setShowPaymentModal(true);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para procesar el pago
    console.log('Procesando pago para movimiento:', selectedMovimiento);
    
    setShowPaymentModal(false);
    setSelectedMovimiento(null);
    
    // Simulamos que el pago se realizó
    alert('Pago procesado correctamente');
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Movimientos y Pagos</h1>
        <p className="text-gray-600">
          Consulta el historial de tus facturas y realiza pagos pendientes.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por concepto o número de factura..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="appearance-none bg-transparent pr-8 focus:outline-none text-gray-700"
              >
                <option value="Todos">Todos</option>
                <option value="Pagado">Pagados</option>
                <option value="Pendiente">Pendientes</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total pagado</p>
          <p className="text-2xl font-bold text-gray-800">$2,050.00</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Pendiente por pagar</p>
          <p className="text-2xl font-bold text-red-600">$1,300.00</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Próximo vencimiento</p>
          <p className="text-lg font-medium text-gray-800">25 Mayo, 2025</p>
        </div>
      </div>
      
      {movimientosFiltrados.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Factura
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movimientosFiltrados.map((movimiento) => (
                  <tr key={movimiento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(movimiento.fecha)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {movimiento.concepto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {movimiento.factura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      ${movimiento.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {movimiento.metodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        movimiento.estado === 'Pagado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {movimiento.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {movimiento.estado === 'Pendiente' ? (
                        <button 
                          onClick={() => handlePayment(movimiento.id)}
                          className="text-primary hover:text-primary-light font-medium flex items-center gap-1 ml-auto"
                        >
                          <CreditCard size={16} />
                          <span>Pagar ahora</span>
                        </button>
                      ) : (
                        <button className="text-secondary hover:text-secondary-light font-medium flex items-center gap-1 ml-auto">
                          <Download size={16} />
                          <span>Descargar</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No se encontraron movimientos</h3>
          <p className="text-gray-500">
            No hay registros que coincidan con los criterios de búsqueda actuales.
          </p>
        </div>
      )}
      
      {/* Modal de pago */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Realizar pago</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monto a pagar:</p>
                <p className="text-2xl font-bold text-primary flex items-center">
                  <DollarSign size={24} />
                  {movimientosSimulados.find(m => m.id === selectedMovimiento)?.monto.toLocaleString() || 0}
                </p>
              </div>
              
              <div>
                <label htmlFor="paymentMethod" className="form-label">Método de pago</label>
                <select id="paymentMethod" className="form-select">
                  <option value="card">Tarjeta de crédito/débito</option>
                  <option value="paypal">PayPal</option>
                  <option value="transfer">Transferencia bancaria</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="form-input"
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expDate" className="form-label">Fecha de vencimiento</label>
                  <input
                    type="text"
                    id="expDate"
                    className="form-input"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    className="form-input"
                    placeholder="XXX"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirmar pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovimientosYPagos;
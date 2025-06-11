import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Package, Check, X } from 'lucide-react';
import { format, addDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { serviciosPrincipales, serviciosSecundarios, citasSimuladas } from '../services/mockData';

const ReservaCitas: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedService, setSelectedService] = useState('');
  const [note, setNote] = useState('');
  
  // Combinar servicios principales y secundarios para el selector
  const allServices = [
    ...serviciosPrincipales.map(s => ({ value: s.nombre, label: s.nombre })),
    ...serviciosSecundarios.map(s => ({ value: s.nombre, label: s.nombre }))
  ];
  
  // Generar horarios disponibles (cada 30 minutos de 9:00 a 18:00)
  const availableTimes = [];
  for (let hour = 9; hour <= 17; hour++) {
    availableTimes.push(`${hour}:00`);
    availableTimes.push(`${hour}:30`);
  }
  availableTimes.push('18:00');
  
  // Generar los próximos 14 días para el selector de fechas
  const nextDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Aquí iría la lógica para enviar la reserva al backend
    console.log('Nueva reserva:', {
      fecha: format(selectedDate, 'yyyy-MM-dd'),
      hora: selectedTime,
      servicio: selectedService,
      notas: note
    });
    
    // Limpiamos el formulario
    setSelectedTime('10:00');
    setSelectedService('');
    setNote('');
    
    // Simulamos que la reserva se creó
    alert('Cita reservada correctamente');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatFullDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    return `${format(date, 'EEEE d', { locale: es })} de ${format(date, 'MMMM', { locale: es })} a las ${timeStr}`;
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Reserva de Citas</h1>
        <p className="text-gray-600">
          Agenda una cita con nuestros especialistas para discutir tus proyectos.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 order-2 md:order-1">
          <h2 className="text-xl font-semibold mb-6">Citas programadas</h2>
          
          {citasSimuladas.length > 0 ? (
            <div className="space-y-4">
              {citasSimuladas.map((cita) => (
                <div key={cita.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{cita.servicio}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <CalendarIcon size={16} className="mr-2" />
                    <span className="text-sm capitalize">
                      {formatFullDate(cita.fecha, cita.hora)}
                    </span>
                  </div>
                  
                  {cita.notas && (
                    <p className="text-sm text-gray-600 italic mt-2">
                      "{cita.notas}"
                    </p>
                  )}
                  
                  {cita.estado !== 'Cancelada' && (
                    <div className="flex justify-end mt-3 gap-2">
                      {cita.estado === 'Pendiente' && (
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                          <Check size={16} />
                          <span>Confirmar</span>
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                        <X size={16} />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes citas programadas</h3>
              <p className="text-gray-500">
                Utiliza el formulario de reserva para agendar una cita con nuestros especialistas.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 order-1 md:order-2">
          <h2 className="text-xl font-semibold mb-6">Reservar nueva cita</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Fecha</label>
              <div className="grid grid-cols-7 gap-2">
                {nextDays.map((day, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 text-center rounded-md border text-sm transition-colors
                      ${format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-200 hover:border-primary/50'
                      }
                    `}
                  >
                    <span className="block text-xs uppercase">
                      {format(day, 'EEE', { locale: es })}
                    </span>
                    <span className="block font-semibold mt-1">
                      {format(day, 'd')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="time" className="form-label">Hora</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={16} className="text-gray-500" />
                </div>
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="form-select pl-10"
                  required
                >
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time} hrs
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="service" className="form-label">Servicio</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package size={16} className="text-gray-500" />
                </div>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="form-select pl-10"
                  required
                >
                  <option value="">Seleccione un servicio</option>
                  <optgroup label="Servicios Principales">
                    {serviciosPrincipales.map((service) => (
                      <option key={service.id} value={service.nombre}>
                        {service.nombre}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Servicios Secundarios">
                    {serviciosSecundarios.map((service) => (
                      <option key={service.id} value={service.nombre}>
                        {service.nombre}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="note" className="form-label">Notas (opcional)</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-input h-20 resize-none"
                placeholder="Añade cualquier detalle importante sobre la cita..."
              ></textarea>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
              <p className="flex items-start">
                <CalendarIcon size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Al confirmar, estás reservando una cita para el día <span className="font-semibold capitalize">{format(selectedDate, 'EEEE d', { locale: es })}</span> de <span className="font-semibold">{format(selectedDate, 'MMMM', { locale: es })}</span> a las <span className="font-semibold">{selectedTime}</span> hrs.
                </span>
              </p>
            </div>
            
            <button type="submit" className="btn btn-primary w-full">
              Reservar cita
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservaCitas;
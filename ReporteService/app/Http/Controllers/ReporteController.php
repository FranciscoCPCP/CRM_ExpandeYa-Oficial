<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    // KPIs generales
    public function kpis()
    {
        return response()->json([
            'total_clientes' => DB::table('clientes')->count(),
            'total_servicios' => DB::table('servicios')->count(),
            'total_pagos' => DB::table('pagos')->count(),
            'total_tickets' => DB::table('tickets')->count(),
        ]);
    }

    // Reporte de ingresos por mes
    public function ingresosPorMes()
    {
        $data = DB::table('pagos')
            ->selectRaw('YEAR(fecha_pago) as year, MONTH(fecha_pago) as month, SUM(monto) as total')
            ->whereNotNull('fecha_pago')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();
        return response()->json($data);
    }

    // Reporte de citas por estado
    public function citasPorEstado()
    {
        $data = DB::table('citas')
            ->select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->get();
        return response()->json($data);
    }

    // Reporte de tickets por estado
    public function ticketsPorEstado()
    {
        $data = DB::table('tickets')
            ->select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->get();
        return response()->json($data);
    }

    // Reporte de servicios más contratados
    public function serviciosPopulares()
    {
        $data = DB::table('pagos')
            ->select('servicio_id', DB::raw('count(*) as total'))
            ->groupBy('servicio_id')
            ->orderByDesc('total')
            ->limit(10)
            ->get();
        return response()->json($data);
    }
}

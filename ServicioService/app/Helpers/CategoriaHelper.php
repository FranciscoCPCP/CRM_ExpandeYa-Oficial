<?php

namespace App\Helpers;

class CategoriaHelper
{
    // Mapeo de subcategoría a sección (principal/secundario/complemento)
    public static function subcategoriaASeccion($subcategoria)
    {
        $map = [
            // Principales
            'Desarrollo de páginas web personalizadas' => 'principal',
            'Publicidad y marketing digital' => 'principal',
            'Integración de pasarelas de pago' => 'principal',
            'Sistemas personalizados' => 'principal',
            // Secundarios
            'Diseño gráfico' => 'secundario',
            'Animación 2D y modelado 3D' => 'secundario',
            'Producción audiovisual y fotografía profesional' => 'secundario',
            'Mantenimiento post-venta' => 'secundario',
            'Migración segura de sitios web existentes' => 'secundario',
            'Capacitaciones técnicas para la gestión de herramientas digitales' => 'secundario',
            // Complementos
            'Dominio gratuito por un año' => 'complemento',
            'Mantenimiento durante la garantía' => 'complemento',
            'Análisis de requerimientos' => 'complemento',
        ];
        return $map[$subcategoria] ?? null;
    }
}

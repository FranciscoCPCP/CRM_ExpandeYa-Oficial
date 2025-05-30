<?php
// Archivo de utilidades para validación de ubigeo Perú

namespace App\Helpers;

class UbigeoPeru
{
    // Estructura: Región > Provincia > Distrito
    public static $data = [
        'Amazonas' => [
            'Chachapoyas' => [
                'Chachapoyas',
                'Asunción',
                'Balsas',
                'Cheto',
                'Chiliquín',
                'Chuquibamba',
                'Granada',
                'Huancas',
                'La Jalca',
                'Leimebamba',
                'Levanto',
                'Magdalena',
                'Mariscal Castilla',
                'Molinopampa',
                'Montevideo',
                'Olleros',
                'Quinjalca',
                'San Francisco de Daguas',
                'San Isidro de Maino',
                'Soloco',
                'Sonche',
            ],
            // ... otras provincias de Amazonas ...
        ],
        'Áncash' => [
            'Huaraz' => [
                'Huaraz',
                'Cochabamba',
                'Colcabamba',
                // ...
            ],
            // ... otras provincias de Áncash ...
        ],
        'Arequipa' => [
            'Arequipa' => [
                'Cercado',
                'Alto Selva Alegre',
                'Cayma',
                'Cerro Colorado',
                'Characato',
                'Chiguata',
                'Jacobo Hunter',
                'José Luis Bustamante y Rivero',
                'La Joya',
                'Mariano Melgar',
                'Miraflores',
                'Mollebaya',
                'Paucarpata',
                'Pocsi',
                'Polobaya',
                'Quequeña',
                'Sabandía',
                'Sachaca',
                'San Juan de Siguas',
                'San Juan de Tarucani',
                'Santa Isabel de Siguas',
                'Santa Rita de Siguas',
                'Socabaya',
                'Tiabaya',
                'Uchumayo',
                'Vitor',
                'Yanahuara',
                'Yarabamba',
                'Yura',
            ],
            // ... otras provincias de Arequipa ...
        ],
        'Lima' => [
            'Lima' => [
                'Ancón',
                'Ate',
                'Barranco',
                'Breña',
                'Carabayllo',
                'Chaclacayo',
                'Chorrillos',
                'Cieneguilla',
                'Comas',
                'El Agustino',
                'Independencia',
                'Jesús María',
                'La Molina',
                'La Victoria',
                'Lince',
                'Los Olivos',
                'Lurigancho',
                'Lurín',
                'Magdalena del Mar',
                'Miraflores',
                'Pachacámac',
                'Pucusana',
                'Pueblo Libre',
                'Puente Piedra',
                'Punta Hermosa',
                'Punta Negra',
                'Rímac',
                'San Bartolo',
                'San Borja',
                'San Isidro',
                'San Juan de Lurigancho',
                'San Juan de Miraflores',
                'San Luis',
                'San Martín de Porres',
                'San Miguel',
                'Santa Anita',
                'Santa María del Mar',
                'Santa Rosa',
                'Santiago de Surco',
                'Surquillo',
                'Villa El Salvador',
                'Villa María del Triunfo',
            ],
            'Huaral' => [
                'Huaral',
                'Atavillos Alto',
                'Atavillos Bajo',
                'Aucallama',
                'Chancay',
                'Ihuari',
                'Lampian',
                'Pacaraos',
                'Santa Cruz de Andamarca',
                'Sumbilca',
                'Veintisiete de Noviembre',
            ],
            // ... otras provincias de Lima ...
        ],
        // ... otras regiones ...
    ];

    // Validación para la nueva estructura (región > provincia > distrito)
    public static function isValid($region, $provincia, $distrito)
    {
        if (!isset(self::$data[$region])) return false;
        if (!isset(self::$data[$region][$provincia])) return false;
        if (!in_array($distrito, self::$data[$region][$provincia])) return false;
        return true;
    }
}

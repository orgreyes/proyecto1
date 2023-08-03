<?php

namespace Controllers;

use MVC\Router;

class AppController {
    public static function index(Router $router){
        $router->render('pages/index', []);
    }

    public static function prueba (Router $router){
        $saludo = 'Hola mundo, desde una variable';
        $router -> render('prueba', [
            'saludo' => $saludo
        ]);
    }
}
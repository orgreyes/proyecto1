<?php

namespace Controllers;
use Model\Producto;
use MVC\Router;

class ProductoController{
    public static function index(Router $router){
        $productos = Producto::all();
        // $productos2 = Producto::all();

        $router->render('productos/index', [
            'productos' => $productos,
            // 'productos2' => $productos2,
        ]); 
    }
}
<?php

namespace Controllers;
use Model\Producto;
use MVC\Router;

class ProductoController{
    public static function index(Router $router){
        $productos = Producto::all();

        var_dump($productos);
        exit;
        

        $router->render('productos/index'); 
    }
}
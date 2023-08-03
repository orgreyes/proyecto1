<h1>Vista de Productos</h1>

<?php foreach($productos as $key => $producto): ?>

    <li><?= $producto->producto_nombre . $producto->producto_id?></li>

    <?php endforeach ?>;
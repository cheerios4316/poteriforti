<?php

require_once __DIR__ . '/vendor/autoload.php';

use DumpsterfirePages\App\App;
use DumpsterfirePages\Container\Container;
use DumpsterfirePages\Router\DumpsterfireRouter;
use Src\Components\PageTemplate\HeaderComponent\HeaderComponent;
use Src\Controllers\MainPageController;

$container = Container::getInstance();

$app = App::new()
    ->runInitActions()
;

$router = DumpsterfireRouter::new();
;

$router->registerRoute('/', MainPageController::class);

$app
    ->setPageTemplateHeader(HeaderComponent::class)
    ->setRouter($router)
    ->run()
;

/**
 * @todo STUFF I PROMISED IN THE MAIN PAGE BUT DOES NOT EXIST YET AND I HAVE TO MAKE
 * 
 * npx command to create project
 *      then: npx command param to create blank project
 * 
 * npm command to cleanup example project
 * 
 * npm commands to create components and controllers
 */
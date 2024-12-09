<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Adicione seus links de CSS aqui -->
</head>

<body>
    <div class="container">
        <!-- Aqui vai o conteúdo da página -->
        @yield('content')
    </div>

    <!-- Adicione seus scripts JS aqui -->
</body>

</html>

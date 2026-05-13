<?php

declare(strict_types=1);

final class Database
{
    public static function connect(): PDO
    {
        $configFile = __DIR__ . '/../config.php';
        $config = file_exists($configFile)
            ? require $configFile
            : require __DIR__ . '/../config.example.php';

        $db = $config['db'];
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $db['host'],
            $db['port'],
            $db['database'],
            $db['charset']
        );

        return new PDO($dsn, $db['username'], $db['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
}

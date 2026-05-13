<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/ResourceRepository.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

try {
    $repository = new ResourceRepository(Database::connect());
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
    $segments = array_values(array_filter(explode('/', trim($path, '/'))));
    $apiIndex = array_search('api', $segments, true);
    $resource = $apiIndex === false ? ($segments[0] ?? '') : ($segments[$apiIndex + 1] ?? '');
    $idFromPath = $apiIndex === false ? ($segments[1] ?? '') : ($segments[$apiIndex + 2] ?? '');

    if ($resource === '') {
        respond([
            'name' => 'Balingasag Public Library API',
            'database' => 'mysql',
            'resources' => $repository->resourceNames(),
        ]);
    }

    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input') ?: '{}', true);
    $payload = is_array($input) ? $input : [];
    $id = (string)($idFromPath ?: ($payload['id'] ?? ''));

    switch ($method) {
        case 'GET':
            echo json_encode($id === ''
                ? $repository->all($resource)
                : $repository->find($resource, $id));
            break;

        case 'POST':
            http_response_code(201);
            echo json_encode($repository->create($resource, $payload));
            break;

        case 'PUT':
            if ($id === '') {
                respond(['error' => 'Missing id'], 422);
            }

            echo json_encode($repository->update($resource, $id, $payload));
            break;

        case 'DELETE':
            if ($id === '') {
                respond(['error' => 'Missing id'], 422);
            }

            $repository->delete($resource, $id);
            echo json_encode(['success' => true]);
            break;

        default:
            respond(['error' => 'Method not allowed'], 405);
    }
} catch (PDOException $exception) {
    respond([
        'error' => 'Database error',
        'message' => $exception->getMessage(),
    ], 500);
} catch (Throwable $exception) {
    respond([
        'error' => 'Server error',
        'message' => $exception->getMessage(),
    ], 500);
}

<?php

declare(strict_types=1);

final class ResourceRepository
{
    /** @var array<string, array{table: string, fields: array<string, string>}> */
    private array $resources = [
        'books' => [
            'table' => 'books',
            'fields' => [
                'id' => 'id',
                'title' => 'title',
                'author' => 'author',
                'category' => 'category',
                'isbn' => 'isbn',
                'year' => 'published_year',
                'available' => 'available_copies',
                'total' => 'total_copies',
                'borrows' => 'borrow_count',
                'description' => 'description',
                'cover' => 'cover',
            ],
        ],
        'users' => [
            'table' => 'users',
            'fields' => [
                'id' => 'id',
                'name' => 'name',
                'email' => 'email',
                'role' => 'role',
                'phone' => 'phone',
                'joined' => 'joined_at',
                'status' => 'status',
            ],
        ],
        'transactions' => [
            'table' => 'transactions',
            'fields' => [
                'id' => 'id',
                'userId' => 'user_id',
                'bookId' => 'book_id',
                'user' => 'user_name',
                'book' => 'book_title',
                'borrow' => 'borrowed_at',
                'due' => 'due_at',
                'returnDate' => 'returned_at',
                'renewals' => 'renewals',
                'status' => 'status',
            ],
        ],
        'fines' => [
            'table' => 'fines',
            'fields' => [
                'id' => 'id',
                'userId' => 'user_id',
                'transactionId' => 'transaction_id',
                'user' => 'user_name',
                'amount' => 'amount',
                'reason' => 'reason',
                'created' => 'created_on',
                'paid' => 'paid_on',
                'method' => 'payment_method',
                'status' => 'status',
            ],
        ],
        'notifications' => [
            'table' => 'notifications',
            'fields' => [
                'id' => 'id',
                'userId' => 'user_id',
                'type' => 'type',
                'title' => 'title',
                'message' => 'message',
                'date' => 'notification_date',
                'read' => 'is_read',
            ],
        ],
        'reservations' => [
            'table' => 'reservations',
            'fields' => [
                'id' => 'id',
                'userId' => 'user_id',
                'bookId' => 'book_id',
                'status' => 'status',
                'reservedAt' => 'reserved_at',
            ],
        ],
    ];

    public function __construct(private PDO $pdo)
    {
    }

    /** @return array<int, array<string, mixed>> */
    public function all(string $resource): array
    {
        $meta = $this->meta($resource);
        $select = $this->selectList($meta['fields']);
        $table = $this->quoteIdentifier($meta['table']);
        $statement = $this->pdo->query("SELECT {$select} FROM {$table} ORDER BY `id` DESC");

        return array_map([$this, 'normalizeRecord'], $statement->fetchAll());
    }

    /** @return array<string, mixed> */
    public function find(string $resource, string $id): array
    {
        $meta = $this->meta($resource);
        $select = $this->selectList($meta['fields']);
        $table = $this->quoteIdentifier($meta['table']);
        $statement = $this->pdo->prepare("SELECT {$select} FROM {$table} WHERE `id` = :id LIMIT 1");
        $statement->execute(['id' => $id]);
        $record = $statement->fetch();

        if (!$record) {
            $this->respond(['error' => 'Record not found'], 404);
        }

        return $this->normalizeRecord($record);
    }

    /** @param array<string, mixed> $payload */
    public function create(string $resource, array $payload): array
    {
        $meta = $this->meta($resource);
        $data = $this->mapPayload($payload, $meta['fields'], false);

        if ($data === []) {
            $this->respond(['error' => 'No valid fields provided'], 422);
        }

        $columns = array_keys($data);
        $quotedColumns = array_map([$this, 'quoteIdentifier'], $columns);
        $placeholders = array_map(static fn (string $column): string => ':' . $column, $columns);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $this->quoteIdentifier($meta['table']),
            implode(', ', $quotedColumns),
            implode(', ', $placeholders)
        );

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        return $this->find($resource, (string)$this->pdo->lastInsertId());
    }

    /** @param array<string, mixed> $payload */
    public function update(string $resource, string $id, array $payload): array
    {
        $meta = $this->meta($resource);
        $data = $this->mapPayload($payload, $meta['fields'], true);

        if ($data === []) {
            $this->respond(['error' => 'No valid fields provided'], 422);
        }

        $assignments = array_map(
            fn (string $column): string => $this->quoteIdentifier($column) . " = :{$column}",
            array_keys($data)
        );
        $data['id'] = $id;
        $sql = sprintf('UPDATE %s SET %s WHERE `id` = :id', $this->quoteIdentifier($meta['table']), implode(', ', $assignments));

        $statement = $this->pdo->prepare($sql);
        $statement->execute($data);

        if ($statement->rowCount() === 0) {
            $this->find($resource, $id);
        }

        return $this->find($resource, $id);
    }

    public function delete(string $resource, string $id): void
    {
        $meta = $this->meta($resource);
        $statement = $this->pdo->prepare('DELETE FROM ' . $this->quoteIdentifier($meta['table']) . ' WHERE `id` = :id');
        $statement->execute(['id' => $id]);

        if ($statement->rowCount() === 0) {
            $this->respond(['error' => 'Record not found'], 404);
        }
    }

    /** @return array<int, string> */
    public function resourceNames(): array
    {
        return array_keys($this->resources);
    }

    /** @return array{table: string, fields: array<string, string>} */
    private function meta(string $resource): array
    {
        if (!array_key_exists($resource, $this->resources)) {
            $this->respond(['error' => 'Resource not found'], 404);
        }

        return $this->resources[$resource];
    }

    /** @param array<string, string> $fields */
    private function selectList(array $fields): string
    {
        $parts = [];
        foreach ($fields as $apiField => $column) {
            $parts[] = $this->quoteIdentifier($column) . ' AS ' . $this->quoteIdentifier($apiField);
        }

        return implode(', ', $parts);
    }

    private function quoteIdentifier(string $identifier): string
    {
        return '`' . str_replace('`', '``', $identifier) . '`';
    }

    /**
     * @param array<string, mixed> $payload
     * @param array<string, string> $fields
     * @return array<string, mixed>
     */
    private function mapPayload(array $payload, array $fields, bool $ignoreId): array
    {
        $data = [];
        foreach ($fields as $apiField => $column) {
            if ($ignoreId && $apiField === 'id') {
                continue;
            }

            if (array_key_exists($apiField, $payload)) {
                $data[$column] = $payload[$apiField];
            }
        }

        return $data;
    }

    /** @param array<string, mixed> $record */
    private function normalizeRecord(array $record): array
    {
        if (array_key_exists('id', $record)) {
            $record['id'] = (string)$record['id'];
        }

        foreach (['read'] as $booleanField) {
            if (array_key_exists($booleanField, $record)) {
                $record[$booleanField] = (bool)$record[$booleanField];
            }
        }

        return $record;
    }

    /** @param array<string, mixed> $payload */
    private function respond(array $payload, int $status): never
    {
        http_response_code($status);
        echo json_encode($payload);
        exit;
    }
}

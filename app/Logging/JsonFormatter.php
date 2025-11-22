<?php

namespace App\Logging;

use Illuminate\Log\Logger;
use Monolog\Formatter\JsonFormatter as MonologJsonFormatter;

class JsonFormatter
{
    public function __invoke(Logger $logger): void
    {
        foreach ($logger->getHandlers() as $handler) {
            $formatter = new MonologJsonFormatter();

            // В разных версиях Monolog есть сеттеры — используем, когда доступны:
            if (method_exists($formatter, 'setJsonPrettyPrint')) {
                $formatter->setJsonPrettyPrint(true);
            }
            if (method_exists($formatter, 'setJsonEncodeOptions')) {
                $formatter->setJsonEncodeOptions(
                    JSON_UNESCAPED_UNICODE
                    | JSON_UNESCAPED_SLASHES
                    | JSON_PRESERVE_ZERO_FRACTION
                    | JSON_PRETTY_PRINT
                );
            }
            if (method_exists($formatter, 'setAppendNewline')) {
                $formatter->setAppendNewline(true);
            }

            $handler->setFormatter($formatter);
        }
    }
}
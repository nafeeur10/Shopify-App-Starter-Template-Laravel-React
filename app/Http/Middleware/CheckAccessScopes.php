<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Osiset\ShopifyApp\Util;

class CheckAccessScopes
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->ajax()) {
            return $next($request);
        }

        $shop = $request->user();

        if ($shop->force_scope_update) {
            return response()->json(
                [
                    'forceRedirectUrl' => route(
                        Util::getShopifyConfig('route_names.authenticate'),
                        ['shop' => $shop->name]
                    )
                ],
                403
            );
        }
        return $next($request);
    }
}

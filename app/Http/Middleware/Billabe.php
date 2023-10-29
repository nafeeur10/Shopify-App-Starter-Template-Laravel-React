<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Osiset\ShopifyApp\Util;
use Illuminate\Support\Facades\Redirect;

class Billabe
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Util::getShopifyConfig('billing_enabled') === true) {
            return $next($request);
        }

        if (!Util::useNativeAppBridge() && !$request->ajax()) {
            return $next($request);
        }

        /** @var $shop IShopModel */
        $shop = auth()->user();
        if (!$shop->plan && !$shop->isFreemium() && !$shop->isGrandfathered() && $request->ajax()) {

            $redicrectUrl = route(
                Util::getShopifyConfig('route_names.billing'),
                array_merge($request->input(), [
                    'shop' => $shop->getDomain()->toNative(),
                    'host' => $request->get('host'),
                ])
            );

            return response()->json([
                'plan' => $shop->plan,
                'freemium' => $shop->isFreemium(),
                'GrandFathered' => $shop->isGrandfathered(),
                'forceRedirectUrl' => $redicrectUrl
            ], 403);
        }

        return $next($request);
    }
}

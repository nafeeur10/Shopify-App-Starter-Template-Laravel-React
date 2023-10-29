<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Osiset\ShopifyApp\Storage\Models\Plan;
use Osiset\ShopifyApp\Util;
use Illuminate\Http\JsonResponse;

class PremiumController extends Controller
{
    public function __construct(private readonly ResponseFactory $responseFactory)
    {
        
    }
    
    public function index(Request $request): JsonResponse
    {
        return $this->responseFactory->json(
            [
                'hasPremium' => $request->user()->plan?->price > 0,
            ]
        );
    }

    public function store(Request $request): JsonResponse
    {
        $shop = $request->user();

        if ($shop->plan?->price > 0) {
            return $this->responseFactory->json();
        }

        $planId = Plan::query()->where('price', '>', 0)->first()?->id;

        if (! $planId) {
            throw new \RuntimeException('No premium plan found');
        }

        $redirectUrl = route(
            Util::getShopifyConfig('route_names.billing'),
            [
                'shop' => $shop->getDomain()->toNative(),
                'host' => $request->get('host'),
                'plan' => $planId,
            ]
        );

        return $this->responseFactory->json(['redirectUrl' => $redirectUrl]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $shop = $request->user();

        if ($shop->plan?->price <= 0) {
            return $this->responseFactory->json();
        }

        $redirectUrl = route(
            Util::getShopifyConfig('route_names.billing'),
            [
                'shop' => $shop->getDomain()->toNative(),
                'host' => $request->get('host'),
            ]
        );

        return $this->responseFactory->json(['redirectUrl' => $redirectUrl]);
    }
}

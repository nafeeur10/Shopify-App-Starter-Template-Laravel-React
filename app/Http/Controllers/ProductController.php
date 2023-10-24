<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function __construct(private readonly ResponseFactory $responseFactory)
    {
        
    }
    public function store(CreateProductRequest $request)
    {
        $data = $request->validated();
        $count = $data['count'];

        /** @var ShopModel $shop */
        $shop = $request->user();
        $productResource = [
            "title" => "Good Product",
            "body_html" => "<strong>Good snowboard!</strong>"
        ];

        $request = $shop->api()->rest(
            'POST','/admin/api/products.json',[
                'product' => $productResource
            ]
        );
        return $this->responseFactory->json($request['body']['product']);
    }
}

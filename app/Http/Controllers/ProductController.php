<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(CreateProductRequest $request)
    {
        $data = $request->validated();
    }
}

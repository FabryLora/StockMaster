<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return CategoryResource::collection(Category::where("user_id", $user->id)->orderBy('created_at', 'desc')->paginate(50));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request)
    {
        $data = $request->validated();
        $category = Category::create($data);
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $category->user_id) {
            return abort(403, "Unauthorized action");
        }
        return new CategoryResource($category);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $data = $request->validated();
        $category->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Category $category)
    {
        $user = $request->user();
        if ($user->id !== $category->user_id) {
            return abort(403,"unauthorized action");
        }
        $category->delete();
        return response("",204);
    }
}

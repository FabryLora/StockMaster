<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaleStoreRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return SaleResource::collection(Sale::where("user_id", $user->id)->orderBy('created_at', 'desc')->paginate(50));
    }

    
    public function store(SaleStoreRequest $request)
    {
        $data = $request->validated();

        $sale = Sale::create($data);

        return new SaleResource($sale);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $sale->user_id) {
            return abort(403, "Unauthorized action");
        }
        return new SaleResource($sale);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Sale $sale)
    {
        $user = $request->user();
        if ($user->id !== $sale->user_id) {
            return abort(403,"unauthorized action");

        }

        $sale->delete();


        return response("",204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactStoreRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function store(ContactStoreRequest $request)
    {
        $data = $request->validated();
        $contact = Contact::create($data);
        return new ContactResource($contact);
    }

   
}
